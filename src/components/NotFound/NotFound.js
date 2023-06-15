import './NotFound.css';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <section className="notFound">
      <h1 className="notFound__404">404</h1>
      <p className="notFound__text">Страница не найдена</p>
      <Link to="/" className="notFound__back-link">
        Назад
      </Link>
    </section>
  );
};

export default NotFound;
