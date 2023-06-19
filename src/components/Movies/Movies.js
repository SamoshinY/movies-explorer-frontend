import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoreButton from '../MoreButton/MoreButton';

const Movies = ({ cardList }) => {
  return (
    <main className="movies" aria-label='Страница "Фильмы"'>
      <div className="movies__empty-block"></div>
      <SearchForm />
      <MoviesCardList cardList={cardList} />
      <MoreButton />
    </main>
  );
};

export default Movies;
