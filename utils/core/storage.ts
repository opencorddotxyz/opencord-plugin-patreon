import { jsonDecode, jsonEncode } from './base';

class Storage {
  _caches = {};
  _prefix =
    process.env.NODE_ENV === 'production' ? '' : `${process.env.NODE_ENV}-`;

  get<T = any>(_key: string): T | undefined {
    if (typeof localStorage === 'undefined') {
      return;
    }
    const key = this._prefix + _key;
    if (this._caches[key]) {
      return this._caches[key];
    }
    const str = localStorage.getItem(key);
    this._caches[key] = jsonDecode(str ?? '{}').data;

    return this._caches[key];
  }

  set = (_key: string, data: any) => {
    if (typeof localStorage === 'undefined') {
      return;
    }
    const key = this._prefix + _key;
    if (data) {
      const saveData = jsonEncode({ data })!;
      localStorage.setItem(key, saveData);
    } else {
      localStorage.removeItem(key);
    }
    this._caches[key] = data;
  };
}

export const storage = new Storage();
