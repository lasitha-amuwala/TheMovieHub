// import App from 'next/app'
import { useEffect, useState } from 'react';
import Router from 'next/router';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { MobileNav } from '../components/MobileNav';
import { Spinner } from '../components/Spinner';
import NProgress from 'nprogress';
import '../styles/globals.css';
import 'nprogress/nprogress.css';
import { Hydrate, QueryClientProvider, QueryClient } from 'react-query';

NProgress.configure({ showSpinner: false });
Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000,
          },
        },
      })
  );
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        {loading ? (
          <div className='flex h-screen items-center justify-center'>
            <Spinner />
          </div>
        ) : (
          <div className='mt-14 mb-14 lg:mt-16 lg:mb-0'>
            <Navbar />
            <Component {...pageProps} />
            <Footer />
            <MobileNav />
          </div>
        )}
      </Hydrate>
    </QueryClientProvider>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp;
