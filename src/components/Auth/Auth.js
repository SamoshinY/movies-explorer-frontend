import './Auth.css';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import InputInAuth from '../InputInAuth/InputInAuth';

const Auth = ({
  children,
  greeting,
  textButton,
  textAuth,
  textLink,
  link,
  onAuthorize,
}) => {
  const { values, isValid, resetForm, setIsValid } = useFormAndValidation();

  useEffect(() => {
    resetForm();
    setIsValid(false);
  }, [resetForm, setIsValid]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onAuthorize(values);
  };

  return (
    <section className="Auth">
      <p className="Auth__greeting">{greeting}</p>
      <form className="Auth__form" onSubmit={handleSubmit}>
        <fieldset className="Auth__fieldset">
          {children}
          <InputInAuth
            inputName={'email'}
            labelCaption={'E-mail'}
            minLength={4}
            maxLength={40}
            placeholder={''}
          />
          <InputInAuth
            inputName={'password'}
            labelCaption={'Пароль'}
            minLength={4}
            maxLength={40}
            placeholder={''}
          />
        </fieldset>
        <button
          type="submit"
          className={`Auth__submit-button ${
            !isValid && 'Auth__submit-button_disabled'
          }`}
          disabled={!isValid}
        >
          {textButton}
        </button>
      </form>
      <div className="Auth__auth-text">
        {textAuth}
        <Link to={link} className="Auth__link-text">
          {textLink}
        </Link>
      </div>
    </section>
  );
};

export default Auth;
