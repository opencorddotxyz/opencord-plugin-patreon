import { useEffect } from 'react';

import { isDev, isFunction } from '@/utils/core/is';

import useLatest from './useLatest';

const useUnmount = (fn: () => void) => {
  if (isDev()) {
    if (!isFunction(fn)) {
      console.error(
        `useUnmount expected parameter is a function, got ${typeof fn}`,
      );
    }
  }

  const fnRef = useLatest(fn);

  useEffect(
    () => () => {
      fnRef.current();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
};

export default useUnmount;
