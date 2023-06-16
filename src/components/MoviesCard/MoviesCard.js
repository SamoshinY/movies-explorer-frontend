import './MoviesCard.css';
import { useState } from 'react';

const MoviesCard = ({ movie, inSavedList, deleteMovie }) => {
  const [isSaved, setIsSaved] = useState(false);

  const toggleSaved = () => {
    setIsSaved(!isSaved);
  };

  const handleDeleteMovie = () => {
    deleteMovie(movie);
    console.log(movie._id);
  };

  const movieButtonClassName = !inSavedList
    ? `movies-card__save ${isSaved && 'movies-card__save_active'}`
    : 'movies-card__delete';

  return (
    <article className="movies-card">
      <img
        className="movies-card__image"
        src={movie.image}
        alt={movie.nameRU}
      />
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
