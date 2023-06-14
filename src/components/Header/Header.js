import './Header.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Logo from '../Logo/Logo';
import AuthNav from '../AuthNav/AuthNav';
import Navigation from '../Navigation/Navigation';

const Header = () => {
  const location = useLocation();

  return (
    <header
      className={`Header ${location.pathname === '/' && 'Header_inLanding'} `}
    >
      <Logo />
      <Routes>
        <Route path="/" element={<AuthNav />} />
        <Route path="/movies" element={<Navigation />} />
        <Route path="/saved-movies" element={<Navigation />} />
        <Route path="/profile" element={<Navigation />} />
      </Routes>
    </header>
  );
};

export default Header;
