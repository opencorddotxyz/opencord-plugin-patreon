import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import { getAuthToken, logout, setAuthToken } from '@/utils/auth';

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
      logout();
    }
    const refreshedToken = response.headers['authorization'];
    if (refreshedToken) {
      setAuthToken(refreshedToken);
    }

    return response;
  };
};
