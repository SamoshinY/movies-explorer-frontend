import './Portfolio.css';

const Portfolio = () => {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <nav className="portfolio__links">
        <div className="portfolio__item">
          <a
            href="https://samoshiny.github.io/how-to-learn/"
            className="portfolio__link"
            target="_blank"
            rel="noreferrer"
          >
            Статичный сайт<div className="portfolio__arrow"></div>
          </a>
        </div>
        <div className="portfolio__line"></div>
        <div className="portfolio__item">
          <a
            href="https://samoshiny.github.io/russian-travel/"
            className="portfolio__link"
            target="_blank"
            rel="noreferrer"
          >
            Адаптивный сайт<div className="portfolio__arrow"></div>
          </a>
        </div>
        <div className="portfolio__line"></div>
        <div className="portfolio__item">
          <a
            href="https://samoshin.nomoredomains.monster"
            className="portfolio__link"
            target="_blank"
            rel="noreferrer"
          >
            Одностраничное приложение<div className="portfolio__arrow"></div>
          </a>
        </div>
      </nav>
    </section>
  );
};

export default Portfolio;
