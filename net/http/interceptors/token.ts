import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import { STORAGE_KEY_AUTH_TOKEN } from '@/constants/storage-key';
import { getLocal, removeLocal, setLocal } from '@/utils/store';

type Token = string;
export interface IAuthTokens {
  accessToken: Token;
}

export const isLoggedIn = (): boolean => {
  const token = getAccessToken();

  return !!token;
};

export const setAuthTokens = (tokens: IAuthTokens): void => {
  return setLocal(STORAGE_KEY_AUTH_TOKEN, tokens);
};

export const setAccessToken = (token: Token): void => {
  const tokens = getAuthTokens();

  if (!tokens) {
    throw new Error(
      'Unable to update access token since there are not tokens currently stored',
    );
  }

  tokens.accessToken = token;
  setAuthTokens(tokens);
};

export const clearAuthTokens = (): void => {
  return removeLocal(STORAGE_KEY_AUTH_TOKEN);
};

export const getAccessToken = (): Token | undefined => {
  const tokens = getAuthTokens();

  return tokens ? tokens.accessToken : undefined;
};

const getAuthTokens = (): IAuthTokens | undefined => {
  if (typeof window === 'undefined') {
    return;
  }

  let rawTokens: IAuthTokens | undefined;

  try {
    rawTokens = getLocal(STORAGE_KEY_AUTH_TOKEN);

    return rawTokens;
  } catch (error: unknown) {
    if (error instanceof SyntaxError) {
      error.message = `Failed to parse auth tokens: ${rawTokens}`;
      throw error;
    }
  }
};

export const applyAuthTokenInterceptor = (axios: AxiosInstance): void => {
  if (!axios.interceptors) {
    throw new Error(`invalid axios instance: ${axios}`);
  }

  axios.interceptors.request.use(authTokenRequestInterceptor({}));
  axios.interceptors.response.use(authTokenResponseInterceptor());
};

export const useAuthTokenInterceptor = applyAuthTokenInterceptor;

export const authTokenRequestInterceptor = ({
  header = 'Authorization',
  headerPrefix = 'Bearer ',
}) => {
  return async (
    requestConfig: AxiosRequestConfig,
  ): Promise<AxiosRequestConfig> => {
    const accessToken = getAccessToken();

    // add token to headers
    if (accessToken && requestConfig.headers) {
      requestConfig.headers[header] = `${headerPrefix}${accessToken}`;
    }

    return requestConfig;
  };
};

export const authTokenResponseInterceptor = () => {
  return async (response: AxiosResponse): Promise<AxiosResponse> => {
    const refreshedToken = response.headers['authorization'];
    if (refreshedToken) {
      setAccessToken(refreshedToken);
    }

    return response;
  };
};
