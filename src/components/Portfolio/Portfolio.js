import './Portfolio.css';

const Portfolio = () => {
  return (
    <section className="Portfolio">
      <h2 className="Portfolio__title">Портфолио</h2>
      <ul className="Portfolio__links">
        <li className="Portfolio__item">
          <a
            href="https://samoshiny.github.io/how-to-learn/"
            className="Portfolio__link"
            target="_blank"
            rel="noreferrer"
          >
            Статичный сайт<div className="Portfolio__arrow"></div>
          </a>
        </li>
        <div className="Portfolio__line"></div>
        <li className="Portfolio__item">
          <a
            href="https://samoshiny.github.io/russian-travel/"
            className="Portfolio__link"
            target="_blank"
            rel="noreferrer"
          >
            Адаптивный сайт<div className="Portfolio__arrow"></div>
          </a>
        </li>
        <div className="Portfolio__line"></div>
        <li className="Portfolio__item">
          <a
            href="https://samoshin.nomoredomains.monster"
            className="Portfolio__link"
            target="_blank"
            rel="noreferrer"
          >
            Одностраничное приложение<div className="Portfolio__arrow"></div>
          </a>
        </li>
      </ul>
    </section>
  );
};

export default Portfolio;
