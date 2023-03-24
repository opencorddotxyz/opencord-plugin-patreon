import { useState } from 'react';

import { StateType } from '@/constants/store';
import { openNewTab } from '@/utils/location';
import { getPatreonAuthUrl } from '@/utils/patreon';
import { store } from '@/utils/store/useStore';

export const useConnectPatreon = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [connecting, setConnecting] = useState(false);

  const connectPatreon = async () => {
    if (connecting) {
      return;
    }
    const isConnected = store.get(StateType.PATREON_CONNECTED); // todo check isConnected
    if (isConnected) {
      // todo jump to dashboard page
    } else {
      openNewTab(getPatreonAuthUrl());
    }
  };

  return { connecting, connectPatreon };
};
