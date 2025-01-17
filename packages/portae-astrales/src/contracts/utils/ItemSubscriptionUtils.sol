//SPDX-License-Identifier: CC0-1.0
pragma solidity >=0.8.24;

library ItemSubscriptionUtils {
  /**
   * @notice Convenience function to generates a unique ID for a given table.
   * @param characterID The ID of the character.
   * @param createdAt The timestamp, in seconds, for when the record was created.
   * @param duration The duration to be added.
   * @param itemID The ID of the item that was used in the subscription.
   * @param quantity The quantity of the item used in the subscription.
   * @param ssuID The ID of the SSU to where the item was deposited.
   * @param nonce A random set of bytes. This SHOULD be provided off-chain due to Solidity's deterministic nature.
   * @return An unique ID for the given data.
   */
  function generateID(
    uint256 characterID,
    uint256 createdAt,
    uint256 duration,
    uint256 itemID,
    uint256 quantity,
    uint256 ssuID,
    bytes32 nonce
  ) internal pure returns (uint256) {
    return uint256(keccak256(abi.encodePacked(characterID, createdAt, duration, itemID, quantity, ssuID, nonce)));
  }
}
