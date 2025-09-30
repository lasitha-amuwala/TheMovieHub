import QueryProvider from '@/components/providers/QueryProvider';

export const Providers = ({ children }) => (
  <>
    <QueryProvider>{children}</QueryProvider>
  </>
);
