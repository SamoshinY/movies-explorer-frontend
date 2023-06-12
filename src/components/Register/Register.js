import './Register.css';
import Auth from '../Auth/Auth';
import HeaderOnlyLogo from '../Header/HeaderOnlyLogo/HeaderOnlyLogo';
import InputInAuth from '../InputInAuth/InputInAuth';

const Register = () => {
  return (
    <>
      <HeaderOnlyLogo />
      <section className="Register">
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
            minLength={2}
            maxLength={40}
            placeholder={''}
          />
        </Auth>
      </section>
    </>
  );
};

export default Register;
