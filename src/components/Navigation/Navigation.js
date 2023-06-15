import './Navigation.css';
import profile from '../../images/profile_icon.svg';
import { NavLink } from 'react-router-dom';

const Navigation = ({ isOpen, handleClick }) => {
  return (
    <section className={`navigation ${isOpen && 'navigation_active'}`}>
      <nav
        className={`navigation__container ${
          isOpen && 'navigation__container_active'
        }`}
      >
        <div className="navigation__wrap">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `navigation__main-link ${
                isActive ? 'navigation__main-link_active' : ''
              }`
            }
            onClick={handleClick}
          >
            Главная
          </NavLink>
          <NavLink
            to="/movies"
            className={({ isActive }) =>
              `navigation__link ${isActive ? 'navigation__link_active' : ''}`
            }
            onClick={handleClick}
          >
            Фильмы
          </NavLink>
          <NavLink
            to="/saved-movies"
            className={({ isActive }) =>
              `navigation__link ${isActive ? 'navigation__link_active' : ''}`
            }
            onClick={handleClick}
          >
            Сохраненные фильмы
          </NavLink>
        </div>

        <NavLink
          to="/profile"
          className="navigation__profile-link"
          onClick={handleClick}
        >
          Аккаунт
          <div className="navigation__profile-icon-wrap">
            <img
              src={profile}
              className="navigation__profile-icon"
              alt="Войти в профиль"
            ></img>
          </div>
        </NavLink>
      </nav>
    </section>
  );
};

export default Navigation;
