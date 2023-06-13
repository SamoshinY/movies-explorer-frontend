import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

const SavedMovies = ({ cardList }) => {
  return (
    <section className="SavedMovies">
      <SearchForm />
      <MoviesCardList cardList={cardList} />
      <div className="SavedMovies__empty-block"></div>
    </section>
  );
};

export default SavedMovies;
