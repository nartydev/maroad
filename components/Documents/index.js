import Link from 'next/link';
import Sticky from 'react-sticky-el';

import MaxWidth from '../MaxWidth';

import './index.css';
import './side.css';
import './content.css';

const linkList = [
	{
		title: 'Mentions légales',
		href: '/mentions-legales'
	},
	{
		title: 'Politique de confidentialité',
		href: '/politique-de-confidentialite'
	},
	{
		title: "Politique d'échange et de remboursement",
		href: '/politique-echange-remboursement'
	},
	// {
	//   title: 'Conditions générales de vente',
	//   href: '/conditions-generales-de-vente'
	// },
	{
		title: 'Règlement du programme de fidélité',
		href: '/reglement-fidelite'
	}
	/*   {
    title: 'Règlement de la Loterie de réouverture',
    href: '/reglement-loterie-de-reouverture'
  } */
];

export const DocumentsSide = ({ active }) => {
	return (
		<div className="documents__side">
			<div className="documents__side__wrap">
				<Sticky>
					<ul>
						{linkList.map(({ href, title, ...props }, index) => (
							<li className={href === active ? '--active' : null} key={index}>
								<Link href={href} {...props} passHref>
									<a>{title}</a>
								</Link>
							</li>
						))}
					</ul>
				</Sticky>
			</div>
		</div>
	);
};

export const DocumentsContent = ({ children }) => (
	<div className="documents__content">
		<div className="documents__content__wrap">{children}</div>
	</div>
);

export const DocumentsTitle = ({ children, ...props }) => (
	<h1 className="documents__title" {...props}>
		{children}
	</h1>
);

export const DocumentsHead = ({ children, ...props }) => (
	<h2 className="documents__head" {...props}>
		{children}
	</h2>
);

const Documents = ({ children }) => (
	<div className="documents">
		<MaxWidth>
			<div className="documents__wrap">{children}</div>
		</MaxWidth>
	</div>
);

export default Documents;
