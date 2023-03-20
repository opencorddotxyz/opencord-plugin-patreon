import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

import { error, info } from '@/utils/log';

type Param = {
  [k: string]: any;
};

const supportMethods = [
  'get',
  'head',
  'options',
  'delete',
  'post',
  'put',
  'patch',
];

type ClientFuncWithPathParam = <T = any, R = AxiosResponse<T>>(
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
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

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

async function withTransformData<T = any>(
  url: string,
  pathParam?: Param,
  param?: Param,
  method = 'get',
): Promise<AxiosResponse<T>> {
  const { parsedPath, restParam } = replacePathParams(url, pathParam || {});

  let response = {} as AxiosResponse<T>;
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
