import { useEffect } from 'react';

import { isDev, isFunction } from '@/utils/core/is';

const useMount = (fn: () => void) => {
  if (isDev()) {
    if (!isFunction(fn)) {
      console.error(
        `useMount: parameter \`fn\` expected to be a function, but got "${typeof fn}".`,
      );
    }
  }

  useEffect(() => {
    fn?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useMount;
