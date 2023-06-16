import './AboutProject.css';

const AboutProject = () => {
  return (
    <section id="about-project" className="about-project">
      <h2 className="about-project__title">О проекте</h2>
      <div className="about-project__line"></div>
      <div className="about-project__wrap">
        <p className="about-project__column-subtitle">
          Дипломный проект включал 5&nbsp;этапов
        </p>
        <p className="about-project__column-text">
          Составление плана, работу над бэкендом, вёрстку, добавление
          функциональности и&nbsp;финальные доработки.
        </p>
        <p className="about-project__column-subtitle">
          На&nbsp;выполнение диплома ушло 5&nbsp;недель
        </p>
        <p className="about-project__column-text">
          У&nbsp;каждого этапа был мягкий и&nbsp;жёсткий дедлайн, которые нужно
          было соблюдать, чтобы успешно защититься.
        </p>
      </div>
      <div className="about-project__scale">
        <div className="about-project__scale-backend">1 неделя</div>
        <div className="about-project__scale-frontend">4 недели</div>
        <span className="about-project__scale-caption">Back-end</span>
        <span className="about-project__scale-caption">Front-end</span>
      </div>
    </section>
  );
};

export default AboutProject;
