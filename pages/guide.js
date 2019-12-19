import PageLayout from '../layouts/page.js';

import GuidePage from '../components/GuidePage/index.js';
import Button from '../components/Button';
import MaxWidth from '../components/MaxWidth';

const Guide = () => {
	return (
		<PageLayout structuredData={{ type: 'AboutPage' }}>
				<GuidePage />
		</PageLayout>
	);
};

export default Guide;
