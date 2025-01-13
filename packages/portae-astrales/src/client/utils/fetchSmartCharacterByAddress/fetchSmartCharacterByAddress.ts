import axios, { type AxiosResponse } from 'axios';

// types
import type { IFetchOptions, ISmartCharacter } from '@client/types';

export default async function fetchSmartCharacterByAddress(
  address: string,
  { delay }: IFetchOptions = { delay: 0 }
): Promise<ISmartCharacter> {
  return new Promise<ISmartCharacter>((resolve, reject) => {
    window.setTimeout(async () => {
      let response: AxiosResponse<ISmartCharacter>;

      try {
        response = await axios.get(`${import.meta.env.VITE_WORLD_API_URL}/smartcharacters/${address.toLowerCase()}`);

        return resolve(response.data);
      } catch (error) {
        reject(error);
      }
    }, delay);
  });
}
