import './Login.css';
import Auth from '../Auth/Auth';

const Login = ({ onLogin, errorText, setErrorText }) => {
  return (
    <main className="login">
      <Auth
        greeting={'Рады видеть!'}
        textButton={'Войти'}
        textAuth={'Ещё не зарегистрированы?'}
        textLink={'Регистрация'}
        link={'/signup'}
        onAuthorize={onLogin}
        errorText={errorText}
        setErrorText={setErrorText}
      />
    </main>
  );
};

export default Login;
