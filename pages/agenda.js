import PageLayout from '../layouts/page.js';

import EventList from '../components/EventList';
import Button from '../components/Button';
import MaxWidth from '../components/MaxWidth';

const Agenda = () => {
	return (
		<PageLayout structuredData={{ type: 'AboutPage' }}>
			<MaxWidth>
				<EventList />
			</MaxWidth>
		</PageLayout>
	);
};

export default Agenda;
