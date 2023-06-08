import './AboutMe.css';
import me from '../../images/me.jpg';

const AboutMe = () => {
  return (
    <section id="about-me" className="AboutMe">
      <h2 className="AboutMe__title">Студент</h2>
      <div className="AboutMe__line"></div>
      <div className="AboutMe__wrap">
        <div className="AboutMe__column">
          <p className="AboutMe__name">Bender</p>
          <p className="AboutMe__short-description">
            Web-developer, 9&nbsp;лет
          </p>
          <p className="AboutMe__description">
            Строю свой парк с&nbsp;блэкджеком и&nbsp;шлюхами
          </p>
          <a
            href="https://github.com/SamoshinY"
            target="_blank"
            className="AboutMe__github-link"
            rel="noreferrer"
          >
            Github
          </a>
        </div>
        <img src={me} className="AboutMe__photo" alt="Фото студента"></img>
      </div>
    </section>
  );
};

export default AboutMe;
