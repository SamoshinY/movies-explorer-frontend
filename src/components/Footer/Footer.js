import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer__caption">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="footer__line"></div>
      <div className="footer__wrap">
        <p className="footer__copyright">
          &copy;&nbsp;<time>{new Date().getFullYear()}</time>
        </p>
        <ul className="footer__links">
          <li className="footer__item">
            <a
              href="https://practicum.yandex.ru"
              target="_blank"
              rel="noreferrer"
              className="footer__link"
            >
              Яндекс.Практикум
            </a>
          </li>
          <li className="footer__item">
            <a
              href="https://github.com/SamoshinY"
              target="_blank"
              rel="noreferrer"
              className="footer__link"
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
