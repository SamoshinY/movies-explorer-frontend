import './MoviesCardList.css';
import Preloader from '../Preloader/Preloader';

const MoviesCardList = ({ cardList, loading, messageText }) => {
  console.log(messageText);
  return (
    <div className="movies-card-list">
      {loading && <Preloader />}
      {!loading && (
        <section
          className="movies-card-list__content"
          aria-label="Карточки фильмов"
        >
          {cardList}
        </section>
      )}
      {!loading && !cardList.length && (
        <span className="movies-card-list__message">{messageText}</span>
      )}
    </div>
  );
};

export default MoviesCardList;
