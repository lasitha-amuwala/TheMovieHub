// import App from 'next/app'
import { useState, useEffect } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { HydrationBoundary, QueryClientProvider } from '@tanstack/react-query';
import { customQueryClient } from '../src/http-client/queryClient';
import NProgress from 'nprogress';
import Router from 'next/router';
import '../styles/globals.css';
import 'nprogress/nprogress.css';
import Layout from '../components/Layout';
// import { Analytics } from '@vercel/analytics/react';
import { ScrollContext } from '../components/ScrollContext';

// Configure NProgress bar
NProgress.configure({ showSpinner: false });
Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => customQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        <ScrollContext>
          <Layout>
            <Component {...pageProps} />
            {/* <Analytics /> */}
          </Layout>
        </ScrollContext>
      </HydrationBoundary>
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
