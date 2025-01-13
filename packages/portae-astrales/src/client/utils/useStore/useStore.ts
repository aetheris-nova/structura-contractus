import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

// constants
import { STORE_NAME } from '@client/constants';

// slices
import createAccountSlice from '@client/slices/createAccountSlice';
import createItemSlice from '@client/slices/createItemSlice';
import createLayoutSlice from '@client/slices/createLayoutSlice';
import createSystemSlice from '@client/slices/createSystemSlice';
import createTokenSlice from '@client/slices/createTokenSlice';
import createWorldSlice from '@client/slices/createWorldSlice';

// types
import type { TState } from '@client/types';

// utils
import isLocalStorageAvailable from '@client/utils/isLocalStorageAvailable';

const useStore = create<TState>()(
  devtools(
    persist(
      (...api) => ({
        ...createAccountSlice(...api),
        ...createItemSlice(...api),
        ...createLayoutSlice(...api),
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
