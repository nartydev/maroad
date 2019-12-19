import { useState, useEffect, useRef, useCallback } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';
import { RichText } from 'prismic-reactjs';

import Button from '../Button';
import MaxWidth from '../MaxWidth';
import Form, { FormLine } from '../Form';
import Input from '../Input';

import './index.css';

const { RECAPTCHA_PUBLIC, SERVER_HOST } = require('../../config');

export const ContactList = () => (
  <ul className="contact-list">
    <li className="contact-list__item">
      <span className="contact-list__img">
        <img
          src={require('../../static/icons/pin.png')}
          srcSet={require('../../static/icons/pin.svg')}
          alt="Icône d'un marqueur de carte"
        />
      </span>
      <p>
        118 Rue des Tiphoines
        <br />
        91240 Saint-Michel-sur-Orge
      </p>
    </li>

    <li className="contact-list__item">
      <span className="contact-list__img">
        <img
          src={require('../../static/icons/contact.png')}
          srcSet={require('../../static/icons/contact.svg')}
          alt="Icône d'une enveloppe"
        />
      </span>
      <p>
        <a href="mailto:bonjour@cotenature.com">bonjour@cotenature.com</a>
      </p>
    </li>

    <li className="contact-list__item">
      <span className="contact-list__img">
        <img
          src={require('../../static/icons/phone.png')}
          srcSet={require('../../static/icons/phone.svg')}
          alt="Icône d'un téléphone"
        />
      </span>
      <p>
        <a href="tel:+33779289883">07 79 28 98 83</a>
      </p>
    </li>
  </ul>
);

