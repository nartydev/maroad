import PageLayout from '../layouts/page.js';
import HomeTop from '../components/HomeTop/index.js';

import Link from 'next/link';
import loadable from '@loadable/component';


const Index = () => {
	return (
		<PageLayout structuredData={{ type: 'AboutPage' }}>
			<HomeTop />
		</PageLayout>
	);
};

export default Index;
