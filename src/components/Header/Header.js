import './Header.css';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Logo from '../Logo/Logo';
import AuthNav from '../AuthNav/AuthNav';
import Navigation from '../Navigation/Navigation';
import BurgerMenu from '../BurgerMenu/BurgerMenu';

const Header = ({ loggedIn }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleBurgerClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header
      className={
        location.pathname === '/' ? 'header header_inLanding' : 'header'
      }
    >
      <Logo />
      {!loggedIn ? (
        <AuthNav />
      ) : (
        <>
          <Navigation isOpen={isOpen} handleClick={handleBurgerClick} />
          <BurgerMenu
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            handleClick={handleBurgerClick}
          />
        </>
      )}
    </header>
  );
};

export default Header;
