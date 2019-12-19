import DefaultLayout from '../../layouts/default';
import BlogContent from '../../components/BlogContent';
import { useState, useEffect } from 'react';
import axios from 'axios';

const BlogSingle = ({ id, pathname }) => {
	const [ data, setData ] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const result = await axios.get(`https://raphael-peralta.fr/maroad/wp-json/wp/v2/posts/${id}`);
			setData(result.data);
		};
		fetchData();
	}, []);

	return <DefaultLayout>{data.length !== 0 ? <BlogContent data={data} pathname={pathname} /> : null}</DefaultLayout>;
};

BlogSingle.getInitialProps = async ({ query: { id }, pathname }) => ({
	id,
	pathname
});

export default BlogSingle;
