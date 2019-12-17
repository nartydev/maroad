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
		<div className="footer__wrap">
			<MaxWidth>
				<div className="footer__content">
					<ul className="footer__table" />
				</div>
			</MaxWidth>
		</div>

		<div className="footer__legal">
			<MaxWidth>
				<div className="footer__legal__wrap">
					<div className="footer__legal__logo">
						<Link prefetch href="/" passHref>
							<a aria-label={`Page d'accueil de ${SITE_NAME}`}>
								<img
									src={require('../../static/logo-wave-white.png')}
									srcSet={require('../../static/logo-wave-white.svg')}
									title={SITE_NAME}
									alt={`Logo ${SITE_NAME}`}
								/>
							</a>
						</Link>
					</div>

					<ul>
						<li>
							<Link href="/mentions-legales" passHref>
								<a>Mentions légales</a>
							</Link>
						</li>
						<li>
							<Link href="/politique-de-confidentialite" passHref>
								<a>Confidentialité</a>
							</Link>
						</li>
						<li>
							<Link href="/politique-echange-remboursement" passHref>
								<a>Politique d'échange et de remboursement</a>
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
