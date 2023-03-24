import { isNotEmpty } from './core/is';
import { storage } from './core/storage';

interface UserAuthInfo {
  userId: string;
  channelId: string;
}

const kCurrentAuthKey = 'currentAuth';

export const isLoggedIn = (): boolean => {
  return isNotEmpty(getCurrentAuth() && getAuthToken());
};

export const logout = () => {
  setAuthToken(undefined);
  setCurrentAuth(undefined);
};

export const login = (
  props: UserAuthInfo & {
    token: string;
  },
) => {
  setCurrentAuth({
    userId: props.userId,
    channelId: props.channelId,
  });
  setAuthToken(props.token);
};

export const setCurrentAuth = (auth?: UserAuthInfo) => {
  storage.set(kCurrentAuthKey, auth);
};

export const getCurrentAuth = (): UserAuthInfo | undefined => {
  return storage.get(kCurrentAuthKey);
};

export const getAuthKey = () => {
  const e = getCurrentAuth();

  return `${e?.userId ?? 404}-${e?.channelId ?? 404}`;
};

export const getAuthToken = () => {
  return storage.get(getAuthKey());
};

export const setAuthToken = (token?: string): void => {
  storage.set(getAuthKey(), token);
};
