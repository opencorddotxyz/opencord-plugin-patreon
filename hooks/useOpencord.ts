import { getClient } from '@opencord/client';
import { AuthInfo } from '@opencord/client/lib/model/opencord';
import { useEffect } from 'react';

import { useRebuild, useStore } from '@/utils/store/useStore';

type Opencord = ReturnType<typeof getClient>;

class OpencordHelper {
  client?: Opencord;
  initialized = false;
  initFailed = false;
  inOpencord = false;
  getCoding = false;

  init() {
    if (this.initialized) {
      return true;
    }
    try {
      const oc = getClient({
        debug: process.env.NODE_ENV === 'development',
      });
      this.initialized = true;
      this.inOpencord = oc.platform !== 'unknown';
      this.initFailed = oc.version === '';
      if (!this.initFailed) {
        this.client = oc;
      }
    } catch {
      this.initFailed = true;
    }

    return this.initialized;
  }
}

export const opencordHelper = new OpencordHelper();

const kCurrentUser = 'kCurrentUser';

export const useOpencord = () => {
  const rebuild = useRebuild();
  const [currentUser, setCurrentUser] = useStore<AuthInfo>(kCurrentUser);

  const getCode = async () => {
    let code: string | undefined;
    if (currentUser?.code) {
      return currentUser.code;
    }
    if (
      opencordHelper.client &&
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
        code = data.code;
      }
    }

    return code;
  };

  useEffect(() => {
    if (!opencordHelper.initialized) {
      opencordHelper.init();
      rebuild();
    }
    getCode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    currentUser,
    isInitialized: opencordHelper.initialized,
    isInitFailed: opencordHelper.initFailed,
    isInOpencord: opencordHelper.inOpencord,
  };
};
