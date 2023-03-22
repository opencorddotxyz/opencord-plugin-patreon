import { useState } from 'react';

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
      setConnecting(true);
      window.open(getPatreonAuthUrl());
      // todo connect patreon
    }
    setConnecting(false);
  };
  return { connecting, connectPatreon };
};
