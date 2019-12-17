import DefaultLayout from '../../layouts/default';
import BlogContent from '../../components/BlogContent';
const { HOST } = require('../../config');
import { richText } from '../../helpers/rich-text';
import getImage from '../../helpers/image';
import { getBlog } from "../../helpers/stores";

const Blog = ({ uid, pathname }) => {
  const page = getBlog(uid);
  if (!uid || !page.data) {
    return null;
  }

  const title = richText(page.data.title_article);
  const description = richText(page.data.introduction);
  const image = `https://${HOST}${getImage(page.data.card_img.url, {
    dimension: 1000
  })}`;

  const url = 'https://' + HOST + pathname.slice(0, 6) + uid;
  return (
    <DefaultLayout
      page={page}
      title={title}
      description={description}
      image={image}
    >
      <BlogContent data={page} pathname={url} />
    </DefaultLayout>
  );
};

Blog.getInitialProps = async ({ query: { uid }, pathname }) => ({
  uid,
  pathname
});

export default Blog;
