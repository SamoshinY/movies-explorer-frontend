import './Login.css';
import Auth from '../Auth/Auth';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin, messageText, setMessageText, loggedIn }) => {
  const navigate = useNavigate();
  if (loggedIn) {
    navigate('/movies', { replace: true });
  }
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
