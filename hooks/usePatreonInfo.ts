import { useAsync } from '@/hooks/core/useAsync';
import { mockPatreonDatas, PatreonInfo } from '@/utils/mock';

export const usePatreonInfo = () => {
  return useAsync<PatreonInfo>(async () => {
    return mockPatreonDatas;
  });
};
