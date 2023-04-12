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
    isMobile && openNewTab(oauthURL);

    setConnecting(true);
    try {
      const states = await refreshHomeStates();
      const isConnected = states?.connected;
      if (!isConnected) {
        openNewTab(oauthURL);
      }
    } catch (error) {
      //
    } finally {
      setConnecting(false);
    }
  };

  return { connecting, connectPatreon };
};
