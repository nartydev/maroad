import MaxWidth from '../MaxWidth';
import './index.css';
import BlogCard from '../BlogCard';
import * as moment from 'moment';

import Link from 'next/link';
import Router from 'next/router';

import Sticky from 'react-sticky-el';
import Clipboard from 'react-clipboard.js';

import { useState, useEffect, useRef, useCallback } from 'react';

const SOCIAL_IMAGES = {
	0: {
		src: require('../../static/blog/fb.png'),
		srcSet: require('../../static/blog/fb.svg')
	},
	1: {
		src: require('../../static/blog/linkedin.png'),
		srcSet: require('../../static/blog/linkedin.svg')
	},
	2: {
		src: require('../../static/blog/twitter.png'),
		srcSet: require('../../static/blog/twitter.svg')
	},
	3: {
		src: require('../../static/blog/link.png'),
		srcSet: require('../../static/blog/link.svg')
	}
};

moment.locale('fr');
const BlogContent = ({ data, pathname }) => {
	const [ clipboardOpen, setClipboardOpen ] = useState('Copier le lien');
	const lastLine = useRef();
	const shareButton = useRef();

	const toTitleCase = (str) => {
		str.trim();
		return str.replace(/\w\S*/g, function(txt) {
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		});
	};

	return (
		<React.Fragment>
			<div className={`min-content `}>
				<Link href="/blog">
					<a className="link-back">
						<div className="back-mobile">
							<img src={require('../../static/chevron-right2.svg')} />
							Retour au blog
						</div>
					</a>
				</Link>
			</div>
			<MaxWidth id="rela">
				<div className={`min-content `}>
					<Link href="/blog">
						<div className="back">
							<a className="link-back" title="Retour en arrière">
								<img src={require('../../static/chevron-right2.svg')} />
								Retour au blog
							</a>
						</div>
					</Link>
				</div>
			</MaxWidth>

			{data ? (
				<div className={`min-content `}>
					<div className="blog-content__title">{data.title.rendered}</div>
					{data ? <img className="img-responsive" src={`${data.acf.image}`} /> : null}
					<div className="blog-content__text" dangerouslySetInnerHTML={{ __html: data.content.rendered }} />
				</div>
			) : null}
			<div className="min-content">
				<div className="share-button-mobile">
					<div className="title-share">Partager cet article sur :</div>
					<div className="rela">
						<Link
							href={`https://www.facebook.com/sharer/sharer.php?kid_directed_site=0&sdk=joey&u=${pathname}&display=popup&ref=plugin&src=share_button`}
						>
							<a target="_blank">
								<img {...SOCIAL_IMAGES[0]} />
							</a>
						</Link>
					</div>
					<div className="rela">
						<Link href={`https://twitter.com/share?text=${data.title}&url=${pathname}`}>
							<a target="_blank">
								<img {...SOCIAL_IMAGES[2]} />
							</a>
						</Link>
					</div>
					<div className="rela">
						<Link href={`https://www.linkedin.com/shareArticle/?mini=true&url=${pathname}`}>
							<a target="_blank">
								<img {...SOCIAL_IMAGES[1]} />
							</a>
						</Link>
					</div>
					<div className="rela">
						<Clipboard data-clipboard-text={pathname} button-title={"I'm a tooltip"}>
							<img
								onClick={() => {
									setClipboardOpen('Lien copié !');
									setTimeout(() => {
										setClipboardOpen('Copier le lien');
									}, 2000);
								}}
								{...SOCIAL_IMAGES[3]}
							/>
							<div className={clipboardOpen !== 'Copier le lien' ? 'clipboard active' : 'clipboard'}>
								Lien copié !
							</div>
						</Clipboard>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default BlogContent;
