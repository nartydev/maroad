import MaxWidth from '../MaxWidth';
import './index.css';

import richText from '../../helpers/rich-text';
import { RichText } from 'prismic-reactjs';
import { linkResolver } from '../../helpers/link-resolver';
import { blogs, products } from '../../helpers/stores';
import BlogCard from '../BlogCard';
import * as moment from 'moment';

import Link from 'next/link';
import Router from 'next/router';

import Sticky from 'react-sticky-el';
import Clipboard from 'react-clipboard.js';

import { useState, useEffect, useRef, useCallback } from 'react';

const SOCIAL_IMAGES = {
  0: {
    src: require('../../static/blog/fb.png'),
    srcSet: require('../../static/blog/fb.svg')
  },
  1: {
    src: require('../../static/blog/linkedin.png'),
    srcSet: require('../../static/blog/linkedin.svg')
  },
  2: {
    src: require('../../static/blog/twitter.png'),
    srcSet: require('../../static/blog/twitter.svg')
  },
  3: {
    src: require('../../static/blog/link.png'),
    srcSet: require('../../static/blog/link.svg')
  }
};

moment.locale('fr');
const BlogContent = ({ data, pathname }) => {
  const [simularArticle, setSimularArticle] = useState();
  const [productsItems, setProductsItems] = useState([]);
  const [clipboardOpen, setClipboardOpen] = useState('Copier le lien');
  const lastLine = useRef();
  const shareButton = useRef();

  const allCategory = data.data.category_article[0].text.split('|');

  const handleScroll = useCallback(e => {
    if (global.window.innerWidth < 800) {
    } else {
      const limitScroll = lastLine.current.getBoundingClientRect();
      if (limitScroll.top - window.innerHeight / 2 < 150) {
        shareButton.current.style.opacity = '0';
      } else {
        shareButton.current.style.opacity = '1';
      }
    }
  }, []);

  function toTitleCase(str) {
    str.trim()
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  const changeSearch = (name) => {
    localStorage.setItem('search', name.trim())
  }

  useEventListener('scroll', handleScroll);

  if (!simularArticle) {
    let newData = blogs.filter(item => {
      if (item.data.category_article[0].text !== null && item.id !== data.id) {
        for (let category of allCategory) {
          let word = item.data.category_article[0].text.toLowerCase();
          if (word.includes(category.toLowerCase()))
          return word.includes(category.toLowerCase());
        }
      }
    });
    setSimularArticle(newData.slice(0, 3));
  }
  useEffect(() => {
  }, [simularArticle, productsItems]);

  return (
    <React.Fragment>
      <Link href="/blog">
        <a className="link-back">
        <div className="back-mobile">
          <img src={require("../../static/jobs/back-jobs.svg")} />
          Retour au blog
        </div>
        </a>
      </Link>
      <div className="mobile-img">
        {data.data && data.data.first_img !== null && data.data.first_img !== undefined ? (
          <img src={`${data.data.first_img.url}`} />
        ) : null}
      </div>
      <MaxWidth id="rela">
        <Link href="/blog">
        <div className="back">
          <a className="link-back" title="Retour en arrière">
            <img src={require("../../static/jobs/back-jobs.svg")} />
            Retour au blog
          </a>
        </div>
        </Link>
        <div className="min-content">
          <div className="header-blog">
            <div className="header-blog__left">
              <div
                className={`button-category-blog ${
                  data.data !== null ? data.data.type : null
                }`}
              >
                {data.data !== null ? data.data.type : null}
              </div>
              <div className="header-blog__left--title">
                {data.data !== null ? richText(data.data.title_article) : null}
              </div>
              <div className="header-blog__left--date">
                {moment(data.data.date_publish).format("DD MMMM YYYY")} /{" "}
                {data.data.minute_read} min de lecture
              </div>
              <div className="type-blog">
                {allCategory.map((item, index) => {
                  return (
                    <Link href="/blog" key={index}>
                      <div className="link-category">
                        <a
                          title={`Aller voir la catégorie ${item}`}
                          onClick={() => {
                            changeSearch(item);
                          }}
                        >
                          {item}
                        </a>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </MaxWidth>
      <MaxWidth>
        <Sticky>
          <div className="share-button" ref={shareButton}>
            <div className="title-share">Partager</div>
            <div className="rela">
              <Link
                href={`https://www.facebook.com/sharer/sharer.php?kid_directed_site=0&sdk=joey&u=${pathname}&display=popup&ref=plugin&src=share_button&title=${richText(
                  data.data.title_article
                )}`}
              >
                <a target="_blank">
                  <img {...SOCIAL_IMAGES[0]} />
                </a>
              </Link>
              <div className="popup-hover">Partager sur Facebook</div>
            </div>
            <div className="rela">
              <Link
                href={`https://twitter.com/share?text=${richText(
                  data.data.title_article
                )}&url=${pathname}`}
              >
                <a target="_blank">
                  <img {...SOCIAL_IMAGES[2]} />
                </a>
              </Link>
              <div className="popup-hover">Partager sur Twitter</div>
            </div>
            <div className="rela">
              <Link
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${pathname}&title=${data.data.title_article}&summary=${data.data.type}`}
              >
                <a target="_blank">
                  <img {...SOCIAL_IMAGES[1]} />
                </a>
              </Link>
              <div className="popup-hover">Partager sur Linkedin</div>
            </div>
            <div className="rela">
              <Clipboard
                data-clipboard-text={pathname}
                button-title={"I'm a tooltip"}
              >
                <img
                  onClick={() => {
                    setClipboardOpen("Lien copié !");
                    setTimeout(() => {
                      setClipboardOpen("Copier le lien");
                    }, 2000);
                  }}
                  {...SOCIAL_IMAGES[3]}
                />
                <div className="popup-hover bottom">{clipboardOpen}</div>
              </Clipboard>
            </div>
          </div>
        </Sticky>
      </MaxWidth>
      <MaxWidth>
        <div className="header-blog__right">
          {data.data && data.data.first_img !== null && data.data.first_img !== undefined ? (
            <img src={`${data.data.first_img.url}`} />
          ) : null}
        </div>
        <div className="min-content min-content-intro">
          <div className="intro">{richText(data.data.introduction)}</div>
        </div>
      </MaxWidth>
      {data.data && data.data !== null && data.data !== undefined
        ? data.data.body.map((item, index) => {
            if (item.slice_type === "contenu_texte") {
              return (
                <div key={index} className={`min-content `}>
                  <div className="blog-content__title">
                    {richText(item.primary.title_content)}
                  </div>
                  <div className="blog-content__text">
                    {RichText.render(
                      item.primary.description_content,
                      linkResolver
                    )}
                  </div>
                </div>
              );
            } else if (item.slice_type === "contenu_visuel") {
              return (
                <MaxWidth key={index}>
                  <div className="blog-content__img">
                    <img src={`${item.primary.image_content.url}`} />
                  </div>
                </MaxWidth>
              );
            } else if (item.slice_type === "contenu_blog") {
              return (
                <React.Fragment key={index}>
                  <div className={`min-content`}>
                    <div className="blog-content__title">
                      {richText(item.primary.title_content)}
                    </div>
                    <div className="blog-content__text">
                      {RichText.render(
                        item.primary.text_content,
                        linkResolver
                      )}
                    </div>
                  </div>
                  <MaxWidth>
                    <div className="blog-content__img">
                      {item.primary.img_content.url !== null &&
                      item.primary.img_content.url !== undefined ? (
                        <img src={`${item.primary.img_content.url}`} />
                      ) : null}
                    </div>
                  </MaxWidth>
                </React.Fragment>
              );
            } else if (item.slice_type === "citation") {
              return (
                <div key={index} className={`min-content`}>
                  <div className="blog-content__quote">
                    {richText(item.primary.citation_content)}
                  </div>
                </div>
              );
            }
          })
        : null}
      <MaxWidth>
        <div className="share-button-mobile">
          <div className="title-share">Partager cet article sur :</div>
          <div className="rela">
            <Link
              href={`https://www.facebook.com/sharer/sharer.php?kid_directed_site=0&sdk=joey&u=${pathname}&display=popup&ref=plugin&src=share_button`}
            >
              <a target="_blank">
                <img {...SOCIAL_IMAGES[0]} />
              </a>
            </Link>
          </div>
          <div className="rela">
            <Link
              href={`https://twitter.com/share?text=${richText(
                data.data.title_article
              )}&url=${pathname}`}
            >
              <a target="_blank">
                <img {...SOCIAL_IMAGES[2]} />
              </a>
            </Link>
          </div>
          <div className="rela">
            <Link
              href={`https://www.linkedin.com/shareArticle/?mini=true&url=${pathname}`}
            >
              <a target="_blank">
                <img {...SOCIAL_IMAGES[1]} />
              </a>
            </Link>
          </div>
          <div className="rela">
            <Clipboard
              data-clipboard-text={pathname}
              button-title={"I'm a tooltip"}
            >
              <img
                onClick={() => {
                  setClipboardOpen("Lien copié !");
                  setTimeout(() => {
                    setClipboardOpen("Copier le lien");
                  }, 2000);
                }}
                {...SOCIAL_IMAGES[3]}
              />
              <div
                className={
                  clipboardOpen !== "Copier le lien"
                    ? "clipboard active"
                    : "clipboard"
                }
              >
                Lien copié !
              </div>
            </Clipboard>
          </div>
        </div>
      </MaxWidth>
      <MaxWidth>
        <div className="last-line" ref={lastLine} />
        <div className="content-similar-article">
          <h1>Découvrez nos articles similaires</h1>
          <div className="grid-blog">
            {simularArticle &&
              simularArticle !== undefined &&
              simularArticle.map((item, index) => {
                return <BlogCard key={index} item={item} span={4} />;
              })}
          </div>
        </div>
      </MaxWidth>
    </React.Fragment>
  );
};

function useEventListener(eventName, handler, element = global.window) {
  // Create a ref that stores handler
  const savedHandler = useRef();

  // Update ref.current value if handler changes.
  // This allows our effect below to always get latest handler ...
  // ... without us needing to pass it in effect deps array ...
  // ... and potentially cause effect to re-run every render.
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(
    () => {
      // Make sure element supports addEventListener
      // On
      const isSupported = element && element.addEventListener;
      if (!isSupported) return;

      // Create event listener that calls handler function stored in ref
      const eventListener = event => savedHandler.current(event);

      // Add event listener
      element.addEventListener(eventName, eventListener);

      // Remove event listener on cleanup
      return () => {
        element.removeEventListener(eventName, eventListener);
      };
    },
    [eventName, element] // Re-run if eventName or element changes
  );
}

export default BlogContent;
