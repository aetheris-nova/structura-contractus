// SPDX-License-Identifier: CC0-1.0
pragma solidity ^0.8.24;

import 'forge-std/Test.sol';
import { FRONTIER_WORLD_DEPLOYMENT_NAMESPACE, SMART_STORAGE_UNIT_SYSTEM_NAME } from '@eveworld/common-constants/src/constants.sol';
import { CharactersByAddressTable } from '@eveworld/world/src/codegen/tables/CharactersByAddressTable.sol';
import { EphemeralInvItemTableData, EphemeralInvItemTable } from '@eveworld/world/src/codegen/tables/EphemeralInvItemTable.sol';
import { GlobalDeployableState } from '@eveworld/world/src/codegen/tables/GlobalDeployableState.sol';
import { IBaseWorld } from '@eveworld/world/src/codegen/world/IWorld.sol';
import { InventoryItem } from '@eveworld/world/src/modules/inventory/types.sol';
import { SmartDeployableLib } from '@eveworld/world/src/modules/smart-deployable/SmartDeployableLib.sol';
import { SmartStorageUnitLib } from '@eveworld/world/src/modules/smart-storage-unit/SmartStorageUnitLib.sol';
import { EntityRecordData, WorldPosition, SmartObjectData, Coord } from '@eveworld/world/src/modules/smart-storage-unit/types.sol';
import { ResourceId } from '@latticexyz/world/src/WorldResourceId.sol';
import { MudTest } from '@latticexyz/world/test/MudTest.t.sol';

// constants
import { DEFAULT_DEPOSIT_METHOD_DURATION } from '@contracts/constants/Durations.sol';

// contracts
import { SmartStorageUnitSystem } from '@contracts/SmartStorageUnitSystem.sol';

// mud
import { PortaeAstralesDeposits, PortaeAstralesDepositsData } from '@mud/tables/PortaeAstralesDeposits.sol';
import { PortaeAstralesDepositMethods, PortaeAstralesDepositMethodsData } from '@mud/tables/PortaeAstralesDepositMethods.sol';
import { PortaeAstralesSubscriptions } from '@mud/tables/PortaeAstralesSubscriptions.sol';
import { IWorld } from '@mud/world/IWorld.sol';

// utils
import { SmartObjectUtils } from '@contracts/utils/SmartObjectUtils.sol';
import { SmartCharacterUtils } from './utils/SmartCharacterUtils.sol';

