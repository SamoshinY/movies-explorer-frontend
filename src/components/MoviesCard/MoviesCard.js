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
    ? `MoviesCard__save ${isSaved && 'MoviesCard__save_active'}`
    : 'MoviesCard__delete';

  return (
    <article className="MoviesCard">
      <img className="MoviesCard__image" src={movie.image} alt={movie.nameRU} />
      <div className="MoviesCard__wrap">
        <p className="MoviesCard__title">{movie.nameRU}</p>
        <button
          className={movieButtonClassName}
          onClick={!inSavedList ? toggleSaved : handleDeleteMovie}
        ></button>
        <p className="MoviesCard__duration">{movie.duration}</p>
      </div>
    </article>
  );
};

export default MoviesCard;
