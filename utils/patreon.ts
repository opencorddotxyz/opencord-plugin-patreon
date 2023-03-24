import { format } from 'url';

import { getAuthToken } from '@/net/http/client';

const scopes = [
  'identity',
  'identity.memberships',
  'campaigns',
  'campaigns.members',
];

export function getPatreonAuthUrl() {
  const token = getAuthToken();

  return format({
    protocol: 'https',
    host: 'patreon.com',
    pathname: '/oauth2/authorize',
    query: {
      response_type: 'code',
      client_id: process.env.CLIENT_ID,
      redirect_uri: `${process.env.APP_URI}/oauth`,
      scope: scopes.join(' '),
      state: token,
    },
  });
}
