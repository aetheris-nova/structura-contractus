import { uuid } from '@stablelib/uuid';

/**
 * Simply checks if `localStorage` is available.
 * @returns {boolean} true if `localStorage` is available, false otherwise.
 */
export default function isLocalStorageAvailable(): boolean {
  const key = uuid();

  try {
    window.localStorage.setItem(key, key);
    window.localStorage.removeItem(key);

    return true;
    /* eslint-disable @typescript-eslint/no-unused-vars */
  } catch (_) {
    /* eslint-enable @typescript-eslint/no-unused-vars */
    return false;
  }
}
