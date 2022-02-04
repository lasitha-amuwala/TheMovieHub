import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps };
	}

	render() {
		return (
			<Html>
				<Head />
				<title>MovieHub</title>
				<body className='bg-almostBlack'>
					<div id='root'>
						<Main />
						<NextScript />
					</div>
				</body>
			</Html>
		);
	}
}

export default MyDocument;
