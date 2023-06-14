import './Profile.css';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import currentUser from '../../utils/user';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import InputInProfile from '../InputInProfile/InputInProfile';

const Profile = ({ onEdit, resultText }) => {
  const { values, isValid, resetForm, setIsValid, handleChange, errors } =
    useFormAndValidation();

  useEffect(() => {
    resetForm();
    setIsValid(false);
  }, [resetForm, setIsValid]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onEdit(values);
  };

  return (
    <section className="Profile">
      <p className="Profile__greeting">Привет, {currentUser.name}!</p>
      <form className="Profile__form" onSubmit={handleSubmit}>
        <fieldset className="Profile__fieldset">
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
          <div className="Profile__line"></div>
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
        <button
          className={`Profile__edit-button ${
            !isValid && 'Profile__edit-button_disabled'
          }`}
          disabled={!isValid}
        >
          Редактировать
        </button>
        <span className="Profile__resultText">{resultText}</span>
        <button
          className={`Profile__save-button 
          ${!isValid && 'Profile__save-button_disabled'}
          `}
        >
          Сохранить
        </button>
      </form>
      {!isValid && (
        <Link to="/" className="Profile__logout-button">
          Выйти из аккаунта
        </Link>
      )}
    </section>
  );
};

export default Profile;
