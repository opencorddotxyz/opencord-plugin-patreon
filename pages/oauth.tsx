import { NextPage } from 'next';
import { useState } from 'react';

import { Text } from '@/components/core/Text';
import { InfoFrame } from '@/components/InfoFrame';
import { useRouterQuery } from '@/hooks/useRouterQuery';
import { validateOAuth2Token } from '@/net/http/patreon';
import { is2XX } from '@/net/http/utils';
import { placeholders } from '@/utils/assets';
import { setOAuthToken } from '@/utils/auth';
import { useInit } from '@/utils/store/useStore';

const OAuthPage: NextPage = () => {
  const query = useRouterQuery(['code', 'state']);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useInit(async () => {
    const { code, state: token } = query;
    if (!code || !token) {
      setError(true);

      return;
    }
    setLoading(true);
    try {
      setOAuthToken(token);
      const result = await validateOAuth2Token({ code });
      setOAuthToken(undefined);
      if (!is2XX(result)) {
        setError(true);
      }
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [query]);

  const title = error ? 'Oops!' : loading ? 'Connecting...' : 'Connected';
  const content = error
    ? 'Something went wrong, please try again later.'
    : loading
    ? 'Please wait a moment while we establish a connection.'
    : 'You can now close this window and return to Opencord to continue.';
  const bannerImg = error
    ? placeholders('error.svg')
    : loading
    ? placeholders('error.svg')
    : placeholders('ok.svg');

  return (
    <InfoFrame title={title} bannerImg={bannerImg}>
      <Text
        fontSize={'16px'}
        lineHeight="20px"
        fontWeight={'400'}
        color={'rgba(255, 255, 255, 0.6)'}
      >
        {content}
      </Text>
    </InfoFrame>
  );
};

export default OAuthPage;
