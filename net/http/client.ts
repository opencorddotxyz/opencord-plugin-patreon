import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

import { showToast } from '@/components/Dialogs/Toast';
import { error, info } from '@/utils/core/log';

import { applyAuthTokenInterceptor } from './interceptors/token';

type Param = {
  [k: string]: any;
};

type BusinessInfo = {
  code: number;
  message: string;
  title: string;
  ok: string;
};

export type ComposedResponse<T> = AxiosResponse<T> & BusinessInfo;

const supportMethods = [
  'get',
  'head',
  'options',
  'delete',
  'post',
  'put',
  'patch',
];

type ClientFuncWithPathParam = <T = any, R = ComposedResponse<T>>(
  url: string,
  pathParam?: Param,
  param?: Param,
) => Promise<R>;

type Client = {
  get: ClientFuncWithPathParam;
  head: ClientFuncWithPathParam;
  options: ClientFuncWithPathParam;
  delete: ClientFuncWithPathParam;
  post: ClientFuncWithPathParam;
  put: ClientFuncWithPathParam;
  patch: ClientFuncWithPathParam;
};

const instance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

applyAuthTokenInterceptor(instance);

function replacePathParams(path: string, param: Param) {
  const restParam = { ...param };
  let parsedPath = path;

  Object.entries(param).forEach(([k, v]) => {
    if (parsedPath?.includes(`:${k}`)) {
      Reflect.deleteProperty(restParam, k);
    }
    parsedPath = parsedPath.replace(`:${k}`, encodeURIComponent(v));
  });

  return {
    parsedPath,
    restParam,
  };
}

function dealWithBusinessErrorInfo(errorCode: number, errorMessage: string) {
  if ([2000, 6001, 6002, 6003].includes(errorCode)) {
    showToast(errorMessage);
  }

  switch (errorCode) {
    case 6001: {
      if (location.pathname !== '/wallet-required') {
        location.replace('/wallet-required');
      }
      break;
    }
    case 6002: {
      if (location.pathname !== '/stark-required') {
        location.replace('/stark-required');
      }
      break;
    }

    default:
      break;
  }
}

async function withTransformData<T = any>(
  url: string,
  pathParam?: Param,
  param?: Param,
  method = 'get',
): Promise<ComposedResponse<T>> {
  const { parsedPath, restParam } = replacePathParams(url, pathParam || {});

  let response = {} as ComposedResponse<T>;
  info('patreon http <=', {
    url,
    param: JSON.stringify({
      pathParam,
      param,
    }),
  });

  try {
    if (method === 'delete') {
      response = await instance[method](parsedPath, {
        data: { ...restParam, ...param },
      });
    } else {
      if (
        ['get', 'head', 'options'].findIndex((v) => {
          return v === method;
        }) !== -1
      ) {
        response = await instance[method](parsedPath, {
          params: { ...restParam, ...(param || {}) },
        });
      } else {
        response = await instance[method](parsedPath, {
          ...restParam,
          ...(param || {}),
        });
      }
    }
  } catch (err) {
    const errResponse = (err as AxiosError).response;

    if (errResponse?.data) {
      // deal with logic that with a none 2XX http status but with code
      const { code, message } = errResponse.data as BusinessInfo;
      response.code = code;
      response.message = message;
      dealWithBusinessErrorInfo(code, message);
    } else {
      // deal with logic with node success status, and without code,
      // maybe show alert info later
      error('patreon http error =>', {
        url,
        err,
      });
      throw err;
    }

    error('patreon http error =>', {
      url,
      err,
      errResponse,
    });
    throw err;
  }

  info('patreon http =>', {
    url,
    response: JSON.stringify(response),
  });

  return response;
}

const client = {} as Client;

supportMethods.forEach((method) => {
  client[method] = (url: string, pathParam: Param, bodyParam: Param) => {
    return withTransformData(url, pathParam, bodyParam, method);
  };
});

export default client;
