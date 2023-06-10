import './HeaderInLanding.css';
import Logo from '../Logo/Logo';
import { Link } from 'react-router-dom';

const HeaderInLanding = () => {
  return (
    <header className="HeaderInLanding">
      <Logo />
      <Link to="/signup" className="HeaderInLanding__signup-link">
        Регистрация
      </Link>
      <Link to="/signin" className="HeaderInLanding__signin-button">
        Войти
      </Link>
    </header>
  );
};

export default HeaderInLanding;
