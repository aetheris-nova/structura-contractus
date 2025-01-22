import { isLocalStorageAvailable } from '@aetherisnova/utils';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

// constants
import { STORE_NAME } from '@client/constants';

// slices
import createAccountSlice from '@client/slices/createAccountSlice';
import createItemSlice from '@client/slices/createItemSlice';
import createLayoutSlice from '@client/slices/createLayoutSlice';
import createSmartAssemblySlice from '@client/slices/createSmartAssemblySlice';
import createSystemSlice from '@client/slices/createSystemSlice';
import createTokenSlice from '@client/slices/createTokenSlice';
import createWorldSlice from '@client/slices/createWorldSlice';

// types
import type { TState } from '@client/types';

const useStore = create<TState>()(
  devtools(
    persist(
      (...api) => ({
        ...createAccountSlice(...api),
        ...createItemSlice(...api),
        ...createLayoutSlice(...api),
        ...createSmartAssemblySlice(...api),
        ...createSystemSlice(...api),
        ...createTokenSlice(...api),
        ...createWorldSlice(...api),
      }),
      {
        name: STORE_NAME,
        partialize: ({ accounts, colorMode, items, tokens, worldConfig }) => ({
          accounts,
          colorMode,
          items,
          tokens,
          worldConfig,
        }),
        storage: createJSONStorage(() => (isLocalStorageAvailable() ? window.localStorage : window.sessionStorage)),
        version: 0,
      }
    ),
    {
      name: STORE_NAME,
    }
  )
);

export default useStore;
