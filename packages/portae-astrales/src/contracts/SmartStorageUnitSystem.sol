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
import { PortaeAstralesDeposits } from '@mud/tables/PortaeAstralesDeposits.sol';
import { PortaeAstralesDepositMethods, PortaeAstralesDepositMethodsData } from '@mud/tables/PortaeAstralesDepositMethods.sol';
import { PortaeAstralesSubscriptions } from '@mud/tables/PortaeAstralesSubscriptions.sol';

// constants
import { DEFAULT_DEPOSIT_METHOD_DURATION } from './constants/Durations.sol';

// utils
import { SmartObjectUtils } from './utils/SmartObjectUtils.sol';

/**
 * @notice Deployed to an SSU, this allows the user of the SSU to pay for a subscription.
 */
contract SmartStorageUnitSystem is System {
  using InventoryLib for InventoryLib.World;

  error CharacterDoesNotExistError();
  error InvalidSSUError(uint256 ssuID);
  error NotEnoughOfItemError(uint256 itemID);
  error UnknownDepositMethodError(uint256 itemID);

  /**
   * private functions
   */

  function _inventoryLib() internal view returns (InventoryLib.World memory) {
    if (!ResourceIds.getExists(WorldResourceIdLib.encodeNamespace(FRONTIER_WORLD_DEPLOYMENT_NAMESPACE))) {
      return InventoryLib.World({ iface: IBaseWorld(_world()), namespace: FRONTIER_WORLD_DEPLOYMENT_NAMESPACE });
    }

    return InventoryLib.World({ iface: IBaseWorld(_world()), namespace: FRONTIER_WORLD_DEPLOYMENT_NAMESPACE });
  }

  /**
   * public functions
   */

  /**
   * @notice
   */
  function subscribe(uint256 ssuID, uint256 itemID, uint8 amount) public {
    uint8 _amount = amount == 0 ? 1 : amount;
    uint256 characterID;
    PortaeAstralesDepositMethodsData memory depositMethod;
    EphemeralInvItemTableData memory playerItems;
    InventoryLib.World memory inventory;
    address owner = SmartObjectUtils.ownerOf(ssuID);
    uint256 requiredQuantity;
    TransferItem[] memory transferItems;

    if (owner == address(0)) {
      revert InvalidSSUError(ssuID);
    }

    characterID = CharactersByAddressTable.get(_msgSender());

    if (characterID == uint256(0)) {
      revert CharacterDoesNotExistError();
    }

    depositMethod = PortaeAstralesDepositMethods.get(itemID);

    if (!depositMethod.active) {
      revert UnknownDepositMethodError(itemID);
    }

    playerItems = EphemeralInvItemTable.get(ssuID, itemID, _msgSender());
    requiredQuantity = depositMethod.requiredQuantity * _amount;

    if (playerItems.quantity < requiredQuantity) {
      revert NotEnoughOfItemError(itemID);
    }

    inventory = _inventoryLib();
    transferItems = new TransferItem[](1);
    transferItems[0] = TransferItem(itemID, _msgSender(), requiredQuantity);

    // transfer the deposited items from the player's inventory (ephemeral) to the ssu's inventory
    _inventoryLib().ephemeralToInventoryTransfer(ssuID, transferItems);

    // add a subscription entry for the player
    //    PortaeAstralesDeposits.set();
    //    PortaeAstralesSubscriptions.set(characterID);
  }
}
