import classnames from 'classnames';

import './index.css';

const NavButton = opts => {
  const { dir, ...props } = { dir: 'left', ...opts };

  return (
    <button
      className={classnames('nav-button', {
        'nav-button--left': dir === 'left',
        'nav-button--right': dir === 'right'
      })}
      {...props}
    >
      <img
        src={require('../../static/icons/slider-arrow.png')}
        srcSet={require('../../static/icons/slider-arrow.svg')}
        alt="Flèche directionnelle"
      />
    </button>
  );
};

export default NavButton;
