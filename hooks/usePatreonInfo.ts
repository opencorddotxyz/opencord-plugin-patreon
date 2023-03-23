import { useAsync } from '@/hooks/core/useAsync';
import { mockPatreonDataSets, PatreonInfo } from '@/net/http/mock';
import { delay } from '@/utils/core/base';

export const usePatreonInfo = () => {
  return useAsync<PatreonInfo>(async () => {
    await delay(200);
    return mockPatreonDataSets;
  });
};
