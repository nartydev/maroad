import PageLayout from '../../layouts/page.js';
import BlogCards from '../../components/BlogCards';

import Link from 'next/link';
import loadable from '@loadable/component';

import axios from 'axios';

import { useState, useEffect } from 'react';

const Blog = () => {
	const [ data, setData ] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const result = await axios('http://localhost:8888/wordpress/wp-json/wp/v2/posts');
			console.log(result.data);
			setData(result.data);
		};
		fetchData();
	}, []);

	return (
		<PageLayout structuredData={{ type: 'AboutPage' }}>
			<BlogCards blogs={data} />
		</PageLayout>
	);
};

export default Blog;
