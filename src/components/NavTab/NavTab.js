import './NavTab.css';

const NavTab = () => {
  return (
    <nav className="NavTab">
      <ul className="NavTab__wrap">
        <li>
          <a className="NavTab__link" href="#about-project">
            О проекте
          </a>
        </li>
        <li>
          <a className="NavTab__link" href="#techs">
            Технологии
          </a>
        </li>
        <li>
          <a className="NavTab__link" href="#about-me">
            Студент
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default NavTab;
