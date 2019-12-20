import PageLayout from '../layouts/page.js';
import dynamic from 'next/dynamic';
import Button from '../components/Button';
import MaxWidth from '../components/MaxWidth';
const EventList = dynamic(() => import('../components/EventList/index'), { ssr: false });

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
