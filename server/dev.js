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

const mailjet = require('node-mailjet').connect(
	process.env.MAILJET_API_KEY_PUBLIC,
	process.env.MAILJET_API_KEY_PRIVATE
);

const app = next({
	dev: process.env.NODE_ENV === 'development',
	dir: path.resolve(__dirname, '..')
});
const handler = app.getRequestHandler();

let isHttpsListening = false;

app
	.prepare()
	.then(() => {
		const server = express();

		server.enable('trust proxy');

		// Init middleware
		server.use(express.json({ extended: false }));

		server.post('/api/sendmail', (req, res) => {
			const { email, name, event } = req.body;

			const request = mailjet.post('send', { version: 'v3.1' }).request({
				Messages: [
					{
						From: {
							Email: 'narty.dev@gmail.com',
							Name: 'Maroad'
						},
						To: [
							{
								Email: `${email}`,
								Name: 'You'
							}
						],
						Subject: 'Vous êtes inscrits à une maraude!',
						TextPart: `${event.acf.title}`,
						HTMLPart: `<h3>Bonjour ${name}!</h3><br />Vous êtes désormais inscrit à la maraude suivante : <br/> Adresse: ${event
							.acf.start_place} <br/> Date: ${event.acf.date}<br/> Contact de l'événement: ${event.acf
							.contact} <br/><br/> Si vous souhaitez vous désinscrire contactez nous via le formulaire de contact !`
					}
				]
			});
			request
				.then((result) => {
					res.json(result.body);
					console.log(req.body);
				})
				.catch((err) => {
					console.log(err.statusCode);
					res.status(500).send('Server error');
				});
		});

		server.get('/blog/:id', (req, res) => {
			app.render(req, res, '/blog/[id]', { id: req.params.id });
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
	})
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
