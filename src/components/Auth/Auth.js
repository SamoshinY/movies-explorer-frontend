import './Auth.css';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import InputInAuth from '../InputInAuth/InputInAuth';
import Logo from '../Logo/Logo';

const Auth = ({
  children,
  greeting,
  textButton,
  textAuth,
  textLink,
  link,
  onAuthorize,
}) => {
  const { values, isValid, resetForm, setIsValid, handleChange, errors } =
    useFormAndValidation();

  useEffect(() => {
    resetForm();
    setIsValid(false);
  }, [resetForm, setIsValid]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onAuthorize(values);
  };

  return (
    <>
      <section className="auth">
        <Logo />
        <p className="auth__greeting">{greeting}</p>
        <form className="auth__form" onSubmit={handleSubmit}>
          <fieldset className="auth__fieldset">
            {children}
            <InputInAuth
              inputName={'email'}
              labelCaption={'E-mail'}
              handleChange={handleChange}
              values={values}
              errors={errors}
              minLength={4}
              maxLength={40}
              placeholder={'Введите email'}
              required
            />
            <InputInAuth
              inputName={'password'}
              labelCaption={'Пароль'}
              handleChange={handleChange}
              values={values}
              errors={errors}
              minLength={4}
              maxLength={40}
              placeholder={'Введите пароль'}
              required
            />
          </fieldset>
          <button
            type="submit"
            className={`auth__submit-button ${
              !isValid && 'auth__submit-button_disabled'
            }`}
            disabled={!isValid}
          >
            {textButton}
          </button>
        </form>
        <div className="auth__auth-text">
          {textAuth}
          <Link to={link} className="auth__link-text">
            {textLink}
          </Link>
        </div>
      </section>
    </>
  );
};

export default Auth;
