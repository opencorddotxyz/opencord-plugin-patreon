import { format } from 'url';

const scopes = [
  'identity',
  'identity.memberships',
  'campaigns',
  'campaigns.members',
];

export function getPatreonAuthUrl() {
  return format({
    protocol: 'https',
    host: 'patreon.com',
    pathname: '/oauth2/authorize',
    query: {
      response_type: 'code',
      client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
      redirect_uri: `${process.env.NEXT_PUBLIC_APP_URI}/oauth`,
      scope: scopes.join(' '),
      state: 'chill',
    },
  });
}
