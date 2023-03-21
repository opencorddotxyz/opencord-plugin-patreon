import { delay } from '@/utils/core/base';
import { isBrowser } from '@/utils/core/is';
import { getLocal } from '@/utils/store';

import { store } from './store/useStore';

type StaleCallback = () => void;
let _innerStaleCallback: StaleCallback;

let _checking = false;

async function _check() {
  _checking = true;

  for (;;) {
    await delay(200);

    const code = getLocal('code');

    if (!code) {
      if (_innerStaleCallback) {
        _innerStaleCallback();
      }
    } else {
      store.set('loggedIn', true);
      store.set('code', code);
    }
  }
}

export function validateSingle() {
  if (isBrowser() && !_checking) {
    _check();
  }
}

export function registerStaleCallback(staleCallback: StaleCallback) {
  _innerStaleCallback = staleCallback;
}

// check immediately
validateSingle();
