import './MoviesCard.css';
import { useLocation } from 'react-router-dom';
import { toHoursAndMinutes } from '../../utils/utils';

const MoviesCard = ({ card, onCardLike, isLiked }) => {
  const location = useLocation();

  const handleCardLike = () => {
    onCardLike(card, isLiked);
  };

  return (
    <article className="movies-card" aria-label="Карточка фильма">
      <a
        className="movies-card__link"
        target="_blank"
        rel="noreferrer"
        href={card.trailer}
      >
        <img
          className="movies-card__image"
          src={card.image}
          alt={card.nameRU}
        />
      </a>
      <div className="movies-card__wrap">
        <p className="movies-card__title">{card.nameRU}</p>
        <button
          className={
            location.pathname !== '/saved-movies'
              ? `movies-card__save ${isLiked && 'movies-card__save_active'}`
              : 'movies-card__delete'
          }
          onClick={handleCardLike}
        ></button>
        <p className="movies-card__duration">
          {toHoursAndMinutes(card.duration)}
        </p>
      </div>
    </article>
  );
};

export default MoviesCard;
