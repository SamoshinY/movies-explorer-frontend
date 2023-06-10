import './Profile.css';
import { Link } from 'react-router-dom';
import currentUser from '../../utils/user';
import HeaderWithNavigation from '../HeaderWithNavigation/HeaderWithNavigation';

const Profile = () => {
  return (
    <>
      <HeaderWithNavigation />
      <section className="Profile">
        <p className="Profile__greeting">Привет, {currentUser.name}!</p>
        <form className="Profile__form">
          <fieldset className="Profile__fieldset">
            <div className="Profile__wrap">
              <p className="Profile__caption">Имя</p>
              <input
                className="Profile__input"
                type="text"
                name="name"
                placeholder="Имя"
                value={currentUser.name || ''}
              ></input>
            </div>
            <div className="Profile__line"></div>
            <div className="Profile__wrap">
              <p className="Profile__caption">E-mail</p>
              <input
                className="Profile__input"
                type="email"
                name="email"
                placeholder="E-mail"
                value={currentUser.email || ''}
              ></input>
            </div>
          </fieldset>
          <button className="Profile__edit-button">Редактировать</button>
        </form>
        <Link to="/" className="Profile__logout-button">
          Выйти из аккаунта
        </Link>
      </section>
    </>
  );
};

export default Profile;
