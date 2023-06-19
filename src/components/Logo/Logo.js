import './Logo.css';
import { Link } from 'react-router-dom';
import headerLogo from '../../images/logo.svg';

const Logo = () => {
  return (
    <Link to="/">
      <img className="logo" src={headerLogo} alt="Логотип проекта" />
    </Link>
  );
};

export default Logo;
