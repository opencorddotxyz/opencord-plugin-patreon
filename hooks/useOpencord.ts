import { getClient } from '@opencord/client';
import { AuthInfo } from '@opencord/client/lib/model/opencord';
import { useState } from 'react';

import { useRebuild } from '@/utils/store/useStore';

import useMount from './core/useMount';

type Opencord = ReturnType<typeof getClient>;

class OpencordHelper {
  client?: Opencord;
  inited = false;
  initFailed = false;
  inOpencord = false;
  getCoding = false;

  init() {
    if (this.inited) {
      return true;
    }
    try {
      const oc = getClient({
        debug: process.env.NODE_ENV === 'development',
      });
      this.inOpencord = oc.platform !== 'unknown';
      this.inited = oc.version !== '';
      if (this.inited) {
        this.client = oc;
      }
    } catch {
      this.initFailed = true;
    }

    return this.inited;
  }
}

export const opencordHelper = new OpencordHelper();

export const useOpencord = () => {
  const rebuild = useRebuild();
  const [currentUser, setCurrentUser] = useState<AuthInfo>();
  useMount(() => {
    if (!opencordHelper.inited) {
      opencordHelper.init();
      rebuild();
    }
    setTimeout(async () => {
      if (
        opencordHelper.client &&
        opencordHelper.inited &&
        opencordHelper.inOpencord &&
        !opencordHelper.getCoding
      ) {
        // auto getCode
        opencordHelper.getCoding = true;
        const {
          code: _,
          message: __,
          data,
        } = await opencordHelper.client.getCode();
        opencordHelper.getCoding = false;
        if (data) {
          setCurrentUser(data);
        }
      }
    });
  });

  return {
    currentUser,
    isInited: opencordHelper.inited,
    isInitFailed: opencordHelper.initFailed,
    isInOpencord: opencordHelper.inOpencord,
  };
};
