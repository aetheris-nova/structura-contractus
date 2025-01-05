//SPDX-License-Identifier: CC0-1.0
pragma solidity >=0.8.24;

import { DeployableTokenTable } from '@eveworld/world/src/codegen/tables/DeployableTokenTable.sol';
import { IERC721 } from '@eveworld/world/src/modules/eve-erc721-puppet/IERC721.sol';
import { ResourceId } from '@latticexyz/store/src/ResourceId.sol';
import { ResourceIds } from '@latticexyz/store/src/codegen/tables/ResourceIds.sol';
import { WorldResourceIdLib } from '@latticexyz/world/src/WorldResourceId.sol';
import { RESOURCE_SYSTEM } from '@latticexyz/world/src/worldResourceTypes.sol';

library SmartObjectUtils {
  /**
   * @notice Convenience function to get the owner of a smart object.
   * @param smartObjectID The smart object ID.
   * @return The address of the owner, or a zero address if the smart object doesn't exist.
   */
  function ownerOf(uint256 smartObjectID) internal returns (address) {
    return IERC721(DeployableTokenTable.getErc721Address()).ownerOf(smartObjectID);
  }

  /**
   * @notice Convenience function to create a resource ID for the given system.
   * @param namespace The resource namespace.
   * @param systemName The system name.
   * @return The generated resource ID for a given system.
   */
  function resourceID(bytes14 namespace, bytes16 systemName) internal pure returns (ResourceId) {
    return WorldResourceIdLib.encode({ typeId: RESOURCE_SYSTEM, namespace: namespace, name: systemName });
  }
}
