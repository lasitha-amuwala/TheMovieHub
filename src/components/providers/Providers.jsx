import QueryProvider from '@/components/providers/QueryProvider';
import { ScrollContext } from '@/components/ScrollContext';

export const Providers = ({ children }) => (
  <>
    <QueryProvider>
      <ScrollContext>{children}</ScrollContext>
    </QueryProvider>
  </>
);
