import './Login.css';
import Auth from '../Auth/Auth';
import HeaderOnlyLogo from '../Header/HeaderOnlyLogo/HeaderOnlyLogo';

const Login = () => {
  return (
    <>
      <HeaderOnlyLogo />
      <section className="Login">
        <Auth
          greeting={'Рады видеть!'}
          textButton={'Войти'}
          textAuth={'Ещё не зарегистрированы?'}
          textLink={'Регистрация'}
          link={'/signup'}
        />
      </section>
    </>
  );
};

export default Login;
