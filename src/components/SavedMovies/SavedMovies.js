import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

const SavedMovies = ({ cardList }) => {
  return (
    <main className="saved-movies" aria-label='Страница "Сохраненные фильмы"'>
      <SearchForm />
      <MoviesCardList cardList={cardList} />
      <div className="saved-movies__empty-block"></div>
    </main>
  );
};

export default SavedMovies;
