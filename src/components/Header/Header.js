import './Header.css';
import { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Logo from '../Logo/Logo';
import AuthNav from '../AuthNav/AuthNav';
import Navigation from '../Navigation/Navigation';
import BurgerMenu from '../BurgerMenu/BurgerMenu';

const Header = () => {
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
      <Routes>
        <Route path="/" element={<AuthNav />} />
        <Route
          path="/movies"
          element={
            <Navigation isOpen={isOpen} handleClick={handleBurgerClick} />
          }
        />
        <Route
          path="/saved-movies"
          element={
            <Navigation isOpen={isOpen} handleClick={handleBurgerClick} />
          }
        />
        <Route
          path="/profile"
          element={
            <Navigation isOpen={isOpen} handleClick={handleBurgerClick} />
          }
        />
      </Routes>
      {location.pathname !== '/' && (
        <BurgerMenu
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          handleClick={handleBurgerClick}
        />
      )}
    </header>
  );
};

export default Header;
