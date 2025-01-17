// SPDX-License-Identifier: CC0-1.0
pragma solidity >=0.8.24;

import { System } from '@latticexyz/world/src/System.sol';

// mud
import { SubscriptionTimes, SubscriptionTimesData } from '@mud/tables/SubscriptionTimes.sol';

/**
 * @notice Implements the logic for the smart gates. This simply checks if a character has a valid subscription.
 * A valid subscription is based on whether a character has deposited a certain amount of Salt within a valid SSU.
 */
contract SmartGateSystem is System {
  /**
   * @notice Determines if a character can use the gate.
   * @dev
   * * Character can only use the gate if it has a valid subscription.
   * @param characterId The ID of the character using the gate.
   * @param sourceGateId The ID of the gate the character is attempting to jump.
   * @param destinationGateId The ID of the gate the character is attempting to jump to.
   * @return True if the character can use the gate, false otherwise.
   */
  function canJump(uint256 characterId, uint256 sourceGateId, uint256 destinationGateId) public view returns (bool) {
    SubscriptionTimesData memory subscription = SubscriptionTimes.get(characterId);

    if (subscription.expiresAt >= block.timestamp) {
      return true;
    }

    return false;
  }
}
