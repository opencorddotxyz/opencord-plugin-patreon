import { isNotEmpty } from './core/is';
import { storage } from './core/storage';

interface UserAuthInfo {
  userId: string;
  channelId: string;
}

const kCurrentAuthKey = 'currentAuth';

export const isLoggedIn = (): boolean => {
  return isNotEmpty(getCurrentAuth()) && isNotEmpty(getAuthToken());
};

export const logout = () => {
  setAuthToken(undefined);
  setCurrentAuth(undefined);
};

export const login = (
  props: Partial<UserAuthInfo> & {
    token: string;
  },
) => {
  setCurrentAuth({
    userId: props?.userId ?? '404',
    channelId: props?.channelId ?? '404',
  });
  setAuthToken(props.token);
};

export const getCurrentAuth = () => {
  return storage.get<UserAuthInfo>(kCurrentAuthKey);
};

export const setCurrentAuth = (auth?: UserAuthInfo) => {
  storage.set(kCurrentAuthKey, auth);
};

export const getAuthKey = () => {
  const e = getCurrentAuth();

  return `${e?.userId ?? 404}-${e?.channelId ?? 404}`;
};

export const getAuthToken = () => {
  return storage.get<string>(getAuthKey());
};

export const setAuthToken = (token?: string): void => {
  storage.set(getAuthKey(), token);
};

const kOAuthKey = 'oauthToken';
export const getOAuthToken = () => {
  return storage.get<string>(kOAuthKey);
};

export const setOAuthToken = (token?: string): void => {
  storage.set(kOAuthKey, token);
};
