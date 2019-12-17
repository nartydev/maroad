import Link from 'next/link';

import MaxWidth from '../MaxWidth';
import './index.css';

import { useState } from 'react';

export const NotFound = () => {
	return (
		<div className="not-found">
			<MaxWidth>
				<div className="not-found__wrap">
					<div className="not-found__content">
						<h1>
							<span>4</span>
							<span>0</span>
							<span>4</span>
						</h1>
						<h2>Oops ! La page demandée semble s’être perdue en pleine nature...</h2>
						<h3>Voici quelques liens qui peuvent vous aider :</h3>
					</div>

					<div className="not-found__illustration" />
				</div>
			</MaxWidth>
		</div>
	);
};
