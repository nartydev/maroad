import App from 'next/app';
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

	render() {
		const { Component, pageProps } = this.props;
		return (
			<>
				<Head>
					<link
						href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
						rel="stylesheet"
					/>
					<link
						href="https://fonts.googleapis.com/css?family=Josefin+Sans:300,400,600,700&display=swap"
						rel="stylesheet"
					/>
				</Head>

				<Progress />

				<Header />

				<Component {...pageProps} />

				<Footer />
			</>
		);
	}
}

export default MyApp;
