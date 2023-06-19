import './Techs.css';

const Techs = () => {
  return (
    <section id="techs" className="techs">
      <h2 className="techs__title">Технологии</h2>
      <div className="techs__line"></div>
      <p className="techs__subtitle">7&nbsp;технологий</p>
      <p className="techs__text">
        На&nbsp;курсе веб-разработки мы&nbsp;освоили технологии, которые
        применили в&nbsp;дипломном проекте.
      </p>
      <ul className="techs__icons">
        <li className="techs__icon">HTML</li>
        <li className="techs__icon">CSS</li>
        <li className="techs__icon">JS</li>
        <li className="techs__icon">React</li>
        <li className="techs__icon">Git</li>
        <li className="techs__icon">Express.js</li>
        <li className="techs__icon">mongoDB</li>
      </ul>
    </section>
  );
};

export default Techs;
