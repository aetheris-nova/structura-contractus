// SPDX-License-Identifier: CC0-1.0
pragma solidity >=0.8.24;

import { System } from '@latticexyz/world/src/System.sol';
import { PortaeAstralesSubscriptions } from '@mud/tables/PortaeAstralesSubscriptions.sol';

/**
 * @dev This contract is an example for implementing logic to a smart gate
 */
contract PortaeAstralesSystem is System {
  function canJump(uint256 characterId, uint256 sourceGateId, uint256 destinationGateId) public view returns (bool) {
    return true;
  }
}
