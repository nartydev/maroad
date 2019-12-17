import PageLayout from '../../../layouts/page.js';

import { getPage, blogs } from '../../../helpers/stores';
import BlogSearch from '../../../components/BlogSearch';
import BlogCards from '../../../components/BlogCards';
import Newsletter from '../../../components/Newsletter';
import Pagination from '../../../components/Pagination';
import MaxWidth from '../../../components/MaxWidth';
import { useState, useEffect } from 'react';

const pageData = getPage('blog');
const dataPage = pageData.data.body[0].primary;

const lengthBlog = blogs.length
const image = pageData.data.meta_image.url

const articleSorter = (a, b) => {
  if (a.data.date_publish === null && b.data.date_publish === null) return -1;
  if (a.data.date_publish === null) return -1;
  if (b.data.date_publish === null) return -1;

  return (
    new Date(b.data.date_publish.slice(0, 19)) -
    new Date(a.data.date_publish.slice(0, 19))
  );
};
const BlogPagination = ({ id }) => {
  const idPage = id-1;
  const [data, setData] = useState(
    blogs.sort(articleSorter).slice(idPage * 12, idPage * 12 + 12));
  const [universeUnder, setUniverseUnder] = useState([]);
  const [filter, setFilter] = useState(false);

  useEffect(() => {
    if (universeUnder.length !== 0) {
      const newData = blogs.filter(item => {
        for (const universe of universeUnder) {
          const word = item.data.category_article[0].text.toLowerCase();

          if (word.includes(universe.toLowerCase())) {
            return word.includes(universe.toLowerCase());
          }
        }
      });

      setData(newData);
    } else {
      setData(blogs.slice(idPage * 12, idPage * 12 + 12));    }
  }, [universeUnder]);

  const updateFilter = () => {
    setFilter(true);
    setTimeout(() => {
      setFilter(false);
    }, 200);
  };

  return (
    <PageLayout image={image} page={pageData}>
      <BlogSearch
        data={dataPage}
        initCallback={filter}
        universeCallback={setUniverseUnder}
      />
      <BlogCards
        blogs={data}
        filterCallback={updateFilter}
        research={data}
      />
      {blogs.length !== 12 &&
      universeUnder.length === 0 ? (
        <MaxWidth>
          <Pagination
            page={parseInt(id)}
            totalElement={lengthBlog}
            numberPerPage={12}
          />
        </MaxWidth>
      ) : null}
      {universeUnder.length === 0 ? (
        <Newsletter />
      ) : null}
    </PageLayout>
  );
};

BlogPagination.getInitialProps = async function({ query: { id } }) {
  return {
    id: id
  };
};

export default BlogPagination;
