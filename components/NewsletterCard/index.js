import { useState, useRef, useEffect } from 'react';
import { animated, useTransition, config } from 'react-spring';
import classnames from 'classnames';
import Button from '../Button';
import axios from 'axios';
import './index.css';

const useNewsletter = () => {
  const formRef = useRef(null);
  const [email, setEmail] = useState('');

  const [formState, setFormState] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const subscribe = () => {
    setFormState('loading');

    axios
      .post(
        `${window.location.protocol}//${
          location.hostname === 'localhost' ? 'localhost:4000' : SERVER_HOST
        }/api/v1/subscribe`,
        {
          email: formRef.current.querySelector('[name="email"]').value,

          responseType: 'json'
        }
      )
      .then(({ data }) => {
        if (!data.error) {
          setFormState('success');
        } else {
          setFormState('error');
        }
      })
      .catch(error => {
        if (!error.response || !error.response.data) {
          setFormState('error');

          setErrorMessage(
            'Navré, il nous est impossible de vous inscrire à la newsletter pour le moment.',
            true
          );
        } else {
          switch (error.response.data.error) {
            case 'MEMBER_PENDING':
              setFormState('member_pending');
              break;

            case 'MEMBER_EXISTS':
              setFormState('member_exists');
              break;

            case 'INVALID_BODY':
              setFormState('error');
              break;

            case 'BLACKLISTED':
              setFormState('error');

              setErrorMessage(
                "Navré, mais cette adresse e-mail a dépassé les quotas d'inscriptions aux newsletters pour le moment.",
                true
              );
              break;

            default:
              setFormState('error');

              setErrorMessage(
                'Navré, il nous est impossible de vous inscrire à la newsletter pour le moment.',
                true
              );
              break;
          }
        }
      });
  };

  const handleSubmit = event => {
    event.preventDefault();

    const email = formRef.current.querySelector('[name="email"]').value;

    if (
      email.trim() === '' ||
      !/^[a-z0-9][a-z0-9-_\.\+]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/.test(
        email.trim()
      )
    ) {
      setFormState('error');
    } else {
      subscribe();
    }
  };

  /**
   * Never show newsletter popup again within 365 days on subscription success.
   */
  useEffect(() => {
    const isSuccess =
      formState === 'success' ||
      formState === 'member_exists' ||
      formState === 'member_pending';

    if (isSuccess) {
      cookies.set(NEWSLETTER_COOKIE_NAME, 1, { expires: 365, path: '' });
    }
  }, [formState]);

  const formProps = {
    ref: formRef,
    onSubmit: handleSubmit
  };

  const inputProps = {
    email,
    onChange: event => setEmail(event.target.value)
  };

  return {
    formProps,
    inputProps,
    formState,
    errorMessage
  };
};

const NewsletterCard = ({ span }) => {
  const { formProps, inputProps, formState, errorMessage } = useNewsletter();

  const isSuccess =
    formState === 'success' ||
    formState === 'member_exists' ||
    formState === 'member_pending';

  const hasModal = isSuccess || errorMessage;

  const successTransitions = useTransition(isSuccess, null, {
    from: { opacity: 0, transform: 'translateY(100%)' },
    enter: { opacity: 1, transform: 'translateY(0)' },
    config: config.gentle
  });

  const errorTransitions = useTransition(errorMessage, null, {
    from: { opacity: 0, transform: 'translateY(100%)' },
    enter: { opacity: 1, transform: 'translateY(0)' },
    config: config.gentle
  });

  return (
    <div className={`span${span} card-newsletter`}>
      <span className="card-newsletter__tag">Newsletter</span>
      <h2>Vous ne trouvez pas ce que vous cherchez ?</h2>
      <div className="card-newsletter__text">
        Rejoignez la newsletter pour être tenu informé des nouveaux articles !
      </div>
      <form
        action="#"
        method="GET"
        {...formProps}
        className={classnames('newsletter__form', {
          'newsletter__form--error': formState === 'error'
        })}
      >
        <input
          className="newsletter-card__input"
          id="newsletter-input"
          type="email"
          name="email"
          {...inputProps}
          placeholder="Entrez votre adresse e-mail"
        />

        <Button
          largeTouch
          type="submit"
          loading={formState === 'loading'}
          disabled={formState === 'loading' || hasModal}
        >
          S'inscrire à la newsletter
        </Button>
        {successTransitions.map(
          ({ item, key, props }) =>
            item && (
              <animated.div
                className="newsletter__modal"
                key={key}
                style={props}
              >
                <div>
                  <h1 className="newsletter__title">
                    {formState === 'member_exists'
                      ? 'Vous êtes déjà inscrit avec cette adresse e-mail !'
                      : formState === 'member_pending'
                      ? 'Vous avez déjà demandé une inscription avec cette adresse e-mail'
                      : 'Merci ! 🎉'}
                  </h1>

                  {formState === 'member_exists' ? null : formState ===
                    'member_pending' ? (
                    <h2 className="newsletter__subtitle">
                      Veuillez vérifier votre boite mail pour valider votre
                      inscription.
                    </h2>
                  ) : (
                    <h2 className="newsletter__subtitle">
                      Vous allez recevoir un e-mail de confirmation dans
                      quelques instants. Surtout, validez bien votre
                      inscription. Sans cela, vous ne recevrez pas nos e-mails
                      :(
                    </h2>
                  )}
                </div>
                <div className="newsletter__illustration">
                  <picture>
                    <source
                      srcSet={require('../../static/illustration/thank-you.png?webp')}
                      type="image/webp"
                    />
                    <img
                      src={require('../../static/illustration/thank-you.png')}
                      srcSet={`${require('../../static/illustration/thank-you.png?resize&size=300')} 300w, ${require('../../static/illustration/thank-you.png?resize&size=600')} 600w`}
                      alt="Photo de remerciement"
                      draggable="false"
                    />
                  </picture>
                </div>
              </animated.div>
            )
        )}

        {errorTransitions.map(
          ({ item, key, props }) =>
            item && (
              <animated.div
                className="newsletter__modal newsletter__modal--error"
                key={key}
                style={props}
              >
                <div>
                  <h1 className="newsletter__title">{errorMessage}</h1>
                </div>
              </animated.div>
            )
        )}
      </form>
    </div>
  );
};

export default NewsletterCard;
