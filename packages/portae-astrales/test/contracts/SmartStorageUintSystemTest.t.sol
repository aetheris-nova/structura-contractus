// SPDX-License-Identifier: CC0-1.0
pragma solidity ^0.8.24;

import 'forge-std/Test.sol';
import { FRONTIER_WORLD_DEPLOYMENT_NAMESPACE, SMART_STORAGE_UNIT_SYSTEM_NAME } from '@eveworld/common-constants/src/constants.sol';
import { CharactersByAddressTable } from '@eveworld/world/src/codegen/tables/CharactersByAddressTable.sol';
import { GlobalDeployableState } from '@eveworld/world/src/codegen/tables/GlobalDeployableState.sol';
import { IBaseWorld } from '@eveworld/world/src/codegen/world/IWorld.sol';
import { EntityRecordLib } from '@eveworld/world/src/modules/entity-record/EntityRecordLib.sol';
import { EntityRecordOffchainTableData } from '@eveworld/world/src/codegen/tables/EntityRecordOffchainTable.sol';
import { SmartCharacterLib } from '@eveworld/world/src/modules/smart-character/SmartCharacterLib.sol';
import { SmartDeployableLib } from '@eveworld/world/src/modules/smart-deployable/SmartDeployableLib.sol';
import { EntityRecordData as CharacterEntityRecord } from '@eveworld/world/src/modules/smart-character/types.sol';
import { SmartStorageUnitLib } from '@eveworld/world/src/modules/smart-storage-unit/SmartStorageUnitLib.sol';
import { EntityRecordData, WorldPosition, SmartObjectData, Coord } from '@eveworld/world/src/modules/smart-storage-unit/types.sol';
import { ResourceId } from '@latticexyz/world/src/WorldResourceId.sol';
import { MudTest } from '@latticexyz/world/test/MudTest.t.sol';

// contracts
import { SmartStorageUnitSystem } from '@contracts/SmartStorageUnitSystem.sol';

// mud
import { PortaeAstralesDepositMethods, PortaeAstralesDepositMethodsData } from '@mud/tables/PortaeAstralesDepositMethods.sol';
import { IWorld } from '@mud/world/IWorld.sol';

// utils
import { SmartObjectUtils } from '@contracts/utils/SmartObjectUtils.sol';

contract SmartStorageUintSystemTest is MudTest {
  using SmartDeployableLib for SmartDeployableLib.World;
  using SmartStorageUnitLib for SmartStorageUnitLib.World;
  using EntityRecordLib for EntityRecordLib.World;
  using SmartCharacterLib for SmartCharacterLib.World;

  EntityRecordLib.World private _entityRecord;
  uint256 private _itemID = uint256(70505200487489129491533272716910408603753256595363780714882065332876101173161); // salt (83839)
  bytes14 private _namespace;
  address private _owner;
  SmartCharacterLib.World private _smartCharacter;
  SmartDeployableLib.World private _smartDeployable;
  SmartStorageUnitLib.World private _smartStorageUnit;
  uint256 private _ssuID = uint256(17614304337475056394242299294383532840873792487945557467064313427436901763821);
  ResourceId private _systemId;
  IWorld private _world;

  function setUp() public override {
    super.setUp();

    _entityRecord = EntityRecordLib.World({
      iface: IBaseWorld(worldAddress),
      namespace: FRONTIER_WORLD_DEPLOYMENT_NAMESPACE
    });
    _namespace = bytes14(bytes(vm.envString('NAMESPACE')));
    _owner = vm.addr(vm.envUint('PRIVATE_KEY'));
    _smartCharacter = SmartCharacterLib.World({
      iface: IBaseWorld(worldAddress),
      namespace: FRONTIER_WORLD_DEPLOYMENT_NAMESPACE
    });
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

    if (CharactersByAddressTable.get(_owner) == 0) {
      _smartCharacter.createCharacter(
        123,
        _owner,
        200003,
        CharacterEntityRecord({ typeId: 123, itemId: 234, volume: 100 }),
        EntityRecordOffchainTableData({ name: 'ron', dappURL: 'noURL', description: '.' }),
        ''
      );
    }

    _createAnchorAndOnline(_ssuID, _owner);
  }

  /**
   * helper functions
   */

  function _createAnchorAndOnline(uint256 ssuID, address owner) private {
    // check global state and resume if needed
    if (GlobalDeployableState.getIsPaused() == false) {
      _smartDeployable.globalResume();
    }

    //Create, anchor the ssu and bring online
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

  function test_SubscribeWithUnknownItem() public {
    // arrange
    uint256 invalidItemID = uint256(112603025077760770783264636189502217226733230421932850697496331082050661822826); // lens 3x (77518)
    uint256 quantity = uint256(4);

    // assert
    vm.expectRevert(abi.encodeWithSelector(SmartStorageUnitSystem.UnknownDepositMethodError.selector, invalidItemID));

    // act
    _world.call(_systemId, abi.encodeCall(SmartStorageUnitSystem.subscribe, (_ssuID, invalidItemID, quantity)));
  }
}
