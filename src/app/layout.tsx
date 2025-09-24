import '@/styles/globals.css';
import 'nprogress/nprogress.css';
import '@/styles/embla.css';
import { Providers } from '@/components/providers/Providers';
import Layout from '@/components/Layout';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className='root' id='root'>
      <body className='bg-almostBlack text-white'>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
