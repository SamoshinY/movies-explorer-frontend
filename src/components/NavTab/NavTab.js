import './NavTab.css';

const NavTab = () => {
  return (
    <nav className="nav-tab">
      <ul className="nav-tab__wrap">
        <li>
          <a className="nav-tab__link" href="#about-project">
            О проекте
          </a>
        </li>
        <li>
          <a className="nav-tab__link" href="#techs">
            Технологии
          </a>
        </li>
        <li>
          <a className="nav-tab__link" href="#about-me">
            Студент
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default NavTab;
