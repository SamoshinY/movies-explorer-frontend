import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

const SavedMovies = ({ cardList }) => {
  return (
    <section className="savedMovies">
      <SearchForm />
      <MoviesCardList cardList={cardList} />
      <div className="savedMovies__empty-block"></div>
    </section>
  );
};

export default SavedMovies;
