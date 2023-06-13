import './Login.css';
import Auth from '../Auth/Auth';

const Login = () => {
  return (
    <section className="Login">
      <Auth
        greeting={'Рады видеть!'}
        textButton={'Войти'}
        textAuth={'Ещё не зарегистрированы?'}
        textLink={'Регистрация'}
        link={'/signup'}
      />
    </section>
  );
};

export default Login;
