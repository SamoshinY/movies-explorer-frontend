import './Navigation.css';
import profile from '../../images/profile_icon.svg';
import { NavLink } from 'react-router-dom';

const Navigation = ({ isOpen, handleClick }) => {
  return (
    <section className={`Navigation ${isOpen && 'Navigation_active'}`}>
      <nav
        className={`Navigation__container ${
          isOpen && 'Navigation__container_active'
        }`}
      >
        <div className="Navigation__wrap">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `Navigation__main-link ${
                isActive ? 'Navigation__main-link_active' : ''
              }`
            }
            onClick={handleClick}
          >
            Главная
          </NavLink>
          <NavLink
            to="/movies"
            className={({ isActive }) =>
              `Navigation__link ${isActive ? 'Navigation__link_active' : ''}`
            }
            onClick={handleClick}
          >
            Фильмы
          </NavLink>
          <NavLink
            to="/saved-movies"
            className={({ isActive }) =>
              `Navigation__link ${isActive ? 'Navigation__link_active' : ''}`
            }
            onClick={handleClick}
          >
            Сохраненные фильмы
          </NavLink>
        </div>

        <NavLink
          to="/profile"
          className="Navigation__profile-link"
          onClick={handleClick}
        >
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
    </section>
  );
};

export default Navigation;
