import type { SmartAssemblies } from '@eveworld/types';
import axios, { type AxiosResponse } from 'axios';

// types
import type { IFetchOptions, TSmartAssemblyWithAdditionalModules } from '@client/types';

export default async function fetchSmartAssemblyByID<Type extends SmartAssemblies>(
  id: string,
  { delay }: IFetchOptions = { delay: 0 }
): Promise<TSmartAssemblyWithAdditionalModules<Type>> {
  return new Promise<TSmartAssemblyWithAdditionalModules<Type>>((resolve, reject) => {
    window.setTimeout(async () => {
      let response: AxiosResponse<TSmartAssemblyWithAdditionalModules<Type>>;

      try {
        response = await axios.get(`${import.meta.env.VITE_WORLD_API_HTTP_URL}/smartassemblies/${id}}`);

        return resolve(response.data);
      } catch (error) {
        reject(error);
      }
    }, delay);
  });
}
