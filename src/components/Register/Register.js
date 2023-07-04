import './Register.css';
import Auth from '../Auth/Auth';
import InputInAuth from '../InputInAuth/InputInAuth';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { useNavigate } from 'react-router-dom';

const Register = ({
  onRegister,
  messageText,
  setMessageText,
  loggedIn,
  loading,
}) => {
  const navigate = useNavigate();
  if (loggedIn) {
    navigate('/movies', { replace: true });
  }
  const { values, handleChange, errors } = useFormAndValidation();
  return (
    <main className="register">
      <Auth
        greeting={'Добро пожаловать!'}
        textButton={'Зарегистрироваться'}
        textAuth={'Уже зарегистрированы?'}
        textLink={'Войти'}
        link={'/signin'}
        name={values}
        onAuthorize={onRegister}
        messageText={messageText}
        setMessageText={setMessageText}
        loading={loading}
      >
        <InputInAuth
          inputName={'name'}
          labelCaption={'Имя'}
          handleChange={handleChange}
          values={values}
          errors={errors}
          minLength={2}
          maxLength={40}
          placeholder={'Введите имя'}
          required
        />
      </Auth>
    </main>
  );
};

export default Register;
