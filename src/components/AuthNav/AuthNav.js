import './AuthNav.css';
import { Link } from 'react-router-dom';

const AuthNav = () => {
  return (
    <nav className="AuthNav">
      <Link to="/signup" className="AuthNav__signup-link">
        Регистрация
      </Link>
      <Link to="/signin" className="AuthNav__signin-button">
        Войти
      </Link>
    </nav>
  );
};

export default AuthNav;
