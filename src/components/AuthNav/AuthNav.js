import './AuthNav.css';
import { Link } from 'react-router-dom';

const AuthNav = () => {
  return (
    <nav className="auth-nav">
      <Link to="/signup" className="auth-nav__signup-link">
        Регистрация
      </Link>
      <Link to="/signin" className="auth-nav__signin-button">
        Войти
      </Link>
    </nav>
  );
};

export default AuthNav;
