import './AboutProject.css';

const AboutProject = () => {
  return (
    <section id="about-project" className="aboutProject">
      <h2 className="aboutProject__title">О проекте</h2>
      <div className="aboutProject__line"></div>
      <div className="aboutProject__wrap">
        <p className="aboutProject__column-subtitle">
          Дипломный проект включал 5&nbsp;этапов
        </p>
        <p className="aboutProject__column-text">
          Составление плана, работу над бэкендом, вёрстку, добавление
          функциональности и&nbsp;финальные доработки.
        </p>
        <p className="aboutProject__column-subtitle">
          На&nbsp;выполнение диплома ушло 5&nbsp;недель
        </p>
        <p className="aboutProject__column-text">
          У&nbsp;каждого этапа был мягкий и&nbsp;жёсткий дедлайн, которые нужно
          было соблюдать, чтобы успешно защититься.
        </p>
      </div>
      <div className="aboutProject__scale">
        <div className="aboutProject__scale-backend">1 неделя</div>
        <div className="aboutProject__scale-frontend">4 недели</div>
        <p className="aboutProject__scale-caption">Back-end</p>
        <p className="aboutProject__scale-caption">Front-end</p>
      </div>
    </section>
  );
};

export default AboutProject;
