// utils
import useStore from '@client/utils/useStore';

/**
 * Checks if the dApp is being run within the EVE Frontier game. This is determined whether the list of announced
 * providers contains the "EVE Frontier Wallet" provider.
 * @returns {boolean} True, if the dApp is running in game. False otherwise.
 * @see {@link https://docs.evefrontier.com/Dapp/Building/in-game-provider}
 */
export default function useSelectIsInGame(): boolean {
  return useStore((state) => state.inGame);
}
