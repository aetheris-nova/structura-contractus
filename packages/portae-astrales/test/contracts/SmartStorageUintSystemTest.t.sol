// SPDX-License-Identifier: CC0-1.0
pragma solidity ^0.8.24;

import 'forge-std/Test.sol';
import { MudTest } from '@latticexyz/world/test/MudTest.t.sol';

// contracts
import { IWorld } from '@mud/world/IWorld.sol';

contract SmartStorageUintSystemTest is MudTest {
  IWorld world;

  function setUp() public override {
    super.setUp();

    world = IWorld(worldAddress);
  }

  function test_WorldExists() public {
    uint256 codeSize;
    address addr = worldAddress;

    assembly {
      codeSize := extcodesize(addr)
    }

    assertTrue(codeSize > 0);
  }
}
