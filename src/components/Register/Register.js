import './Register.css';
import Auth from '../Auth/Auth';
import InputInAuth from '../InputInAuth/InputInAuth';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';

const Register = () => {
  const { values, handleChange, errors } = useFormAndValidation();
  return (
    <section className="register">
      <Auth
        greeting={'Добро пожаловать!'}
        textButton={'Зарегистрироваться'}
        textAuth={'Уже зарегистрированы?'}
        textLink={'Войти'}
        link={'/signin'}
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
    </section>
  );
};

export default Register;
