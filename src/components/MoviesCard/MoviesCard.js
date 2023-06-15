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
    ? `moviesCard__save ${isSaved && 'moviesCard__save_active'}`
    : 'moviesCard__delete';

  return (
    <article className="MoviesCard">
      <img className="moviesCard__image" src={movie.image} alt={movie.nameRU} />
      <div className="moviesCard__wrap">
        <p className="moviesCard__title">{movie.nameRU}</p>
        <button
          className={movieButtonClassName}
          onClick={!inSavedList ? toggleSaved : handleDeleteMovie}
        ></button>
        <p className="moviesCard__duration">{movie.duration}</p>
      </div>
    </article>
  );
};

export default MoviesCard;
