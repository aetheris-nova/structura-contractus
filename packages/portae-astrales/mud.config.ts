import { defineWorld } from '@latticexyz/world';
import { config } from 'dotenv';
import { relative } from 'node:path';

export default (() => {
  let outputDirectory;
  let sourceDirectory;

  config();

  if (!process.env.NAMESPACE) {
    throw new Error('no NAMESPACE environment variable defined');
  }

  sourceDirectory = 'src/contracts';
  outputDirectory = relative(sourceDirectory, '.mud/codegen'); // output is relative to source - https://mud.dev/config/reference#additional-options

  return defineWorld({
    codegen: {
      outputDirectory,
    },
    namespace: process.env.NAMESPACE,
    sourceDirectory,
    tables: {
      ItemSubscriptionMethods: {
        key: ['itemID'],
        name: 'ItmSubMeths',
        schema: {
          active: 'bool',
          duration: 'uint256',
          itemID: 'uint256',
          requiredQuantity: 'uint256',
        },
      },
      ItemSubscriptions: {
        key: ['id'],
        name: 'ItmSubs',
        schema: {
          characterID: 'uint256',
          createdAt: 'uint256',
          duration: 'uint256',
          id: 'uint256',
          itemID: 'uint256',
          quantity: 'uint256',
          ssuID: 'uint256',
        },
      },
      SubscriptionTimes: {
        key: ['characterID'],
        name: 'SubTms',
        schema: {
          characterID: 'uint256',
          expiresAt: 'uint256',
          updatedAt: 'uint256',
        },
      },
    },
  });
})();
