import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

const SavedMovies = ({ cardList }) => {
  return (
    <section className="saved-movies">
      <SearchForm />
      <MoviesCardList cardList={cardList} />
      <div className="saved-movies__empty-block"></div>
    </section>
  );
};

export default SavedMovies;
