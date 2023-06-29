import './MoviesCardList.css';

const MoviesCardList = ({ cardList }) => {
  return (
    <section className="movies-card-list" aria-label="Карточки фильмов">
      {cardList}
    </section>
  );
};

export default MoviesCardList;
