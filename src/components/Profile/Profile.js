import './Profile.css';
import { useEffect } from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import InputInProfile from '../InputInProfile/InputInProfile';

const Profile = ({ onEdit, onLogOut, messageText, setMessageText }) => {
  const currentUser = useContext(CurrentUserContext);
  const {
    values,
    isValid,
    resetForm,
    setIsValid,
    handleChange,
    errors,
    setValues,
  } = useFormAndValidation();

  const isDifferent =
    values.name !== currentUser.name || values.email !== currentUser.email;

  const handleEditClick = () => {
    isDifferent
      ? setMessageText('Сохранить изменения?')
      : setMessageText('Вы не внесли изменения!');
  };

  useEffect(() => {
    setMessageText('');
  }, [setMessageText, values]);

  useEffect(() => {
    resetForm();
    setValues({
      name: currentUser.name,
      email: currentUser.email,
    });
    setIsValid(false);
  }, [resetForm, setIsValid, setValues, currentUser]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
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
            />
          </fieldset>
          <div className="profile__wrapper">
            {messageText && (
              <span
                className={`profile__resultText ${
                  messageText === 'Данные успешно изменены!' &&
                  'profile__resultText_successful'
                }`}
              >
                {messageText}
              </span>
            )}
            {messageText && (
              <button
                className={`profile__save-button 
          ${
            messageText !== 'Сохранить изменения?' &&
            'profile__save-button_disabled'
          }
          `}
                type="submit"
                disabled={
                  messageText !== 'Сохранить изменения?' || !isDifferent
                }
              >
                Сохранить
              </button>
            )}
          </div>
        </form>
        {!messageText && (
          <button
            className={`profile__edit-button ${
              (!isValid || !isDifferent) && 'profile__edit-button_disabled'
            }`}
            disabled={!isValid || !isDifferent}
            type="button"
            onClick={handleEditClick}
          >
            Редактировать
          </button>
        )}
        {!messageText && (
          <Link to="/" className="profile__logout-button" onClick={onLogOut}>
            Выйти из аккаунта
          </Link>
        )}
      </div>
    </main>
  );
};

export default Profile;
