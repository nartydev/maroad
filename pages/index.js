import Link from 'next/link';
import loadable from '@loadable/component';

import PageLayout from '../layouts/page.js';
import HomeTop from '../components/hometop';

const Index = () => {
	return (
		<PageLayout structuredData={{ type: 'AboutPage' }}>
			<HomeTop />
		</PageLayout>
	);
};

export default Index;
