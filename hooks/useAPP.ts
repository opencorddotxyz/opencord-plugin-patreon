import { GetHomepageResponse, login } from '@/net/http/patreon';
import { is2XX } from '@/net/http/utils';
import { isLoggedIn, login as setLogin } from '@/utils/auth';
import { store, useInit, useStore } from '@/utils/store/useStore';

import { useOpencord } from './useOpencord';

const kHomeStatesKey = 'kHomeStatesKey';

export const getHomeStates = () => {
  return store.get<GetHomepageResponse>(kHomeStatesKey);
};

export const setHomeStates = (
  callback: (data?: GetHomepageResponse) => Partial<GetHomepageResponse>,
) => {
  const current = getHomeStates();
  store.set(kHomeStatesKey, {
    ...current,
    ...callback(current),
  });
};

export const useHomeStates = (): GetHomepageResponse | undefined => {
  const [_homeStates] = useStore<GetHomepageResponse>(kHomeStatesKey);
  const homeStates = getHomeStates();

  return homeStates;
};

let appLogging = false;
export const useAPP = () => {
  const { isInited, isInOpencord, isInitFailed, currentUser } = useOpencord();

  const homeStates = useHomeStates();

  const _isLoggedIn = isLoggedIn();

  useInit(async () => {
    if (!currentUser || homeStates || appLogging) {
      return;
    }
    const code = currentUser?.code;
    // auto login
    appLogging = true;
    const loginResponse = await login({ code });
    appLogging = false;
    if (!is2XX(loginResponse)) {
      return;
    }
    const { data } = loginResponse;
    const { token, ...homeData } = data;
    setHomeStates(() => homeData);
    setLogin({
      token,
      userId: homeData.userId,
      channelId: homeData.channelId,
    });
  }, [isInited, currentUser, _isLoggedIn]);

  return {
    isInited,
    isInitFailed,
    isInOpencord,
    homeStates,
  };
};
