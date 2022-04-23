import { useRouter as nextRouter } from 'next/router';

const useRouter = () => {
  const router = nextRouter();
  return { asRoute: router.asPath.split('?')[0], ...router };
};
export default useRouter;
