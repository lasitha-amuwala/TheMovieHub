import { useRouter as nextRouter } from 'next/router';

export const useRouter = () => {
  const router = nextRouter();
  return { asRoute: router.asPath.split('?')[0], ...router };
};
