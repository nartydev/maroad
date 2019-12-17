require('dotenv-extended').load();

const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');
const express = require('express');
const next = require('next');
const { red, yellow } = require('kleur');
const { NotificationType } = require('system-notifier');

const notify = require('./helpers/notify');

const { FORCE_HTTPS, SSL_CERTIFICATE_FILE, SSL_CERTIFICATE_KEY_FILE } = require('../config');

// savePrismicData().then(() => {});

const app = next({
	dev: true,
	dir: path.resolve(__dirname, '..')
});
const handler = app.getRequestHandler();

let isHttpsListening = false;

app
	.prepare()
	.then(() => {
		const server = express();

		server.enable('trust proxy');

		/** Force HTTPS middleware. */
		server.get('*', (req, res, next) => {
			if (
				!(req.secure || req.headers['x-forwarded-proto'] === 'https') &&
				FORCE_HTTPS &&
				(isHttpsListening || process.env.HEROKU === '1')
			) {
				res.redirect(`https://${req.headers.host}${req.url}`);
			} else {
				next();
			}
		});

		server.get('*', (req, res) => handler(req, res));

		/** Serving HTTP Application. */
		http.createServer(server).listen(process.env.PORT, (error) => {
			if (!error) {
				console.log(`HTTP listening on port ${process.env.PORT}.`);
			} else {
				const message = `Error while trying to listen on port ${process.env.PORT}.`;
				console.error(red(message));
				notify(message, NotificationType.Error);
			}
		});

		/** Serving HTTPS Application if certificate found. */
		if (process.env.HEROKU !== '1') {
			if (fs.existsSync(SSL_CERTIFICATE_FILE) && fs.existsSync(SSL_CERTIFICATE_KEY_FILE)) {
				const cert = fs.readFileSync(SSL_CERTIFICATE_FILE, 'utf8');
				const key = fs.readFileSync(SSL_CERTIFICATE_KEY_FILE, 'utf8');

				https.createServer({ cert, key }, server).listen(443, (error) => {
					if (!error) {
						isHttpsListening = true;
						console.log('HTTPS listening on port 443.');
					} else {
						const message = 'Error while trying to listen on port 443.';
						console.error(red(message));
						notify(message, NotificationType.Error);
					}
				});
			} else {
				const message = 'No SSL certificate found, see documentation.';
				console.error(yellow(message));
				notify(message, NotificationType.Warning);
			}
		}
	})
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
