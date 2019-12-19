import './index.css';

import MaxWidth from '../MaxWidth';

import BlogCard from '../BlogCard';

import Spinner from 'react-svg-spinner';
import Link from 'next/link';

const BlogCards = ({ blogs }) => {
	const getColumns = (index) => {
		const newIndex = index % 6;
		if (newIndex >= 0 && newIndex <= 2) {
			return 4;
		} else if (newIndex === 3) {
			return 12;
		} else {
			return 6;
		}
	};

	return (
		<MaxWidth>
			<div className="title">
				Blog <span className="color-primary">Ma road</span>{' '}
			</div>
			<div className="grid-blog" id="link-dropdown">
				{blogs.length !== 0 ? (
					blogs.map((item, index) => {
						if (blogs.length !== 1) {
							return <BlogCard key={item.id} item={item} span={getColumns(index)} />;
						} else {
							return (
								<React.Fragment key={item.id}>
									<BlogCard item={item} span={getColumns(index + 4)} />
								</React.Fragment>
							);
						}
					})
				) : (
					<div className="container-loader span12">
						<Spinner thickness={3} color="#ef5c35" size="64px" />
					</div>
				)}
			</div>
		</MaxWidth>
	);
};

export default BlogCards;
