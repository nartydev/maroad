import MainLayout from './main';

const PageLayout = ({ page, children, ...props }) => {
	return <MainLayout {...props}>{children}</MainLayout>;
};

export default PageLayout;
