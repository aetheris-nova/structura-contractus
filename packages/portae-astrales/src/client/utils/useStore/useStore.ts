import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

// constants
import { STORE_NAME } from '@client/constants';

// slices
import createLayoutSlice from '@client/slices/createLayoutSlice';
import createSystemSlice from '@client/slices/createSystemSlice';

// types
import type { TState } from '@client/types';

// utils
import isLocalStorageAvailable from '@client/utils/isLocalStorageAvailable';

const useStore = create<TState>()(
  devtools(
    persist(
      (...api) => ({
        ...createLayoutSlice(...api),
        ...createSystemSlice(...api),
      }),
      {
        name: STORE_NAME,
        partialize: (state) => ({
          colorMode: state.colorMode,
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