const Contact = ({ content }) => {
  const formRef = useRef(null);

  const [surname, setSurname] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [formValid, setFormValid] = useState(false);

  const recaptchaRef = useRef(null);

  const [formState, setFormState] = useState(null);
  const [reCaptchaState, setReCaptchaState] = useState(null);

  const [favoriteShop] = useFavoriteShop();

  const [shop, setShop] = useState(
    favoriteShop ? richText(favoriteShop.data.title) : ''
  );

  useEffect(() => {
    if (favoriteShop) {
      setShop(value =>
        value === '' ? richText(favoriteShop.data.title) : value
      );
    }
  }, [favoriteShop]);

  useEffect(() => {
    if (
      surname.trim() !== '' &&
      name.trim() !== '' &&
      email.trim() !== '' &&
      subject.trim() !== '' &&
      message.trim() !== ''
    ) {
      if (
        /^[a-z0-9][a-z0-9-_\.\+]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/.test(
          email.trim()
        )
      ) {
        setFormValid(true);
      } else {
        setFormValid('Veuillez entrer une adresse e-mail valide.');
      }
    } else {
      setFormValid(false);
    }
  }, [surname, name, email, subject, message]);

  const sendMessage = useCallback(
    token => {
      setFormState('loading');
      setReCaptchaState('valid');

      axios
        .post(
          `${window.location.protocol}//${
            location.hostname === 'localhost' ? 'localhost:4000' : SERVER_HOST
          }/api/v1/contact`,
          {
            surname: formRef.current.querySelector('[name="firstname"]').value,
            name: formRef.current.querySelector('[name="lastname"]').value,
            email: formRef.current.querySelector('[name="email"]').value,
            subject: formRef.current.querySelector('[name="subject"]').value,
            message: formRef.current.querySelector('[name="message"]').value,
            shop: formRef.current.querySelector('[name="shop"]').value,
            'g-recaptcha-response': token,

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
        .catch(() => {
          setFormState('error');
        });
    },
    [surname, name, email, subject, message, shop]
  );

  return (
    <div className="contact">
      <div className="contact__bg" />
      <div className="contact__content">
        <MaxWidth>
          <div className="contact__content__wrap">
            <Form
              ref={formRef}
              action="#"
              onSubmit={event => {
                event.preventDefault();

                setFormState('recaptcha-executing');
                setReCaptchaState('executing');
                recaptchaRef.current.execute();
              }}
            >
              <h1>{richText(content.primary.left_title)}</h1>

              {RichText.render(content.primary.left_content, linkResolver)}

              <FormLine>
                <Input>
                  <input
                    type="text"
                    name="firstname"
                    placeholder="Prénom"
                    value={surname}
                    onChange={({ target }) => setSurname(target.value)}
                  />
                </Input>

                <Input>
                  <input
                    type="text"
                    name="lastname"
                    placeholder="Nom"
                    value={name}
                    onChange={({ target }) => setName(target.value)}
                  />
                </Input>
              </FormLine>
              <FormLine mobileBreak>
                <Input>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Sujet"
                    value={subject}
                    onChange={({ target }) => setSubject(target.value)}
                  />
                </Input>

                <Input>
                  <label htmlFor="shop" className="input__select">
                    <select
                      name="shop"
                      id="shop"
                      value={shop}
                      onChange={({ target }) => setShop(target.value)}
                    >
                      <option value="" disabled>
                        Choisir un magasin
                      </option>
                      {shops
                        .sort((a, b) => {
                          if (a.uid < b.uid) return -1;
                          if (a.uid > b.uid) return 1;
                          return 0;
                        })
                        .map(shop => (
                          <option
                            value={richText(shop.data.title)}
                            key={shop.uid}
                          >
                            {richText(shop.data.title)}
                          </option>
                        ))}
                    </select>
                  </label>
                </Input>
              </FormLine>
              <FormLine>
                <Input>
                  <input
                    type="email"
                    name="email"
                    placeholder="Adresse e-mail"
                    value={email}
                    onChange={({ target }) => setEmail(target.value)}
                  />
                </Input>
              </FormLine>
              <FormLine>
                <Input>
                  <textarea
                    name="message"
                    id="message"
                    cols="30"
                    rows="10"
                    placeholder="Message"
                    value={message}
                    onChange={({ target }) => setMessage(target.value)}
                  />
                </Input>
              </FormLine>

              <ReCAPTCHA
                ref={recaptchaRef}
                size="invisible"
                sitekey={RECAPTCHA_PUBLIC}
                onChange={token => sendMessage(token)}
                onExpired={() => setReCaptchaState('expired')}
                onErrored={() => setReCaptchaState('error')}
              />

              {formValid !== true ? (
                <p>
                  {typeof formValid === 'string'
                    ? formValid
                    : 'Veuillez remplir tous les champs du formulaire'}
                </p>
              ) : null}

              {formState === 'error' ? (
                <p className="form__error">
                  Impossible d'envoyer le message pour le moment, nous nous
                  excusons du dérangement.
                </p>
              ) : null}

              {formState !== 'success' && reCaptchaState === 'expired' ? (
                <p className="form__error">
                  La validation anti-robot a expiré.
                </p>
              ) : null}

              {reCaptchaState === 'error' ? (
                <p className="form__error">
                  Une erreur est survenu lors de la validation anti-robot.
                </p>
              ) : null}

              {formState !== 'success' ? (
                <Button
                  type="submit"
                  large
                  disabled={
                    formValid !== true ||
                    formState === 'loading' ||
                    formState === 'recaptcha-executing'
                      ? true
                      : null
                  }
                  loading={
                    formState === 'loading' ||
                    formState === 'recaptcha-executing'
                  }
                >
                  Envoyer le message
                </Button>
              ) : (
                <p>
                  Merci pour votre message, nous y répondrons dans les plus
                  brefs délais.
                </p>
              )}
            </Form>

            <div className="contact__side">
              <h1>{richText(content.primary.right_title)}</h1>

              {RichText.render(content.primary.right_content, linkResolver)}

              <img
                src={require('../../static/illustration/contact.png')}
                srcSet={require('../../static/illustration/contact.svg')}
                alt="Illustration de deux personnes communiquant par ordinateur"
                draggable="false"
              />
            </div>
          </div>
        </MaxWidth>
      </div>
    </div>
  );
};

export default Contact;
