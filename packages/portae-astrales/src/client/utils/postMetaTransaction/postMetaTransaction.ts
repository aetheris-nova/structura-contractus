import type { IUtilityOptions } from '@aetherisnova/types';
import { IWorldAbi as eveWorldABI } from '@eveworld/contracts';
import type { ERC2771ForwardRequest } from '@eveworld/types';
import { getBlock, signTypedData, simulateContract } from '@wagmi/core';
import axios from 'axios';
import { type Address, encodeFunctionData, getAbiItem, toHex } from 'viem';

import { META_TRANSACTION_TIMEOUT } from '@client/constants';

// errors
import UnknownError from '@client/errors/UnknownError';
import WorldDataNotFoundError from '@client/errors/WorldDataNotFoundError';

// types
import type { IOptions } from './types';

export default async function postMetaTransaction(
  { encodedFunctionData, fromAddress, systemID, wagmiConfig, worldConfig }: IOptions,
  { logger }: IUtilityOptions = {}
): Promise<void> {
  const __function = 'postMetaTransaction';
  const encodedCallFromFunctionData = encodeFunctionData({
    abi: [
      getAbiItem({
        abi: eveWorldABI.abi,
        name: 'callFrom',
      }),
    ],
    args: [fromAddress, systemID, encodedFunctionData],
  });
  const forwarderABI = worldConfig.abis.find(({ name }) => name === 'ERC2771Forwarder') || null;
  const latestBlock = await getBlock(wagmiConfig);
  let forwardRequest: ERC2771ForwardRequest;
  let signature: Address;

  if (!forwarderABI) {
    throw new WorldDataNotFoundError('failed to get erc2771forwarder abi');
  }

  try {
    forwardRequest = {
      from: fromAddress,
      to: worldConfig.contracts.world.address,
      value: 0n,
      gas: 500_000n,
      nonce: BigInt(((Math.random() * 10) ^ 18).toPrecision() + Number(latestBlock.timestamp)),
      deadline: Number(latestBlock.timestamp) + META_TRANSACTION_TIMEOUT, // set deadline set to 100s after latest block
      data: encodedCallFromFunctionData,
    };
    signature = await signTypedData(wagmiConfig, {
      account: fromAddress,
      domain: {
        name: 'Forwarder',
        chainId: BigInt(worldConfig.chainId),
        version: '1',
        verifyingContract: worldConfig.contracts.forwarder.address,
      },
      primaryType: 'ForwardRequest',
      message: forwardRequest,
      types: {
        EIP712Domain: [
          { name: 'name', type: 'string' },
          { name: 'version', type: 'string' },
          { name: 'chainId', type: 'uint256' },
          { name: 'verifyingContract', type: 'address' },
        ],
        ForwardRequest: [
          { name: 'from', type: 'address' },
          { name: 'to', type: 'address' },
          { name: 'value', type: 'uint256' },
          { name: 'gas', type: 'uint256' },
          { name: 'nonce', type: 'uint256' },
          { name: 'deadline', type: 'uint48' },
          { name: 'data', type: 'bytes' },
        ],
      },
    });

    logger && logger.debug(`${__function}: signed forwarder request`);

    const { request } = await simulateContract(wagmiConfig, {
      abi: forwarderABI.abi,
      address: fromAddress,
      args: [
        {
          from: forwardRequest.from,
          to: forwardRequest.to,
          value: forwardRequest.value,
          gas: forwardRequest.gas,
          nonce: forwardRequest.nonce,
          deadline: forwardRequest.deadline,
          data: forwardRequest.data,
          signature,
        },
      ],
      chainId: worldConfig.chainId,
      functionName: 'execute',
    });

    if (!request.args) {
      throw new UnknownError('failed to get args from "execute" transaction simulation');
    }

    await axios.post(`${import.meta.env.VITE_WORLD_API_HTTP_URL}/metatransaction`, {
      data: forwardRequest.data,
      deadline: forwardRequest.deadline,
      from: forwardRequest.from,
      gas: Number(forwardRequest.gas),
      nonce: toHex(forwardRequest.nonce),
      signature,
      to: forwardRequest.to,
      value: Number(forwardRequest.value),
    });
  } catch (error) {
    logger && logger.error(error);

    throw error;
  }
}
