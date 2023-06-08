import './Navigation.css';
import profile from '../../images/profile_icon.svg';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="Navigation">
      <nav className="Navigation__wrap">
        <Link to="/movies" className="Navigation__movies-link">
          Фильмы
        </Link>
        <Link
          to="/saved-movies"
          className="Navigation__movies-link Navigation__movies-link_saved"
        >
          Сохраненные фильмы
        </Link>
      </nav>

      <Link to="/profile" className="Navigation__profile-link">
        Аккаунт
        <div className="Navigation__profile-icon-wrap">
          <img
            src={profile}
            className="Navigation__profile-icon"
            alt="Войти в профиль"
          ></img>
        </div>
      </Link>
    </nav>
  );
};

export default Navigation;
