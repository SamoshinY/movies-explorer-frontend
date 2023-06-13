import './Header.css';
import { Route, Routes } from 'react-router-dom';
import Logo from '../Logo/Logo';
import AuthNav from '../AuthNav/AuthNav';
import Navigation from '../Navigation/Navigation';

const Header = () => {
  return (
    <header className="Header">
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
