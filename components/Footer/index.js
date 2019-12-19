import Link from 'next/link';
import classnames from 'classnames';

const { SITE_NAME } = require('../../config');

import MaxWidth from '../MaxWidth';

import './index.css';
import './table.css';

const SOCIAL_IMAGES = {
	Facebook: {
		src: require('../../static/social/facebook.png'),
		srcSet: require('../../static/social/facebook.svg')
	},
	Instagram: {
		src: require('../../static/social/instagram.png'),
		srcSet: require('../../static/social/instagram.svg')
	},
	Twitter: {
		src: require('../../static/social/twitter.png'),
		srcSet: require('../../static/social/twitter.svg')
	},
	Linkedin: {
		src: require('../../static/social/linkedin.png'),
		srcSet: require('../../static/social/linkedin.svg')
	},
	Youtube: {
		src: require('../../static/social/youtube.png'),
		srcSet: require('../../static/social/youtube.svg')
	}
};

/** TODO: Save last legal line into config */

const Footer = () => (
	<footer className="footer">

		<div className="footer__legal">
			<MaxWidth>
				<div className="footer__legal__wrap">
					<ul>
						<li>
							<h3>Nous contacter</h3>
							<p>Téléphone: +61(0) 383 766 284</p>
							<p>E-mail: machin@lorem.com</p>
						</li>
						<li>
							<h3>Nous trouver</h3>
							<p>HETIC</p>
							<p>27 Bis rue du progrès</p>
							<p>France, Montreuil,  93100</p>
						</li>
						<li>
							<h3>Accès rapide</h3>
							<Link href="/agenda" passHref>
								<a>Agenda</a>
							</Link>
							<Link href="/ressources" passHref>
								<a>Ressources</a>
							</Link>
							<Link href="/about" passHref>
								<a>Qui sommes-nous</a>
							</Link>
						</li>
						<li>
							<h3>Réseaux sociaux</h3>
							<Link href="/" passHref>
								<a>Facebook</a>
							</Link>
							<Link href="/" passHref>
								<a>Instagram</a>
							</Link>
							<Link href="/" passHref>
								<a>Linkedin</a>
							</Link>
						</li>
						{/* <li>
              <Link href="/conditions-generales-de-vente" passHref>
                <a>CGV</a>
              </Link>
            </li> */}
					</ul>

					<div className="footer__legal__copyright">
						© {SITE_NAME} 1996 - 2019
						<hr />
						Tous droits réservés.
					</div>
				</div>
			</MaxWidth>
		</div>
	</footer>
);

export default Footer;
