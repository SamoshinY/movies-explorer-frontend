import './AboutMe.css';
import Bender from '../../images/Bender.jpg';

const AboutMe = () => {
  return (
    <section id="about-me" className="aboutMe">
      <h2 className="aboutMe__title">Студент</h2>
      <div className="aboutMe__line"></div>
      <div className="aboutMe__wrap">
        <div className="aboutMe__column">
          <p className="aboutMe__name">Bender</p>
          <p className="aboutMe__short-description">
            Web-developer, 9&nbsp;лет
          </p>
          <p className="aboutMe__description">
            Строю свой парк с&nbsp;блэкджеком и&nbsp;шлюхами. увайуапу5н3234к
            йууацуа цуука2цкацаа цуаацауацрео нголенке5 ГРРЩщушоващув шорощр
            нпанеанва6к кв каяс рмиг ыацутаоцуаро грш8нп п7епауевп злзщшошц
            гнпеука5уа НГПЕ гнпвнгп гПгпгуцвздбх. дщлщрг sdcfsdefwew fsdrfgete
          </p>
          <a
            href="https://github.com/SamoshinY"
            target="_blank"
            className="aboutMe__github-link"
            rel="noreferrer"
          >
            Github
          </a>
        </div>
        <img src={Bender} className="aboutMe__photo" alt="Фото студента"></img>
      </div>
    </section>
  );
};

export default AboutMe;
