import './index.css';

import MaxWidth from '../MaxWidth';
import { useState, useEffect, useRef } from 'react';
import richText from '../../helpers/rich-text';
import classnames from 'classnames';
import AnchorLink from 'react-anchor-link-smooth-scroll';

const BlogSearch = ({ data, universeCallback, initCallback }) => {  const [init, setInit] = useState(false);
  const [universe, setUniverse] = useState([]);

  const universeBasic = [
    'Végétal',
    'Animal',
    'Gourmet',
    'Jardinage',
    'Plein Air',
    'Maison'
  ];

  function toTitleCase(str) {
    str.trim()
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  const updateUniverse = name => {
    if (!universe.includes(name)) {
      localStorage.setItem("search", toTitleCase(name));
      setUniverse([name]);
    } else {
      localStorage.removeItem("search");
      setUniverse([]);
    }
  };

  useEffect(() => {
    universeCallback(universe);

    if (initCallback) {
      initAll();
    }


    if(localStorage.getItem('search') !== null) {
      setUniverse([toTitleCase(localStorage.getItem("search"))]);
    }

    if (universe.length) {
      setInit(true);
    } else {
      setInit(false);
    }
  }, [universe, initCallback]);

  const initAll = () => {
    localStorage.removeItem("search");
    setUniverse([]);
  };

  const clean = s => {
    var r = s.toLowerCase();
    r = r.replace(new RegExp(/\s/g), '');
    r = r.replace(new RegExp(/[àáâãäå]/g), 'a');
    r = r.replace(new RegExp(/æ/g), 'ae');
    r = r.replace(new RegExp(/ç/g), 'c');
    r = r.replace(new RegExp(/[èéêë]/g), 'e');
    r = r.replace(new RegExp(/[ìíîï]/g), 'i');
    r = r.replace(new RegExp(/ñ/g), 'n');
    r = r.replace(new RegExp(/[òóôõö]/g), 'o');
    r = r.replace(new RegExp(/œ/g), 'oe');
    r = r.replace(new RegExp(/[ùúûü]/g), 'u');
    r = r.replace(new RegExp(/[ýÿ]/g), 'y');
    r = r.replace(new RegExp(/\W/g), '');
    return r;
  };

  return (
    <>
      <MaxWidth>
        <div className="content-header-blog">
          <h1 className="title-blog">{richText(data.title_textuel)}</h1>
          <p className="desc-blog">{richText(data.description_textuel)}</p>
        </div>
        <div className="content-search">
          {universeBasic.map((name, index) => {
            let nameLower = clean(name);
            return (
              <div
                onClick={() => {
                  updateUniverse(name);
                }}
                key={index}
                className={classnames(`content-search__category ${nameLower}`, {
                  activeWidth: init,
                  active: universe.includes(name)
                })}
              >
                <span>{name}</span>
                <img
                  src={require('../../static/blog/+.svg')}
                  className="plus"
                />
                <img
                  src={require('../../static/blog/+-white.svg')}
                  className="plus-white"
                />
              </div>
            );
          })}
          <div
            onClick={() => initAll()}
            className={
              init ? `content-search__init active` : 'content-search__init'
            }
          >
            <span>Réinitialiser</span>
          </div>
        </div>
      </MaxWidth>
      <div id="link-dropdown" className="content-search-mobile">
        <div className="flex-content">
          {universeBasic.map((name, index) => {
            let nameLower = clean(name);
            return (
              <div
                onClick={() => {
                  updateUniverse(name);
                }}
                key={index}
                className={classnames(`content-search__category ${nameLower}`, {
                  activeWidth: init,
                  active: universe.includes(name)
                })}
              >
                <AnchorLink
                  className="none-color"
                  offset="10"
                  href="#link-dropdown"
                >
                  <span>{name}</span>
                  <img
                    src={require('../../static/blog/+.svg')}
                    className={universe.includes(name) ? 'plus active' : 'plus'}
                  />
                  <img
                    src={require('../../static/blog/+-white.svg')}
                    className="plus-white"
                  />
                </AnchorLink>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default BlogSearch;
