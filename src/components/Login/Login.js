import './Login.css';
import Auth from '../Auth/Auth';

const Login = ({ onLogin }) => {
  return (
    <main className="login">
      <Auth
        greeting={'Рады видеть!'}
        textButton={'Войти'}
        textAuth={'Ещё не зарегистрированы?'}
        textLink={'Регистрация'}
        link={'/signup'}
        onAuthorize={onLogin}
      />
    </main>
  );
};

export default Login;
