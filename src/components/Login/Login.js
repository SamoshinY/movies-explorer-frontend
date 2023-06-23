import './Login.css';
import Auth from '../Auth/Auth';

const Login = ({ onLogin, messageText, setMessageText }) => {
  return (
    <main className="login">
      <Auth
        greeting={'Рады видеть!'}
        textButton={'Войти'}
        textAuth={'Ещё не зарегистрированы?'}
        textLink={'Регистрация'}
        link={'/signup'}
        onAuthorize={onLogin}
        messageText={messageText}
        setMessageText={setMessageText}
      />
    </main>
  );
};

export default Login;
