import './Profile.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import currentUser from '../../utils/user';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import InputInProfile from '../InputInProfile/InputInProfile';

const Profile = ({ errorMessage }) => {
  const { values, isValid, resetForm, setIsValid, handleChange, errors } =
    useFormAndValidation();

  const [resultText, setResultText] = useState('');

  const isDifferent = values !== currentUser;

  const handleEditClick = () => {
    isDifferent
      ? setResultText('Сохранить изменения?')
      : setResultText('Вы не внесли изменения!');
  };

  useEffect(() => {
    resetForm();
    setIsValid(false);
  }, [resetForm, setIsValid]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setResultText(errorMessage ? errorMessage : '');
  };

  return (
    <section className="profile">
      <p className="profile__greeting">Привет, {currentUser.name}!</p>
      <div className="profile__wrap">
        <form className="profile__form" onSubmit={handleSubmit}>
          <fieldset className="profile__fieldset">
            <InputInProfile
              inputName={'name'}
              labelCaption={'Имя'}
              handleChange={handleChange}
              values={values}
              errors={errors}
              minLength={2}
              maxLength={40}
              placeholder={currentUser.name || ''}
            />
            <div className="profile__line"></div>
            <InputInProfile
              inputName={'email'}
              labelCaption={'E-mail'}
              handleChange={handleChange}
              values={values}
              errors={errors}
              minLength={4}
              maxLength={40}
              placeholder={currentUser.email || ''}
            />
          </fieldset>
          <div className="profile__wrap">
            {resultText && (
              <span className="profile__resultText">{resultText}</span>
            )}
            {resultText && (
              <button
                className={`profile__save-button 
          ${errorMessage && 'profile__save-button_disabled'}
          `}
                disabled={errorMessage || !isDifferent}
              >
                Сохранить
              </button>
            )}
          </div>
        </form>
        {!resultText && (
          <button
            className={`profile__edit-button ${
              !isValid && 'profile__edit-button_disabled'
            }`}
            disabled={!isValid}
            type="button"
            onClick={handleEditClick}
          >
            Редактировать
          </button>
        )}
        {!resultText && (
          <Link to="/" className="profile__logout-button">
            Выйти из аккаунта
          </Link>
        )}
      </div>
    </section>
  );
};

export default Profile;
