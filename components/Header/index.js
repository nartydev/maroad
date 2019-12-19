import { useRef, useState, useEffect, useCallback } from 'react';
import classnames from 'classnames';
import { withRouter } from 'next/router';
import Link from 'next/link';

const { SITE_NAME } = require('../../config');

import Button from '../Button';
import MaxWidth from '../MaxWidth';
import Menu from '../Menu';

import './index.css';
import './logo.css';
import './nav.css';
import './menu.css';

const Header = ({ router }) => {
	const menuRef = useRef(null);

	const [ closing, setClosing ] = useState(false);
	const [ open, setOpen ] = useState(false);
	let openRef = useRef(false);

	let toggleMenuTimeout = useRef(null);

	const closeMenu = () => {
		setClosing(true);
		toggleMenuTimeout.current = setTimeout(() => {
			setOpen(false);
			openRef.current = false;
		}, 510);
	};

	const toggleMenu = () => {
		if (toggleMenuTimeout.current) {
			clearTimeout(toggleMenuTimeout.current);
		}

		if (!open) {
			setClosing(false);
			setOpen(true);
			openRef.current = true;
		} else {
			closeMenu();
		}
	};

	/**
   * Close Menu on mouse down outside when open.
   */
	const handleDocumentMouseDown = (event) => {
		if (openRef.current && menuRef.current && !menuRef.current.contains(event.target)) {
			closeMenu();
		}
	};
	useEffect(() => {
		document.addEventListener('mousedown', handleDocumentMouseDown);
		document.addEventListener('touchstart', handleDocumentMouseDown);
		return () => {
			document.removeEventListener('mousedown', handleDocumentMouseDown);
			document.removeEventListener('touchstart', handleDocumentMouseDown);
		};
	}, []);

	const [ headerLogoClassName, setHeaderLogoClassName ] = useState('header__logo');

	return (
		<header className="header">
			<MaxWidth>
				<div className="header__wrap">
					<div className={headerLogoClassName}>
						<Link prefetch href="/" passHref>
							<a className="header__logo__link" aria-label={`Page d'accueil de ${SITE_NAME}`}>
								<img
									className="header__logo__img header__logo__img--icon"
									src={require('../../static/logo-icon.png')}
									srcSet={require('../../static/logo-icon.svg')}
									title={`Logo ${SITE_NAME}`}
									alt={`Logo icône de ${SITE_NAME}`}
								/>
							</a>
						</Link>
					</div>

					<nav className="header__nav">
						<ul>
							<li>
								<Link href="/">
									<a>Accueil</a>
								</Link>
							</li>
							<li>
								<Link href="/agenda">
									<a>Agenda</a>
								</Link>
							</li>
							<li>
								<Link href="/blog">
									<a>Blog</a>
								</Link>
							</li>
							<li>
								<Link href="/about">
									<a>Qui sommes-nous ?</a>
								</Link>
							</li>
						</ul>
					</nav>

					<button
						className={classnames('header__menu', {
							'header__menu--open': open
						})}
						aria-label="Ouvrir le menu"
						onClick={() => toggleMenu()}
					>
						<span />
						<span />
						<span />
					</button>
				</div>
			</MaxWidth>

			<Menu ref={menuRef} open={open} closing={closing} toggleMenu={toggleMenu} />
		</header>
	);
};

export default withRouter(Header);
