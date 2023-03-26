import { getAuthToken } from './auth';

const scopes = [
  'identity',
  'identity.memberships',
  'campaigns',
  'campaigns.members',
];

const formatURL = ({ protocol, host, pathname, query }) => {
  const searchParams = new URLSearchParams(query);

  return `${protocol}://${host}${pathname}?${searchParams.toString()}`;
};

export function getPatreonAuthUrl() {
  return formatURL({
    protocol: 'https',
    host: 'patreon.com',
    pathname: '/oauth2/authorize',
    query: {
      response_type: 'code',
      client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
      redirect_uri: `${process.env.NEXT_PUBLIC_APP_URI}/oauth`,
      scope: scopes.join(' '),
      state: getAuthToken(),
    },
  });
}
