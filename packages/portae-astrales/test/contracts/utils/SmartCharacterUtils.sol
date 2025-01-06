//SPDX-License-Identifier: CC0-1.0
pragma solidity >=0.8.24;

import { FRONTIER_WORLD_DEPLOYMENT_NAMESPACE, SMART_STORAGE_UNIT_SYSTEM_NAME } from '@eveworld/common-constants/src/constants.sol';
import { CharactersByAddressTable } from '@eveworld/world/src/codegen/tables/CharactersByAddressTable.sol';
import { IBaseWorld } from '@eveworld/world/src/codegen/world/IWorld.sol';
import { EntityRecordOffchainTableData } from '@eveworld/world/src/codegen/tables/EntityRecordOffchainTable.sol';
import { EntityRecordData as CharacterEntityRecord } from '@eveworld/world/src/modules/smart-character/types.sol';
import { SmartCharacterLib } from '@eveworld/world/src/modules/smart-character/SmartCharacterLib.sol';

library SmartCharacterUtils {
  using SmartCharacterLib for SmartCharacterLib.World;

  /**
   * @notice Creates a character, if one does not exist.
   * @param characterID The ID of the character.
   * @param characterAddress The address of the character.
   * @param name A name for the character.
   * @param _worldAddress The address of the world contract.
   */
  function createCharacter(
    uint256 characterID,
    address characterAddress,
    string memory name,
    address _worldAddress
  ) internal {
    SmartCharacterLib.World memory smartCharacterLib = SmartCharacterLib.World({
      iface: IBaseWorld(_worldAddress),
      namespace: FRONTIER_WORLD_DEPLOYMENT_NAMESPACE
    });

    if (CharactersByAddressTable.get(characterAddress) == 0) {
      smartCharacterLib.createCharacter(
        characterID,
        characterAddress,
        0,
        CharacterEntityRecord({ typeId: 123, itemId: 234, volume: 100 }),
        EntityRecordOffchainTableData({ name: name, dappURL: 'noURL', description: '.' }),
        ''
      );
    }
  }
}
