import Link from 'next/link';

import MaxWidth from '../MaxWidth';
import './index.css';

import { useState } from 'react';

export const NotFound = () => {
	return (
		<div className="not-found">
			<Link href="/">
				<a className="button">Retour à la page d'accueil</a>
			</Link>
		</div>
	);
};
