import './NotFound.css';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <section className="NotFound">
      <h1 className="NotFound__404">404</h1>
      <p className="NotFound__text">Страница не найдена</p>
      <Link to="/" className="NotFound__back-link">
        Назад
      </Link>
    </section>
  );
};

export default NotFound;
