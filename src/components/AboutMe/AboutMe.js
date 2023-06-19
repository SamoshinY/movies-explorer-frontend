import './AboutMe.css';
import Bender from '../../images/Bender.jpg';

const AboutMe = () => {
  return (
    <section id="about-me" className="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__line"></div>
      <div className="about-me__wrap">
        <div className="about-me__column">
          <p className="about-me__name">Bender</p>
          <p className="about-me__short-description">
            Web-developer, 9&nbsp;лет
          </p>
          <p className="about-me__description">
            Строю свой парк с&nbsp;блэкджеком и&nbsp;шлюхами. увайуапу5н3234к
            йууацуа цуука2цкацаа цуаацауацрео нголенке5 ГРРЩщушоващув шорощр
            нпанеанва6к кв каяс рмиг ыацутаоцуаро грш8нп п7епауевп злзщшошц
            гнпеука5уа НГПЕ гнпвнгп гПгпгуцвздбх. дщлщрг sdcfsdefwew fsdrfgete
            fgrgregdfc
          </p>
          <a
            href="https://github.com/SamoshinY"
            target="_blank"
            className="about-me__github-link"
            rel="noreferrer"
          >
            Github
          </a>
        </div>
        <img src={Bender} className="about-me__photo" alt="Фото студента"></img>
      </div>
    </section>
  );
};

export default AboutMe;
