import './NotFound.css';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <main className="not-found">
      <h1 className="not-found__404">404</h1>
      <p className="not-found__text">Страница не найдена</p>
      <Link to="/" className="not-found__back-link">
        Назад
      </Link>
    </main>
  );
};

export default NotFound;
