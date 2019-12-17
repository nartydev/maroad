import { forwardRef } from 'react';
import classnames from 'classnames';
import Spinner from 'react-svg-spinner';
import { animated, useSpring, useTransition, config } from 'react-spring';

import './index.css';

export const Button = forwardRef((opts, ref) => {
  const {
    link,
    type,
    large,
    medium,
    extraLarge,
    largeTouch,
    lightBlue,
    transparent,
    invisible,
    color,
    children,
    loading,
    ...props
  } = { type: 'button', ...opts };

  const className = classnames('button', {
    'button--large': large,
    'button--medium': medium,
    'button--extra-large': extraLarge,

    'button--large-touch': largeTouch,

    'button--orange': color === 'orange',
    'button--green': color === 'green',
    'button--yellow': color === 'yellow',
    'button--blue': color === 'blue',
    'button--light-grey': color === 'light-grey',

    'button--light-blue': lightBlue,
    'button--transparent': transparent,
    'button--invisible': invisible
  });

  const spinnerTransitions = useTransition(loading, null, {
    from: { opacity: 0, width: 0, transform: 'translateY(100%)' },
    enter: { opacity: 1, width: 24, transform: 'translateY(0)' },
    leave: { opacity: 0, width: 0, transform: 'translateY(-100%)' },
    config: config.gentle
  });

  const spinner = spinnerTransitions.map(
    ({ item, key, props }) =>
      item && (
        <animated.span className="button__spinner" key={key} style={props}>
          <Spinner color="white" speed="fast" size="16" />
        </animated.span>
      )
  );

  if (link) {
    return (
      <a className={className} ref={ref} {...props}>
        <span>{children}</span>
        {spinner}
      </a>
    );
  }

  return (
    <button className={className} type={type} ref={ref} {...props}>
      <span>{children}</span>
      {spinner}
    </button>
  );
});

export default Button;
