import './index.css';
import richText from '../../helpers/rich-text';
import { RichText } from 'prismic-reactjs';
import { linkResolver } from '../../helpers/link-resolver';
import * as moment from 'moment';

import Link from 'next/link';

moment.locale('fr');

const BlogCard = ({ span, item }) => {
  let itemlower = item.data.type
  if(item.data.type != null) {
    itemlower = item.data.type.toLowerCase()
  }
  return span !== 12 ? (
    <div className={`card span${span}`}>
    <Link href={`/blog/${item.uid}`} as={`/blog/${item.uid}`}>
        <a>
          <img
            src={`${item.data.card_img.url}`}
            srcSet={
              item.data.card_img.w300 && item.data.card_img.w600
                ? `${item.data.card_img.w300.url} 300w, ${
                item.data.card_img.w600.url
                } 600w, ${item.data.card_img.url} 1200w`
                : null
            }
            className="card-img"
          />
          <div className="card__content">
            <div className={`button-category-card ${itemlower}`}>
              {item.data.type}
            </div>
            <h3>{richText(item.data.title_article)}</h3>
            <div className="card__content--footer">
              <div className="card__content--footer-date">
                {moment(item.data.date_publish).format("DD MMMM YYYY")} /{" "}
                {item.data.minute_read} min de lecture
              </div>
              <div className="card__content--footer-category">
                {RichText.render(item.data.category_article, linkResolver)}
              </div>
            </div>
          </div>
        </a>
    </Link>
      </div>
  ) : (
    <div className="card span12">
    <Link href={`/blog/${item.uid}`} as={`/blog/${item.uid}`}>
      <a>
        <img
          src={`${item.data.image_large_card.url}`}
          className="card-img-big"
        />
        <div className="card-left">
          <div className="card__content max-size">
            <div>
              <span className={`button-category ${itemlower}`}>
                {item.data.type}
              </span>
            </div>
            <div>
              <h3>{richText(item.data.title_article)}</h3>
              <p>
                  {richText(item.data.introduction).slice(0, 100)}...
              </p>
            </div>
            <div className="card__content--footer">
              <div className="card__content--footer-date">
                {moment(item.data.date_publish).format("DD MMMM YYYY")} /{" "}
                {item.data.minute_read} min de lecture
              </div>
              <div className="card__content--footer-category">
                {RichText.render(item.data.category_article, linkResolver)}
              </div>
            </div>
          </div>
        </div>
      </a>
    </Link>
      </div>
  );
};

export default BlogCard;
