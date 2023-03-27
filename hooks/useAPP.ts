import { useState } from 'react';

import { getHomepage, GetHomepageResponse, login } from '@/net/http/patreon';
import { is2XX } from '@/net/http/utils';
import { isLoggedIn, login as setLogin } from '@/utils/auth';
import { deepClone } from '@/utils/core/clone';
import { store, useInit, useStore } from '@/utils/store/useStore';

import { useOpencord } from './useOpencord';

const kHomeStatesKey = 'kHomeStatesKey';

export const getHomeStates = () => {
  return deepClone(store.get<GetHomepageResponse>(kHomeStatesKey));
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

export const useHomeStates = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [homeStates] = useStore<GetHomepageResponse>(kHomeStatesKey);

  const refreshHomeStates = async () => {
    if (appLogging) {
      return;
    }
    if (isLoggedIn()) {
      // get home states
      appLogging = true;
      setRefreshing(true);
      const homeResponse = await getHomepage().catch(() => undefined);
      setRefreshing(false);
      appLogging = false;
      if (!is2XX(homeResponse)) {
        return;
      }
      const states = homeResponse!.data;
      setHomeStates(() => states);

      return states;
    }
  };

  return { homeStates, refreshHomeStates, refreshing };
};

let appLogging = false;
export const useAPP = () => {
  const { isInited, isInOpencord, isInitFailed, currentUser } = useOpencord();

  const { homeStates, refreshHomeStates, refreshing } = useHomeStates();

  const _isLoggedIn = isLoggedIn();

  useInit(async () => {
    if (!currentUser || homeStates || appLogging) {
      return;
    }
    const code = currentUser?.code;
    // auto login
    appLogging = true;
    const loginResponse = await login({ code }).catch(() => undefined);
    appLogging = false;
    if (!is2XX(loginResponse)) {
      return;
    }
    const { data } = loginResponse!;
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
    refreshHomeStates,
    refreshing,
  };
};
