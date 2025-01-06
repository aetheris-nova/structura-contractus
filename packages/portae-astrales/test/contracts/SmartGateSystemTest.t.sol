// SPDX-License-Identifier: CC0-1.0
pragma solidity ^0.8.24;

import 'forge-std/Test.sol';
import { FRONTIER_WORLD_DEPLOYMENT_NAMESPACE, SMART_GATE_SYSTEM_NAME } from '@eveworld/common-constants/src/constants.sol';
import { GlobalDeployableState } from '@eveworld/world/src/codegen/tables/GlobalDeployableState.sol';
import { IBaseWorld } from '@eveworld/world/src/codegen/world/IWorld.sol';
import { SmartDeployableLib } from '@eveworld/world/src/modules/smart-deployable/SmartDeployableLib.sol';
import { SmartObjectData } from '@eveworld/world/src/modules/smart-deployable/types.sol';
import { SmartGateLib } from '@eveworld/world/src/modules/smart-gate/SmartGateLib.sol';
import { EntityRecordData, WorldPosition, Coord } from '@eveworld/world/src/modules/smart-storage-unit/types.sol';
import { ResourceId } from '@latticexyz/world/src/WorldResourceId.sol';
import { MudTest } from '@latticexyz/world/test/MudTest.t.sol';

// constants
import { DEFAULT_DEPOSIT_METHOD_DURATION } from '@contracts/constants/Durations.sol';

// contracts
import { SmartGateSystem } from '@contracts/SmartGateSystem.sol';

// mud
import { PortaeAstralesDepositMethods, PortaeAstralesDepositMethodsData } from '@mud/tables/PortaeAstralesDepositMethods.sol';
import { PortaeAstralesSubscriptions } from '@mud/tables/PortaeAstralesSubscriptions.sol';
import { IWorld } from '@mud/world/IWorld.sol';

// utils
import { SmartObjectUtils } from '@contracts/utils/SmartObjectUtils.sol';
import { SmartCharacterUtils } from './utils/SmartCharacterUtils.sol';

contract SmartGateSystemTest is MudTest {
  using SmartDeployableLib for SmartDeployableLib.World;
  using SmartGateLib for SmartGateLib.World;

  uint256 private _deployerPrivateKey;
  uint256 private _destinationGateID =
    uint256(67387866010353549996346280963079126762450299713900890730943797543376801696007);
  uint256 private _itemID = uint256(70505200487489129491533272716910408603753256595363780714882065332876101173161); // salt (83839)
  bytes14 private _namespace;
  address private _owner;
  uint256 private _ownerCharacterID = uint256(128);
  address private _player;
  uint256 private _playerCharacterID = uint256(256);
  uint256 private _sourceGateID =
    uint256(34818344039668088032259299209624217066809194721387714788472158182502870248994);
  SmartDeployableLib.World private _smartDeployable;
  SmartGateLib.World private _smartGate;
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
    _smartGate = SmartGateLib.World({
      iface: IBaseWorld(worldAddress),
      namespace: FRONTIER_WORLD_DEPLOYMENT_NAMESPACE
    });
    _systemId = SmartObjectUtils.resourceID(_namespace, SMART_GATE_SYSTEM_NAME);
    _world = IWorld(worldAddress);

    // create characters
    SmartCharacterUtils.createCharacter(_ownerCharacterID, _owner, 'owner', worldAddress);
    SmartCharacterUtils.createCharacter(_playerCharacterID, _player, 'player', worldAddress);

    // create and bring online gates
    _createAnchorAndOnline(_sourceGateID, _owner);
    _createAnchorAndOnline(_destinationGateID, _owner);
  }

  /**
   * helper functions
   */

  function _createAnchorAndOnline(uint256 gateID, address owner) private {
    // create and anchor gate
    _smartGate.createAndAnchorSmartGate(
      gateID,
      EntityRecordData({ typeId: 7888, itemId: 111, volume: 10 }),
      SmartObjectData({ owner: owner, tokenURI: 'test' }),
      WorldPosition({ solarSystemId: 1, position: Coord({ x: 1, y: 1, z: 1 }) }),
      1e18, // fuelUnitVolume,
      1, // fuelConsumptionPerMinute,
      1000000 * 1e18, // fuelMaxCapacity,
      100010000 * 1e18 // maxDistance
    );

    // check global state and resume if needed
    if (GlobalDeployableState.getIsPaused() == false) {
      _smartDeployable.globalResume();
    }

    _smartDeployable.depositFuel(gateID, 200010);
    _smartDeployable.bringOnline(gateID);
  }

  /**
   * canJump()
   */

  function test_CanJumpWithNoSubscription() public {
    // arrange
    vm.startBroadcast(_deployerPrivateKey);
    PortaeAstralesSubscriptions.deleteRecord(_playerCharacterID);
    vm.stopBroadcast();

    // act
    bool result = abi.decode(
      _world.call(
        _systemId,
        abi.encodeCall(SmartGateSystem.canJump, (_playerCharacterID, _sourceGateID, _destinationGateID))
      ),
      (bool)
    );

    // assert
    assertFalse(result, 'should not have access to jump through gate');
  }

  function test_CanJumpWithSubscription() public {
    // arrange
    bool result;

    vm.startBroadcast(_deployerPrivateKey);
    PortaeAstralesSubscriptions.set(_playerCharacterID, block.timestamp + DEFAULT_DEPOSIT_METHOD_DURATION);
    vm.stopBroadcast();

    // act
    result = abi.decode(
      _world.call(
        _systemId,
        abi.encodeCall(SmartGateSystem.canJump, (_playerCharacterID, _sourceGateID, _destinationGateID))
      ),
      (bool)
    );

    // assert
    assertTrue(result, 'should have access to jump through gate');
  }
}
