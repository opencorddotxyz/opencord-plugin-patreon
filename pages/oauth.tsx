import { NextPage } from 'next';
import { useEffect, useMemo, useState } from 'react';

import { Text } from '@/components/core/Text';
import { InfoFrame } from '@/components/not-in-oc';
import { useRouterQuery } from '@/hooks/useRouterQuery';
import { setAuthTokens } from '@/net/http/interceptors/token';
import { validateOAuth2Token } from '@/net/http/patreon';
import { placeholders } from '@/utils/assets';

const OAuthPage: NextPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { title, content, bannerImg } = useMemo(() => {
    const _title = error ? 'error' : loading ? 'Validating...' : 'Connected';
    const _content = error
      ? 'Something went wrong '
      : loading
      ? 'We are validating your request, please wait a moment get result.'
      : 'You can now close this window and return to Opencord to continue.';
    const _bannerImg = error
      ? placeholders('error.svg')
      : loading
      ? placeholders('error.svg')
      : placeholders('ok.svg');

    return { title: _title, content: _content, bannerImg: _bannerImg };
  }, [error, loading]);

  const query = useRouterQuery(['code', 'state']);

  useEffect(() => {
    const { code, state } = query;
    setLoading(true);
    try {
      if (code && state) {
        setAuthTokens({ accessToken: state });

        validateOAuth2Token({ code });
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [query]);

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
