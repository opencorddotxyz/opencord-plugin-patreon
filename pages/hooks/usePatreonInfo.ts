import { useAsync } from '@/hooks/useAsync';
import { mockPatreonDatas, PatreonInfo } from '@/utils/mock';

export const usePatreonInfo = () => {
  return useAsync<PatreonInfo>(async () => {
    return mockPatreonDatas;
  });
};
