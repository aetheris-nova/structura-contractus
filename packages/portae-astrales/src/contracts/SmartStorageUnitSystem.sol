// SPDX-License-Identifier: CC0-1.0
pragma solidity >=0.8.24;

import { FRONTIER_WORLD_DEPLOYMENT_NAMESPACE } from '@eveworld/common-constants/src/constants.sol';
import { IBaseWorld } from '@latticexyz/world/src/codegen/interfaces/IBaseWorld.sol';
import { CharactersByAddressTable } from '@eveworld/world/src/codegen/tables/CharactersByAddressTable.sol';
import { EphemeralInvItemTableData, EphemeralInvItemTable } from '@eveworld/world/src/codegen/tables/EphemeralInvItemTable.sol';
import { ResourceIds } from '@latticexyz/store/src/codegen/tables/ResourceIds.sol';
import { AccessModified } from '@eveworld/world/src/modules/access/systems/AccessModified.sol';
import { InventoryLib } from '@eveworld/world/src/modules/inventory/InventoryLib.sol';
import { InventoryItem, TransferItem } from '@eveworld/world/src/modules/inventory/types.sol';
import { System } from '@latticexyz/world/src/System.sol';
import { WorldResourceIdLib } from '@latticexyz/world/src/WorldResourceId.sol';

// mud
import { ItemSubscriptionMethods, ItemSubscriptionMethodsData } from '@mud/tables/ItemSubscriptionMethods.sol';
import { ItemSubscriptions } from '@mud/tables/ItemSubscriptions.sol';
import { SubscriptionTimes } from '@mud/tables/SubscriptionTimes.sol';

// utils
import { ItemSubscriptionUtils } from './utils/ItemSubscriptionUtils.sol';
import { SmartObjectUtils } from './utils/SmartObjectUtils.sol';

/**
 * @notice Deployed to an SSU, this allows the user of the SSU to pay for a subscription.
 */
contract SmartStorageUnitSystem is System {
  using InventoryLib for InventoryLib.World;

  // errors
  error CharacterDoesNotExistError();
  error InvalidSSUError(uint256 ssuID);
  error NotEnoughOfItemError(uint256 itemID);
  error UnknownDepositMethodError(uint256 itemID);

  // events
  event PortalaeAstrales_SubscriptionCreated(uint256 indexed id);

  /**
   * private functions
   */

  /**
   * @notice Calculates the subscription time for a given duration. This takes into account the current subscription
   * time and appends the subscription time to the existing subscription time.
   * @dev
   * * If the current subscription time is 0 or less than the current time, the new subscription time starts from now.
   * @param currentSubscriptionTime The current subscription time.
   * @param timeToAdd The amount of time to be added.
   * @return The new subscription time with any appended time.
   */
  function _calculateSubscriptionTime(
    uint256 currentSubscriptionTime,
    uint256 timeToAdd
  ) internal view returns (uint256) {
    // if there is no subscription time left or the amount has run out, refresh from now
    if (currentSubscriptionTime == 0 || currentSubscriptionTime < block.timestamp) {
      return block.timestamp + timeToAdd;
    }

    return currentSubscriptionTime + timeToAdd;
  }

  function _inventoryLib() internal view returns (InventoryLib.World memory) {
    if (!ResourceIds.getExists(WorldResourceIdLib.encodeNamespace(FRONTIER_WORLD_DEPLOYMENT_NAMESPACE))) {
      return InventoryLib.World({ iface: IBaseWorld(_world()), namespace: FRONTIER_WORLD_DEPLOYMENT_NAMESPACE });
    }

    return InventoryLib.World({ iface: IBaseWorld(_world()), namespace: FRONTIER_WORLD_DEPLOYMENT_NAMESPACE });
  }

  /**
   * @notice Convenience function to transfer the ephemeral items from the player to the SSU's inventory.
   * @param ssuID The ID of the SSU.
   * @param itemID The ID of the item to transfer.
   * @param quantity The quantity of items to transfer.
   */
  function _transferItems(uint256 ssuID, uint256 itemID, uint256 quantity) internal {
    address ssuOwner = SmartObjectUtils.ownerOf(ssuID);
    TransferItem[] memory transferItems = new TransferItem[](1);

    transferItems[0] = TransferItem(itemID, ssuOwner, quantity);

    _inventoryLib().ephemeralToInventoryTransfer(ssuID, transferItems);
  }

  /**
   * public functions
   */

  /**
   * @notice Allows a player to subscribe to the Portale Astrales (the gate system) by the items deposited in their
   * ephemeral inventory of the SSU. The player will need the right amount of items that is outlined in the
   * ItemSubscriptionMethods table.
   * @dev
   * * The subscription time is appended to their current subscription time.
   * @param ssuID The ID of the SSU that is being interacted with.
   * @param itemID The ID of the item they would like to use to make a subscription.
   * @param multiplier Determines how many subscriptions from of the item they would like to make. Defaults to 1x.
   * @param nonce A unique nonce that is used for randomness when creating table IDs.
   */
  function subscribeWithItems(uint256 ssuID, uint256 itemID, uint8 multiplier, bytes32 nonce) public {
    uint8 _multiplier = multiplier == 0 ? 1 : multiplier;
    uint256 characterID;
    uint256 currentSubscriptionTime;
    EphemeralInvItemTableData memory playerItems;
    uint256 requiredQuantity;
    ItemSubscriptionMethodsData memory subscriptionMethod;
    uint256 subscriptionID;
    uint256 subscriptionTimeToAdd;

    characterID = CharactersByAddressTable.get(_msgSender());

    if (characterID == uint256(0)) {
      revert CharacterDoesNotExistError();
    }

    subscriptionMethod = ItemSubscriptionMethods.get(itemID);

    if (!subscriptionMethod.active) {
      revert UnknownDepositMethodError(itemID);
    }

    playerItems = EphemeralInvItemTable.get(ssuID, itemID, _msgSender());
    requiredQuantity = subscriptionMethod.requiredQuantity * _multiplier;

    if (playerItems.quantity < requiredQuantity) {
      revert NotEnoughOfItemError(itemID);
    }

    // transfer the deposited items from the player's inventory (ephemeral) to the ssu's inventory
    _transferItems(ssuID, itemID, requiredQuantity);

    currentSubscriptionTime = SubscriptionTimes.getExpiresAt(characterID);
    subscriptionTimeToAdd = subscriptionMethod.duration * _multiplier;
    subscriptionID = ItemSubscriptionUtils.generateID(
      characterID,
      block.timestamp,
      subscriptionTimeToAdd,
      itemID,
      requiredQuantity,
      ssuID,
      nonce
    );

    // add subscription entries for the player
    ItemSubscriptions.set(
      subscriptionID,
      characterID,
      block.timestamp,
      subscriptionTimeToAdd,
      itemID,
      requiredQuantity,
      ssuID
    );
    SubscriptionTimes.set(
      characterID,
      _calculateSubscriptionTime(currentSubscriptionTime, subscriptionTimeToAdd),
      block.timestamp
    );

    emit PortalaeAstrales_SubscriptionCreated(subscriptionID);
  }
}
