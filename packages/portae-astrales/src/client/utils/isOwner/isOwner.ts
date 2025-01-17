import { type Address, getAddress } from 'viem';

// types
import type { ISmartAssembly } from '@client/types';

/**
 * Convenience function that simply checks if an address is the owner of a smart assembly. If the owner is empty, then
 * false is returned.
 * @param {ISmartAssembly} smartAssembly - The smart assembly to check ownership of.
 * @param {Address} address - The address to check.
 * @returns {boolean} True if the `address` is the owner, false otherwise.
 */
export default function isOwner(smartAssembly: ISmartAssembly, address: Address): boolean {
  if (!smartAssembly.ownerId) {
    return false;
  }

  return getAddress(smartAssembly.ownerId) === getAddress(address);
}
