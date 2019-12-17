import PageLayout from '../layouts/page.js';

import { getPage } from '../helpers/stores';

import Contact from '../components/Contact';
import Newsletter from '../components/Newsletter';

const page = getPage('contact');

const content = page.data.body.filter(b => b.slice_type === 'page_contact1')[0];
const image = page.data.meta_image.url

const PageContact = () => (
  <PageLayout image={image} page={page} structuredData={{ type: 'ContactPage' }}>
    <Contact content={content} />

    <Newsletter />
  </PageLayout>
);

export default PageContact;
