import axios, { type AxiosResponse } from 'axios';

// types
import type { IFetchOptions, IItem } from '@client/types';

export default async function fetchItemByID(id: string, { delay }: IFetchOptions = { delay: 0 }): Promise<IItem> {
  return new Promise<IItem>((resolve, reject) => {
    window.setTimeout(async () => {
      let response: AxiosResponse<IItem>;

      try {
        response = await axios.get(`${import.meta.env.VITE_WORLD_API_HTTP_URL}/types/${id}`);

        return resolve(response.data);
      } catch (error) {
        reject(error);
      }
    }, delay);
  });
}
