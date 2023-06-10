import './Auth.css';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';

const Auth = ({
  children,
  greeting,
  textButton,
  textAuth,
  textLink,
  link,
  onAuthorize,
}) => {
  const { values, handleChange, errors, isValid, resetForm, setIsValid } =
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
    <section className="Auth">
      <p className="Auth__greeting">{greeting}</p>
      <form className="Auth__form" onSubmit={handleSubmit}>
        <fieldset className="Auth__fieldset">
          {children}
          <label className="Auth__label">E-mail</label>
          <input
            id="email-input"
            type="email"
            name="email"
            placeholder=""
            className={`Auth__input Auth__input_text_email" ${
              errors.email && 'Auth__input_type_error'
            }`}
            required
            minLength="2"
            maxLength="40"
            onChange={handleChange}
            value={values.email || ''}
          />
          <span className="email-input-error Auth__input-error">
            {errors.email || ''}
          </span>
          <label className="Auth__label">Пароль</label>
          <input
            id="password-input"
            type="password"
            name="password"
            placeholder=""
            className={`Auth__input Auth__input_text_password" ${
              errors.password && 'Auth__input_type_error'
            }`}
            required
            minLength="4"
            maxLength="200"
            onChange={handleChange}
            value={values.password || ''}
          />
          <span className="password-input-error Auth__input-error">
            {errors.password || ''}
          </span>
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
