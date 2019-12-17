import classnames from 'classnames';

import './index.css';

const Container = ({ grey, children }) => (
  <main
    className={classnames('container', {
      'container--grey': grey
    })}
  >
    {children}
  </main>
);

export default Container;
