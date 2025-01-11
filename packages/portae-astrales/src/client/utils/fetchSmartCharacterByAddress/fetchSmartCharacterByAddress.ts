import type { SmartCharacter } from '@eveworld/types';
import axios, { type AxiosResponse } from 'axios';

// types
import type { IFetchOptions } from '@client/types';

export default async function fetchSmartCharacterByAddress(
  address: string,
  { delay }: IFetchOptions = { delay: 0 }
): Promise<SmartCharacter> {
  return new Promise<SmartCharacter>((resolve, reject) => {
    window.setTimeout(async () => {
      let response: AxiosResponse<SmartCharacter>;

      try {
        response = await axios.get(`${import.meta.env.VITE_WORLD_API_URL}/smartcharacters/${address.toLowerCase()}`);

        return resolve(response.data);
      } catch (error) {
        reject(error);
      }
    }, delay);
  });
}
