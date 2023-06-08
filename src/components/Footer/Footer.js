import './Footer.css';

const Footer = () => {
  return (
    <footer className="Footer">
      <p className="Footer__caption">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="Footer__line"></div>
      <div className="Footer__wrap">
        <p className="Footer__copyright">
          &copy;&nbsp;<time>{new Date().getFullYear()}</time>
        </p>
        <ul className="Footer__links">
          <li className="Footer__item">
            <a
              href="https://practicum.yandex.ru"
              target="_blank"
              rel="noreferrer"
              className="Footer__link"
            >
              Яндекс.Практикум
            </a>
          </li>
          <li className="Footer__item">
            <a
              href="https://github.com/SamoshinY"
              target="_blank"
              rel="noreferrer"
              className="Footer__link"
            >
              Github
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
