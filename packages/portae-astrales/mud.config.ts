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
      PortaeAstralesDeposits: {
        key: [],
        name: 'PADeps',
        schema: {
          characterID: 'uint256',
          quantity: 'uint256',
          ssuID: 'uint256',
          timestamp: 'uint256',
        },
      },
      PortaeAstralesSubscriptions: {
        key: ['characterID'],
        name: 'PASubs',
        schema: {
          characterID: 'uint256',
          expiresAt: 'uint256',
        },
      },
      PortaeAstralesDepositMethods: {
        key: ['itemID'],
        name: 'PADepMeths',
        schema: {
          active: 'bool',
          duration: 'uint256',
          itemID: 'uint256',
          requiredQuantity: 'uint256',
        },
      },
    },
  });
})();
