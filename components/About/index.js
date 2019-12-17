import classnames from 'classnames';
import { ContactList } from '../Contact';

import './index.css';

export const AboutSplit = ({ reverse, img, children }) => (
  <div
    className={classnames('about__split', { 'about__split--reverse': reverse })}
  >
    <div className="about__split__img">{img}</div>
    <div className="about__split__content">{children}</div>
  </div>
);

const About = ({ siegeImg, children }) => (
  <div className="about">
    {children}

    <div className="about__split">
      <div className="about__split__img">{siegeImg}</div>

      <div className="about__split__content">
        <h1 className="about__split__siege">Siège Social Coté Nature</h1>
        <h2 className="about__split__sub-title">Saint-Michel-sur-Orge</h2>

        <ContactList />
      </div>
    </div>
  </div>
);

export default About;
