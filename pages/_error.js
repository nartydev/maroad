import DefaultLayout from '../layouts/default.js';

import { NotFound } from '../components/NotFound';

const Error = () => (
  <DefaultLayout>
    <NotFound />
  </DefaultLayout>
);

export default Error;
