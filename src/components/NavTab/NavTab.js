import './NavTab.css';

const NavTab = () => {
  return (
    <nav className="navTab">
      <ul className="navTab__wrap">
        <li>
          <a className="navTab__link" href="#about-project">
            О проекте
          </a>
        </li>
        <li>
          <a className="navTab__link" href="#techs">
            Технологии
          </a>
        </li>
        <li>
          <a className="navTab__link" href="#about-me">
            Студент
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default NavTab;
