import './MoviesCardList.css';
import Preloader from '../Preloader/Preloader';

const MoviesCardList = ({ cardList }) => {
  return (
    <section className="movies-card-list" aria-label="Карточки фильмов">
      {!cardList ? <Preloader /> : cardList}
    </section>
  );
};

export default MoviesCardList;
