import store from 'store2';

import { isBrowser, isEmpty } from './core/is';

function _getPrefix() {
  return `opencord-patreon:${process.env.NEXT_PUBLIC_APP_ENV}`;
}

function _formatKey(key: string, keep?: boolean) {
  if (keep) {
    return key;
  }

  return `${_getPrefix()}:${key}`;
}

export const getLocal = (key: string, keep = false) => {
  if (!isBrowser()) {
    return;
  }
  const data = store.get(_formatKey(key, keep));

  return data;
};

export const setLocal = (key: string, data: any, keep?: boolean) => {
  if (!isBrowser()) {
    return;
  }
  store.set(_formatKey(key, keep), data, true);
};

export const removeLocal = (key: string, keep = false) => {
  if (!isBrowser()) {
    return;
  }
  store.remove(_formatKey(key, keep));
};

export const clearAllLocal = () => {
  if (!isBrowser()) {
    return;
  }
  store.clearAll();
};

export const keysOfLocal = (): string[] => {
  if (isBrowser()) {
    const keys = store.keys();

    if (isEmpty(keys)) {
      return [];
    }

    return keys;
  }

  return [];
};
