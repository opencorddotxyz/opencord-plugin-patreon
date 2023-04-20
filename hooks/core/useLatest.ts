import { useRef } from 'react';

import { isEmpty } from '@/utils/core/is';

interface LatestOptions {
  acceptEmpty?: boolean;
}

function useLatest<T>(value: T, options?: LatestOptions) {
  const ref = useRef(value);
  if (options?.acceptEmpty ?? true) {
    ref.current = value;
  } else {
    if (!isEmpty(value)) ref.current = value;
  }

  return ref;
}

export default useLatest;
