import { NextPage } from 'next';
import { useMemo, useState } from 'react';

import { Text } from '@/components/core/Text';
import { InfoFrame } from '@/components/not-in-oc';
import useMount from '@/hooks/core/useMount';
import { useRouterQuery } from '@/hooks/useRouterQuery';
import { setAuthTokens } from '@/net/http/interceptors/token';
import { validateOAuth2Token } from '@/net/http/patreon';
import { placeholders } from '@/utils/assets';
import { delay } from '@/utils/core/base';

const OAuthPage: NextPage = () => {
  const [loading, setLoading] = useState(true);

  const { title, content, bannerImg } = useMemo(() => {
    const _title = loading ? 'Validating...' : 'Connected';
    const _content = loading
      ? 'We are validating your request, please wait a moment get result.'
      : 'You can now close this window and return to Opencord to continue.';
    const _bannerImg = loading
      ? placeholders('error.svg')
      : placeholders('ok.svg');

    return { title: _title, content: _content, bannerImg: _bannerImg };
  }, [loading]);

  const { code, state } = useRouterQuery(['code', 'state']);

  useMount(async () => {
    setLoading(true);
    try {
      await delay(200);
      console.log('!!! oauth change ', `${code} | ${state}`);
      if (code && state) {
        setAuthTokens({ accessToken: state });

        await validateOAuth2Token({ code });
      }
    } catch (error) {
      //
    } finally {
      setLoading(false);
    }
  });

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
