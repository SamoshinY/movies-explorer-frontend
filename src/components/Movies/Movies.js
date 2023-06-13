import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoreButton from '../MoreButton/MoreButton';

const Movies = ({ cardList }) => {
  return (
    <section className="Movies">
      <SearchForm />
      <MoviesCardList cardList={cardList} />
      <MoreButton />
    </section>
  );
};

export default Movies;
