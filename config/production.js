module.exports = {
	HOST: 'maroad.herokuapp.com',

	/**
   * If all HTTP GET requests
   * should redirect to HTTPS if
   * port 443 is listening.
   */
	FORCE_HTTPS: 1,

	/** SSL Certificates file path. */
	SSL_CERTIFICATE_FILE: null,
	SSL_CERTIFICATE_KEY_FILE: null,

	SITE_NAME: 'Ma Road',

	/** Website external server host name. */
	SERVER_HOST: 'maroad.herokuapp.com',

	/** Notification prefix. */
	NOTIFICATION_PREFIX: '[maroad.fr]',

	/** CSS variables. */
	CSS_VARIABLES: {
		primary: '#EF5D36',
		'light-primary': '#F8FAFF',

		'focus-color': '#2a5cea',

		header: 'white',
		footer: '#EF5D36',

		yellow: '#EBD011',
		'title-yellow': '#EBD011',
		'light-yellow': '#FFF4A4',

		'light-orange': '#F3C977',
		'title-light-orange': '#E5A527',
		'light-light-orange': '#F3C977',

		purple: '#ECD4EC',
		'title-purple': '#c36cc3',
		'light-purple': '#ECD4EC',

		orange: '#F28C00',
		'title-orange': '#E76537',
		'light-orange': '#FFB79D',

		green: '#118337',
		'title-green': '#A8CB23',
		'light-green': '#DCF18B',

		pink: '#FFD2D3',
		'title-pink': '#EA5A5D',
		'light-pink': '#FFD2D3',

		blue: '#4DB8FF',
		'title-blue': '#4DB8FF',
		'light-blue': '#86C4ED',

		width: '1135px',

		'font-sans-serif': "'Moderat', sans-serif",

		_sm: '600px',
		_md: '900px',
		_lg: '1200px',
		_xl: '1800px',
		sm: '(max-width:  600px)',
		md: '(max-width:  900px)',
		lg: '(max-width: 1200px)',
		xl: '(max-width: 1800px)'
	}
};
