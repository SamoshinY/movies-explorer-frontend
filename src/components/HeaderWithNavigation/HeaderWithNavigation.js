import './HeaderWithNavigation.css';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';

const HeaderWithNavigation = () => {
  return (
    <header className="HeaderWithNavigation">
      <Logo />
      <Navigation />
    </header>
  );
};

export default HeaderWithNavigation;
