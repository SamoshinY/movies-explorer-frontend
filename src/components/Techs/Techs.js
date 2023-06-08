import './Techs.css';

const Techs = () => {
  return (
    <section id="techs" className="Techs">
      <h2 className="Techs__title">Технологии</h2>
      <div className="Techs__line"></div>
      <p className="Techs__subtitle">7&nbsp;технологий</p>
      <p className="Techs__text">
        На&nbsp;курсе веб-разработки мы&nbsp;освоили технологии, которые
        применили в&nbsp;дипломном проекте.
      </p>
      <ul className="Techs__icons">
        <li className="Techs__icon">HTML</li>
        <li className="Techs__icon">CSS</li>
        <li className="Techs__icon">JS</li>
        <li className="Techs__icon">React</li>
        <li className="Techs__icon">Git</li>
        <li className="Techs__icon">Express.js</li>
        <li className="Techs__icon">mongoDB</li>
      </ul>
    </section>
  );
};

export default Techs;
