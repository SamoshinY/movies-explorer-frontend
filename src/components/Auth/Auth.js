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
  name,
  onAuthorize,
  errorText,
  setErrorText,
}) => {
  const { values, isValid, resetForm, setIsValid, handleChange, errors } =
    useFormAndValidation();

  if (name) {
    values.name = name.name;
  }

  useEffect(() => {
    setErrorText('');
  }, [setErrorText, values]);

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
      <section
        className="auth"
        aria-label="шаблон для регистрации и авторизации"
      >
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
          <div className="auth__wrap">
            <span className="auth__error-text">{errorText}</span>
            <button
              type="submit"
              className={`auth__submit-button ${
                !isValid && 'auth__submit-button_disabled'
              }`}
              disabled={!isValid}
            >
              {textButton}
            </button>
          </div>
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
