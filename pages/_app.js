// import App from 'next/app'
import { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { MobileNav } from '../components/MobileNav';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Hydrate, QueryClientProvider } from 'react-query';
import { customQueryClient } from '../src/http-client/queryClient';
import NProgress from 'nprogress';
import Router from 'next/router';
import '../styles/globals.css';
import 'nprogress/nprogress.css';
import Layout from '../components/layout';

// Configure NProgress bar
NProgress.configure({ showSpinner: false });
Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => customQueryClient());

  // Temperarily stop animations on window resize for better performance
  useEffect(() => {
    addEventListener('resize', handleResize);
    return () => removeEventListener('resize', handleResize);
  }, []);

  let resizeTimer;
  const handleResize = () => {
    document.body.classList.add('resize-animation-stopper');
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      document.body.classList.remove('resize-animation-stopper');
    }, 100);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <div className='mt-14 mb-14 text-white lg:mt-16 lg:mb-0'>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </div>
      </Hydrate>
      <ReactQueryDevtools initialIsOpen={false} />
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
