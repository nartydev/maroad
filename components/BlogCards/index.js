import './index.css';

import MaxWidth from '../MaxWidth';

import BlogCard from '../BlogCard';
import Newsletter from '../Newsletter';
import NewsletterCard from '../NewsletterCard';

import Link from 'next/link';

const BlogCards = ({ blogs, filterCallback }) => {
  const getColumns = index => {
    const newIndex = index % 6;
    if (newIndex >= 0 && newIndex <= 2) {
      return 4;
    } else if (newIndex === 3) {
      return 12;
    } else {
      return 6;
    }
  };

  return (
    <MaxWidth>
      <div className="grid-blog" id="link-dropdown">
        {blogs.length !== 0 ? (
          blogs.map((item, index) => {
            if (blogs.length !== 1) {
              return (
                <BlogCard key={item.uid} item={item} span={getColumns(index)} />
              );
            } else {
              return (
                <React.Fragment key={item.uid}>
                  <NewsletterCard span="6" />
                  <BlogCard item={item} span={getColumns(index + 4)} />
                </React.Fragment>
              );
            }
          })
        ) : (
          <>
            <div className="alert-error span12">
              <h2>Oops, aucun résultat ! 😥</h2>
              Désolé ! Il semblerait que nous n'ayons encore aucun élément dans
              cette catégorie. <br />
              Dites-nous ce que vous recherchez dans la rubrique{' '}
              <Link href="contact">Contact</Link> !
              <div onClick={() => filterCallback()}>
                <img
                  src={require('../../static/blog/icon-back.svg')}
                  alt="Retour au blog"
                />{' '}
                Retour aux articles
              </div>
            </div>
            <h2 className="span12">
              Tenez-vous au courant en vous inscrivant à notre newsletter !{' '}
            </h2>
            <Newsletter span={12} />
          </>
        )}
      </div>
    </MaxWidth>
  );
};

export default BlogCards;
