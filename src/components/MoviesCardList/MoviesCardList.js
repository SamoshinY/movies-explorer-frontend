import './MoviesCardList.css';

const MoviesCardList = ({ cardList, buttonVisible }) => {
  return (
    <section className="MoviesCardList">
      <div className="MoviesCardList__movies-grid" aria-label="Фильмы">
        {cardList}
      </div>
      {buttonVisible && <button className="MoviesCardList__button">Ещё</button>}
    </section>
  );
};

export default MoviesCardList;
