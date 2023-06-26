import './MoviesCard.css';
import { useLocation } from 'react-router-dom';

const MoviesCard = ({
  card,
  onCardLike,
  isLiked,
  // onCardClick,
}) => {
  const location = useLocation();
  // const handleCardClick = () => {
  //   onCardClick(card);
  // };

  const handleCardLike = () => {
    onCardLike(card, isLiked);
  };

  return (
    <article className="movies-card" aria-label="Карточка фильма">
      <img
        className="movies-card__image"
        src={card.image}
        alt={card.nameRU}
        // onClick={handleCardClick}
      />
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
        <p className="movies-card__duration">{card.duration}</p>
      </div>
    </article>
  );
};

export default MoviesCard;
