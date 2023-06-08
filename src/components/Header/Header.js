import './Header.css';
import { Link, Route, Routes } from 'react-router-dom';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';

const Header = () => {
  return (
    <header className="Header">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Logo />
              <Link to="/signup" className="Header__signup-link">
                Регистрация
              </Link>
              <Link to="/signin" className="Header__signin-button">
                Войти
              </Link>
            </>
          }
        />
        <Route
          path="/movies"
          element={
            <>
              <Logo />
              <Navigation />
            </>
          }
        />
        <Route
          path="/saved-movies"
          element={
            <>
              <Logo />
              <Navigation />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <Logo />
              <Navigation />
            </>
          }
        />
        <Route
          path="/signup"
          element={
            <div className="Header__wrap">
              <Logo />
            </div>
          }
        />
        <Route
          path="/signin"
          element={
            <div className="Header__wrap">
              <Logo />
            </div>
          }
        />
      </Routes>
    </header>
  );
};

export default Header;
