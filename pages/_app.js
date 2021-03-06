// import App from 'next/app'
import { useState, useEffect } from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Hydrate, QueryClientProvider } from 'react-query';
import { customQueryClient } from '../src/http-client/queryClient';
import NProgress from 'nprogress';
import Router from 'next/router';
import '../styles/globals.css';
import 'nprogress/nprogress.css';
import Layout from '../components/Layout';

// Configure NProgress bar
NProgress.configure({ showSpinner: false });
Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => customQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
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
