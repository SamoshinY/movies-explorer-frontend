import './MoviesCard.css';
import { useState } from 'react';

const MoviesCard = ({ movie, inSavedList, deleteMovie }) => {
  const [isSaved, setIsSaved] = useState(false);

  const toggleSaved = () => {
    setIsSaved(!isSaved);
  };

  const handleDeleteMovie = () => {
    deleteMovie(movie);
    console.log(movie.id);
  };

  const movieButtonClassName = !inSavedList
    ? `movies-card__save ${isSaved && 'movies-card__save_active'}`
    : 'movies-card__delete';

  const BASE_URL = 'https://api.nomoreparties.co';

  const imageUrl = `${BASE_URL}${movie.image.url}`;

  return (
    <article className="movies-card" aria-label="Карточка фильма">
      <img className="movies-card__image" src={imageUrl} alt={movie.nameRU} />
      <div className="movies-card__wrap">
        <p className="movies-card__title">{movie.nameRU}</p>
        <button
          className={movieButtonClassName}
          onClick={!inSavedList ? toggleSaved : handleDeleteMovie}
        ></button>
        <p className="movies-card__duration">{movie.duration}</p>
      </div>
    </article>
  );
};

export default MoviesCard;
