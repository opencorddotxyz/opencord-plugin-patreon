import { ComposedResponse } from './client';

export const is2XX = (res: ComposedResponse<any>) => {
  return [200, 204].includes(res?.status);
};
