import { getClient } from '@opencord/client';

const opencordSDK = getClient({
  debug: process.env.NODE_ENV === 'development',
});

export default opencordSDK;
