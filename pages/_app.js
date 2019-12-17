import App, { Container } from 'next/app';
import FontFaceObserver from 'fontfaceobserver';
import Head from 'next/head';
import React from 'react';
import Router from 'next/router';

import 'focus-visible';

import Footer from '../components/Footer';
import Header from '../components/Header';
import Progress from '../components/Progress';

import '../node_modules/modern-normalize/modern-normalize.css';
import '../style/index.css';

const { CSS_VARIABLES } = require('../config');

let updateOverflowColor;

if (process.browser) {
	updateOverflowColor = require('overflow-color');

	Router.events.on('routeChangeComplete', updateOverflowColor);

	document.getElementsByTagName('body')[0].setAttribute('data-oc', `${CSS_VARIABLES.header},${CSS_VARIABLES.footer}`);

	document.getElementsByTagName('body')[0].classList.add('js-loaded');

	updateOverflowColor();
}

class MyApp extends App {
	static async getInitialProps({ Component, ctx }) {
		let pageProps = {};

		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx);
		}

		return { pageProps };
	}

	componentDidMount() {
		const moderat = new FontFaceObserver('Moderat');

		moderat.load().then(() => {
			document.documentElement.classList.add('wf-active');
		});

		/**s
     * Update overflow color on React app hydratation.
     */
		if (updateOverflowColor) {
			setTimeout(updateOverflowColor, 150);
			setTimeout(updateOverflowColor, 200);
			setTimeout(updateOverflowColor, 400);
			setTimeout(updateOverflowColor, 1000);
		}
	}

	render() {
		const { Component, pageProps } = this.props;
		return (
			<Container>
				<Head>
					<link
						rel="preload"
						href="/static/font/moderat-regular.otf"
						as="font"
						type="font/otf"
						crossOrigin="anonymous"
					/>
					<link
						rel="preload"
						href="/static/font/moderat-medium.otf"
						as="font"
						type="font/otf"
						crossOrigin="anonymous"
					/>
					<link
						rel="preload"
						href="/static/font/moderat-bold.otf"
						as="font"
						type="font/otf"
						crossOrigin="anonymous"
					/>
				</Head>

				<Progress />

				<Header />

				<Component {...pageProps} />

				<Footer />
			</Container>
		);
	}
}

export default MyApp;
