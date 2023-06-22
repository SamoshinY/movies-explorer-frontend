import './Profile.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import InputInProfile from '../InputInProfile/InputInProfile';

const Profile = ({ onEdit, onLogOut, errorMessage }) => {
  const currentUser = useContext(CurrentUserContext);
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
    onEdit(values);
  };

  return (
    <main className="profile" aria-label="Страница редактирования профиля">
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
          <div className="profile__wrapper">
            {resultText && (
              <span className="profile__resultText">{resultText}</span>
            )}
            {resultText && (
              <button
                className={`profile__save-button 
          ${errorMessage && 'profile__save-button_disabled'}
          `}
                type="submit"
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
          <Link to="/" className="profile__logout-button" onClick={onLogOut}>
            Выйти из аккаунта
          </Link>
        )}
      </div>
    </main>
  );
};

export default Profile;
