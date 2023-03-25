import { useRouter } from 'next/router';

export const useRouterSafe = () => {
  const router = useRouter();

  return {
    originRouter: router,
    push(path: string) {
      if (path !== router.pathname) {
        router.push(path);
      }
    },
    replace(path: string) {
      if (path !== router.pathname) {
        router.replace(path);
      }
    },
  };
};
