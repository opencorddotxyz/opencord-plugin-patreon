import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { StateType } from '@/constants/store';
import { useStore } from '@/utils/store/useStore';

const IndexPage: NextPage = () => {
  const router = useRouter();
  const [manageable] = useStore(StateType.MANAGEABLE);

  useEffect(() => {
    if (!manageable) {
      return;
    }

    console.log('will change router', manageable);
    if (manageable) {
      router.push({
        pathname: 'creator',
      });
    } else {
      router.push({
        pathname: 'patron',
      });
    }
  }, [manageable, router]);

  return <div>manageable not available</div>;
};

export default IndexPage;
