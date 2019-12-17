import MainLayout from './main';

const PageLayout = ({ page, children, ...props }) => {
	return (
		<MainLayout path={page.uid} {...props}>
			{children}
		</MainLayout>
	);
};

export default PageLayout;
