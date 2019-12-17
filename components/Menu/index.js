import { forwardRef, useEffect } from 'react';
import classnames from 'classnames';
import Link from 'next/link';

import './index.css';
import './logo.css';
import './content.css';

const { SITE_NAME } = require('../../config');

export default forwardRef(({ open, closing, toggleMenu }, ref) => {
	useEffect(
		() => {
			if (process.browser) {
				document.body.classList[open ? 'add' : 'remove']('--animate-menu-open');
			}
		},
		[ open ]
	);

	useEffect(
		() => {
			if (process.browser) {
				document.body.classList[closing ? 'add' : 'remove']('--animate-menu-close');
			}
		},
		[ closing ]
	);

	return (
		<div
			ref={ref}
			className={classnames('menu', {
				'menu--open': open,
				'menu--animate-open': open,
				'menu--animate-close': closing
			})}
			onClick={toggleMenu}
		>
			<Link href="/">
				<a className="menu__logo">
					<img
						src={require('../../static/logo-icon.png')}
						srcSet={require('../../static/logo-icon.svg')}
						title={`Logo ${SITE_NAME}`}
						alt={`Logo icône de ${SITE_NAME}`}
					/>
				</a>
			</Link>

			<ul />
		</div>
	);
});
