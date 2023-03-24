import { useRouter } from 'next/router';

import { getHomepage, GetHomepageResponse, login } from '@/net/http/patreon';
import { is2XX } from '@/net/http/utils';
import { getCurrentAuth, isLoggedIn, login as setLogin } from '@/utils/auth';
import { isNotEqual } from '@/utils/core/diff';
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
  const router = useRouter();
  const { isInited, isInOpencord, isInitFailed, currentUser, getCode } =
    useOpencord();

  const homeStates = useHomeStates();

  const _isLoggedIn = isLoggedIn();

  useInit(async () => {
    if ((!_isLoggedIn && !currentUser) || homeStates || appLogging) {
      return;
    }
    let code = currentUser?.code;
    if (_isLoggedIn) {
      // get home states
      appLogging = true;
      const homeResponse = await getHomepage();
      appLogging = false;
      if (!is2XX(homeResponse)) {
        return;
      }
      const states = homeResponse.data;
      const currentAuth = getCurrentAuth();
      if (
        isNotEqual(currentAuth, {
          userId: states.userId,
          channelId: states.channelId,
        })
      ) {
        // need to relogin
        code = await getCode();
      } else {
        // set current homeStates
        setHomeStates(() => states);

        return;
      }
    }
    if (!code) {
      // get login code failed
      router.replace('/404');

      return;
    }
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
