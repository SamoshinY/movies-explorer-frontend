import './Navigation.css';
import profile from '../../images/profile_icon.svg';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="Navigation">
      <nav className="Navigation__wrap">
        <NavLink
          to="/movies"
          className={({ isActive }) =>
            `Navigation__movies-link ${
              isActive ? 'Navigation__movies-link_active' : ''
            }`
          }
        >
          Фильмы
        </NavLink>
        <NavLink
          to="/saved-movies"
          className={({ isActive }) =>
            `Navigation__movies-link ${
              isActive ? 'Navigation__movies-link_active' : ''
            }`
          }
        >
          Сохраненные фильмы
        </NavLink>
      </nav>

      <NavLink to="/profile" className="Navigation__profile-link">
        Аккаунт
        <div className="Navigation__profile-icon-wrap">
          <img
            src={profile}
            className="Navigation__profile-icon"
            alt="Войти в профиль"
          ></img>
        </div>
      </NavLink>
    </nav>
  );
};

export default Navigation;
