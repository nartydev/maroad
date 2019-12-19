import './index.css';

import Link from 'next/link';

const BlogCard = ({ span, item }) => {
	let category;
	if (item.categories[0] != null) {
		switch (item.categories[0]) {
			case 1:
				category = 'Article';
				break;
			case 2:
				category = 'Témoignage';
				break;
			case 3:
				category = 'Guide';
				break;
		}
	}

	let lowercategory;
	if (item.categories[0] != null) {
		switch (item.categories[0]) {
			case 1:
				lowercategory = 'article';
				break;
			case 2:
				lowercategory = 'temoignage';
				break;
			case 3:
				lowercategory = 'guide';
				break;
		}
	}

	const sentence = item.content.rendered.substring(0, 50);
	return span !== 12 ? (
		<div className={`card span${span}`}>
			<Link href={`/blog/${item.id}`} as={`/blog/${item.id}`}>
				<a>
					<img src={`${item.acf.image}`} className="card-img" />
					<div className="card__content">
						<div className={`button-category-card ${lowercategory}`}>{category}</div>
						<h3>{item.title.rendered}</h3>
						<div dangerouslySetInnerHTML={{ __html: `${item.content.rendered.substring(0, 50)}` }} />
						<div className="card__content--footer">
							<div className="card__content--footer-date">20 décembre 2019</div>
						</div>
					</div>
				</a>
			</Link>
		</div>
	) : (
		<div className="card span12">
			<Link href={`/blog/${item.id}`} as={`/blog/${item.id}`}>
				<a>
					<img src={`${item.acf.image}`} className="card-img-big" />
					<div className="card-left">
						<div className="card__content max-size">
							<div>
								<span className={`button-category ${lowercategory}`}>{category}</span>
							</div>
							<div>
								<h3>{item.title.rendered}</h3>
								<div
									dangerouslySetInnerHTML={{
										__html: `${item.content.rendered.substring(0, 250)}`
									}}
								/>
							</div>
						</div>
					</div>
				</a>
			</Link>
		</div>
	);
};

export default BlogCard;
