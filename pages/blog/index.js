import PageLayout from '../../layouts/page.js';

import { getPage, blogs } from '../../helpers/stores';
import BlogSearch from '../../components/BlogSearch';
import BlogCards from '../../components/BlogCards';
import Newsletter from '../../components/Newsletter';
import { useState, useEffect } from 'react';

import MaxWidth from '../../components/MaxWidth';
import Pagination from '../../components/Pagination';
import BlogPagination from './page/[id]'

const page = getPage('blog');
const dataPage = page.data.body[0].primary;

const articleSorter = (a, b) => {
  return new Date(b.data.date_publish) - new Date(a.data.date_publish);
};

const Blogs = () => {

  return (
    <BlogPagination id={1} />
  );
};

export default Blogs;
