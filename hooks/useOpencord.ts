import { getClient } from '@opencord/client';
import { AuthInfo } from '@opencord/client/lib/model/opencord';
import { useEffect, useState } from 'react';

import { useRebuild } from '@/utils/store/useStore';

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
      this.inited = true;
      this.inOpencord = oc.platform !== 'unknown';
      this.initFailed = oc.version === '';
      if (!this.initFailed) {
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

  const getCode = async () => {
    let code: string | undefined;
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
    if (!opencordHelper.inited) {
      opencordHelper.init();
      rebuild();
    }
    getCode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    currentUser,
    isInited: opencordHelper.inited,
    isInitFailed: opencordHelper.initFailed,
    isInOpencord: opencordHelper.inOpencord,
  };
};
