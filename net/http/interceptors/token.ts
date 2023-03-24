import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import { STORAGE_KEY_AUTH_TOKEN } from '@/constants/storage-key';
import { isNotEmpty } from '@/utils/core/is';
import { getLocal, removeLocal, setLocal } from '@/utils/store';

type Token = string;

export const getAuthToken = (): Token | undefined => {
  return getLocal(STORAGE_KEY_AUTH_TOKEN);
};

export const setAuthToken = (token: Token): void => {
  return setLocal(STORAGE_KEY_AUTH_TOKEN, token);
};

export const clearAuthToken = (): void => {
  return removeLocal(STORAGE_KEY_AUTH_TOKEN);
};

export const isLoggedIn = (): boolean => {
  return isNotEmpty(getAuthToken());
};

export const applyAuthTokenInterceptor = (axios: AxiosInstance): void => {
  if (!axios.interceptors) {
    throw new Error(`invalid axios instance: ${axios}`);
  }

  axios.interceptors.request.use(authTokenRequestInterceptor({}));
  axios.interceptors.response.use(authTokenResponseInterceptor());
};

const authTokenRequestInterceptor = ({
  header = 'Authorization',
  headerPrefix = 'Bearer ',
}) => {
  return async (
    requestConfig: AxiosRequestConfig,
  ): Promise<AxiosRequestConfig> => {
    const authToken = getAuthToken();
    if (authToken && requestConfig.headers) {
      requestConfig.headers[header] = `${headerPrefix}${authToken}`;
    }
    return requestConfig;
  };
};

const authTokenResponseInterceptor = () => {
  return async (response: AxiosResponse): Promise<AxiosResponse> => {
    if (response.status === 401) {
      // log out
      clearAuthToken();
    }
    const refreshedToken = response.headers['authorization'];
    if (refreshedToken) {
      setAuthToken(refreshedToken);
    }

    return response;
  };
};
