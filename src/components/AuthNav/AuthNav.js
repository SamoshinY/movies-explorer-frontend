import './AuthNav.css';
import { Link } from 'react-router-dom';

const AuthNav = () => {
  return (
    <nav className="authNav">
      <Link to="/signup" className="authNav__signup-link">
        Регистрация
      </Link>
      <Link to="/signin" className="authNav__signin-button">
        Войти
      </Link>
    </nav>
  );
};

export default AuthNav;
