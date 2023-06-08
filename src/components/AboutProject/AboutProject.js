import './AboutProject.css';

const AboutProject = () => {
  return (
    <section id="about-project" className="AboutProject">
      <h2 className="AboutProject__title">О проекте</h2>
      <div className="AboutProject__line"></div>
      <div className="AboutProject__wrap">
        <div className="AboutProject__column">
          <p className="AboutProject__column-subtitle">
            Дипломный проект включал 5&nbsp;этапов
          </p>
          <p className="AboutProject__column-text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и&nbsp;финальные доработки.
          </p>
        </div>
        <div className="AboutProject__column">
          <p className="AboutProject__column-subtitle">
            На&nbsp;выполнение диплома ушло 5&nbsp;недель
          </p>
          <p className="AboutProject__column-text">
            У&nbsp;каждого этапа был мягкий и&nbsp;жёсткий дедлайн, которые
            нужно было соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="AboutProject__scale">
        <div className="AboutProject__scale-backend">1 неделя</div>
        <div className="AboutProject__scale-frontend">4 недели</div>
        <p className="AboutProject__scale-сaption">Back-end</p>
        <p className="AboutProject__scale-сaption">Front-end</p>
      </div>
    </section>
  );
};

export default AboutProject;
