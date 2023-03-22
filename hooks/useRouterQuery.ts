import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';

import { isArray, isString } from '@/utils/core/is';

type Params = string[];

type ReturnObject<P extends Params> = {
  [K in P[number]]: any;
};

export const getRouterFirstQuery = (
  query: ParsedUrlQuery,
): Record<string, string> => {
  const result = {};

  Object.keys(query).map((val) => {
    const _value = query[val];

    if (isString(_value)) {
      result[val] = _value;
    }
    if (isArray(_value)) {
      result[val] = _value.length > 0 ? _value[0] : '';
    }
  });

  return result;
};

export const useRouterQuery = <P extends Params>(req: P): ReturnObject<P> => {
  const router = useRouter();
  const allQuery = getRouterFirstQuery(router.query);

  const result = {} as ReturnObject<P>;

  req.map((val) => {
    result[val] = allQuery[val] ?? '';
  });

  return result;
};
