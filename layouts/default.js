import MainLayout from './main';

const DefaultLayout = ({ path, children, ...props }) => (
  <MainLayout path={path} {...props}>
    {children}
  </MainLayout>
);

export default DefaultLayout;
