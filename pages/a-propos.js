import PageLayout from '../layouts/page.js';

import About, { AboutSplit } from '../components/About';
import Button from '../components/Button';
import MaxWidth from '../components/MaxWidth';

const APropos = () => {
	return <PageLayout page={page} structuredData={{ type: 'AboutPage' }} />;
};

export default APropos;
