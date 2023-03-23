import { useState } from 'react';

import { openNewTab } from '@/utils/location';
import { getPatreonAuthUrl } from '@/utils/patreon';

export const useConnectPatreon = () => {
  const [connecting, setConnecting] = useState(false);

  const connectPatreon = async () => {
    if (connecting) return;
    setConnecting(true);
    const isConnected = false; // todo check isConnected
    if (isConnected) {
      // todo jump to dashboard page
    } else {
      openNewTab(getPatreonAuthUrl());
    }
    setConnecting(false);
  };
  return { connecting, connectPatreon };
};
