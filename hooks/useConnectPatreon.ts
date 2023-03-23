import { useState } from 'react';

import { StateType } from '@/constants/store';
import { getPatreonAuthUrl } from '@/utils/patreon';
import { store } from '@/utils/store/useStore';

export const useConnectPatreon = () => {
  const [connecting, setConnecting] = useState(false);

  const connectPatreon = async () => {
    if (connecting) {
      return;
    }
    const isConnected = store.get(StateType.PATREON_CONNECTED); // todo check isConnected
    if (isConnected) {
      // todo jump to dashboard page
    } else {
      setConnecting(true);
      window.open(getPatreonAuthUrl());
      // todo connect patreon
    }
  };
  return { connecting, connectPatreon };
};
