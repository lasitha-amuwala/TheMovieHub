// import App from 'next/app'
import '../styles/globals.css';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { MobileNav } from '../components/MobileNav';

function MyApp({ Component, pageProps }) {
	return (
		<>
			<div className='mt-16'>
				<Navbar />
				<Component {...pageProps} />
				<MobileNav />
				<Footer />
			</div>
		</>
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
