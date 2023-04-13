import { useState } from 'react';

import { openNewTab } from '@/utils/location';
import { getPatreonAuthUrl } from '@/utils/patreon';

import { useBreakpoint } from './core/useBreakpoint';
import { useAPP } from './useAPP';

export const useConnectPatreon = () => {
  const [connecting, setConnecting] = useState(false);
  const { isMobile } = useBreakpoint();
  const { refreshHomeStates } = useAPP();

  const connectPatreon = async () => {
    const oauthURL = getPatreonAuthUrl();
    if (connecting) {
      return;
    }

    if (isMobile) {
      openNewTab(oauthURL);
    }

    setConnecting(true);
    const states = await refreshHomeStates();
    setConnecting(false);
    
    const isConnected = states?.connected;
    if (!isConnected) {
      const oauthURL = getPatreonAuthUrl();
      openNewTab(oauthURL);
    }
  };

  return { connecting, connectPatreon };
};