contract SmartStorageUintSystemTest is MudTest {
  using SmartDeployableLib for SmartDeployableLib.World;
  using SmartStorageUnitLib for SmartStorageUnitLib.World;

  uint256 private _deployerPrivateKey;
  uint256 private _itemID = uint256(70505200487489129491533272716910408603753256595363780714882065332876101173161); // salt (83839)
  bytes14 private _namespace;
  address private _owner;
  uint256 private _ownerCharacterID = uint256(128);
  address private _player;
  uint256 private _playerCharacterID = uint256(256);
  SmartDeployableLib.World private _smartDeployable;
  SmartStorageUnitLib.World private _smartStorageUnit;
  uint256 private _ssuID = uint256(17614304337475056394242299294383532840873792487945557467064313427436901763821);
  ResourceId private _systemId;
  IWorld private _world;

  function setUp() public override {
    super.setUp();

    _deployerPrivateKey = vm.envUint('PRIVATE_KEY');
    _namespace = bytes14(bytes(vm.envString('NAMESPACE')));
    _owner = vm.addr(_deployerPrivateKey);
    _player = address(1);
    _smartDeployable = SmartDeployableLib.World({
      iface: IBaseWorld(worldAddress),
      namespace: FRONTIER_WORLD_DEPLOYMENT_NAMESPACE
    });
    _smartStorageUnit = SmartStorageUnitLib.World({
      iface: IBaseWorld(worldAddress),
      namespace: FRONTIER_WORLD_DEPLOYMENT_NAMESPACE
    });
    _systemId = SmartObjectUtils.resourceID(_namespace, SMART_STORAGE_UNIT_SYSTEM_NAME);
    _world = IWorld(worldAddress);

    // create characters
    SmartCharacterUtils.createCharacter(_ownerCharacterID, _owner, 'owner', worldAddress);
    SmartCharacterUtils.createCharacter(_playerCharacterID, _player, 'player', worldAddress);

    // create the ssu
    _createAnchorAndOnline(_ssuID, _owner);

    // add the default item to the deposit methods table
    vm.startBroadcast(_deployerPrivateKey);
    PortaeAstralesDepositMethods.set(_itemID, true, DEFAULT_DEPOSIT_METHOD_DURATION, uint256(128));
    vm.stopBroadcast();
  }

  /**
   * helper functions
   */

  function _addItemsToEphemeralInventory(uint256 itemID, address owner, uint256 quantity) private {
    InventoryItem[] memory items = new InventoryItem[](1);

    items[0] = InventoryItem({
      inventoryItemId: itemID,
      owner: owner,
      itemId: 2,
      typeId: 24,
      volume: 10,
      quantity: quantity
    });

    _smartStorageUnit.createAndDepositItemsToEphemeralInventory(_ssuID, _player, items);
  }

  function _createAnchorAndOnline(uint256 ssuID, address owner) private {
    // check global state and resume if needed
    if (GlobalDeployableState.getIsPaused() == false) {
      _smartDeployable.globalResume();
    }

    // create, anchor the ssu and bring online
    _smartStorageUnit.createAndAnchorSmartStorageUnit(
      ssuID,
      EntityRecordData({ typeId: 7888, itemId: 111, volume: 10 }),
      SmartObjectData({ owner: owner, tokenURI: 'test' }),
      WorldPosition({ solarSystemId: 1, position: Coord({ x: 1, y: 1, z: 1 }) }),
      1e18, // fuelUnitVolume,
      1, // fuelConsumptionPerMinute,
      1000000 * 1e18, // fuelMaxCapacity,
      100000000, // storageCapacity,
      100000000000 // ephemeralStorageCapacity
    );

    _smartDeployable.depositFuel(ssuID, 200010);
    _smartDeployable.bringOnline(ssuID);
  }

  /**
   * subscribe()
   */

  function test_SubscribeWithNoKnownCharacter() public {
    // arrange
    // assert
    vm.expectRevert(SmartStorageUnitSystem.CharacterDoesNotExistError.selector);

    // act
    _world.call(_systemId, abi.encodeCall(SmartStorageUnitSystem.subscribe, (_ssuID, _itemID, 1)));
  }

  function test_SubscribeWithUnknownItem() public {
    // arrange
    uint256 invalidItemID = uint256(112603025077760770783264636189502217226733230421932850697496331082050661822826); // lens 3x (77518)

    // assert
    vm.expectRevert(abi.encodeWithSelector(SmartStorageUnitSystem.UnknownDepositMethodError.selector, invalidItemID));

    // act
    vm.prank(_player);
    _world.call(_systemId, abi.encodeCall(SmartStorageUnitSystem.subscribe, (_ssuID, invalidItemID, 1)));
  }

  function test_SubscribeWithNotEnoughItems() public {
    // arrange
    // assert
    vm.expectRevert(abi.encodeWithSelector(SmartStorageUnitSystem.NotEnoughOfItemError.selector, _itemID));

    // act
    vm.prank(_player);
    _world.call(_systemId, abi.encodeCall(SmartStorageUnitSystem.subscribe, (_ssuID, _itemID, 1)));
  }

  function test_SubscribeWithRequiredQuantity() public {
    // arrange
    PortaeAstralesDepositMethodsData memory depositMethod = PortaeAstralesDepositMethods.get(_itemID);
    EphemeralInvItemTableData memory items;
    //  PortaeAstralesDepositsData memory deposit;
    uint256 subscriptionTime;

    _addItemsToEphemeralInventory(_itemID, _player, depositMethod.requiredQuantity);

    items = EphemeralInvItemTable.get(_ssuID, _itemID, _player);

    assertTrue(items.quantity == depositMethod.requiredQuantity, 'expect ephemeral items to be deposited');

    // act
    vm.prank(_player);
    _world.call(_systemId, abi.encodeCall(SmartStorageUnitSystem.subscribe, (_ssuID, _itemID, 1)));

    // assert
    //    deposit = PortaeAstralesDeposits.get(PortaeAstralesDepositsData(_playerCharacterID, depositMethod.requiredQuantity, _ssuID, block.timestamp));
    subscriptionTime = PortaeAstralesSubscriptions.get(_playerCharacterID);

    assertTrue(subscriptionTime > block.timestamp, 'expected subscription time to be greater than now');

    vm.startBroadcast(_deployerPrivateKey);
    PortaeAstralesSubscriptions.deleteRecord(_playerCharacterID);
    vm.stopBroadcast();
  }
}
