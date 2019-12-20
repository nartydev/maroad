import PageLayout from '../layouts/page.js';
import MaxWidth from '../components/MaxWidth';
import ContactForm from '../components/ContactForm';

const Contact = () => {
	return (
		<PageLayout structuredData={{ type: 'AboutPage' }}>
			<MaxWidth>
				<ContactForm />
			</MaxWidth>
		</PageLayout>
	);
};

export default Contact;
