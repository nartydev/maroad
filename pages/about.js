import PageLayout from '../layouts/page.js';

import About from '../components/About/index.js';
import Button from '../components/Button';
import MaxWidth from '../components/MaxWidth';

const AboutPage = () => {
	return (
		<PageLayout structuredData={{ type: 'AboutPage' }}>
			<About />
		</PageLayout>
	);
};

export default AboutPage;
