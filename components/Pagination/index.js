import Link from 'next/link';
import { useState, useEffect } from 'react';
import './index.css';

const Pagination = ({ page, totalElement, numberPerPage }) => {
  const [allNumbers, setAllNumbers] = useState([]);
  let array = [];

  const pageNumb = page;

  let maxPage = Math.ceil(totalElement / numberPerPage);
  const prevLink = page <= 0 ? 1 : pageNumb - 1;
  const nextLink = page >= maxPage ? maxPage : pageNumb + 1;

  useEffect(() => {
    if (allNumbers.length === 0) {
      for (let i = 1; i <= maxPage; i++) {
        array.push(i);
      }
      setAllNumbers(array);
    }
  }, [array, allNumbers]);

  return (
    <div className="pagination">
      {page !== 1 ? (
        <div className="prev-link">
          <Link href={`/blog/page/${prevLink}`}>
            <img
              alt="Page précédente"
              src={require('../../static/blog/icon.svg')}
            />
          </Link>
        </div>
      ) : null}
      {allNumbers.map(item => {
        console.log(item, page);

        return (
          <Link key={item} href={`/blog/page/${item}`}>
            <a className={item === page ? 'page-active' : ''}>{item}</a>
          </Link>
        );
      })}
      {maxPage !== page ? (
        <div className="next-link">
          <Link href={`/blog/page/${nextLink}`}>
            <img
              alt="Page suivante"
              src={require('../../static/blog/icon.svg')}
            />
          </Link>
        </div>
      ) : null}
    </div>
  );
};

export default Pagination;
