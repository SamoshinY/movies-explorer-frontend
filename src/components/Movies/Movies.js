import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoreButton from '../MoreButton/MoreButton';

const Movies = ({
  cardList,
  onSearch,
  handleChange,
  handleClickOnSearchInput,
  searchInputValue,
  isChecked,
  toogleClick,
}) => {
  return (
    <main className="movies" aria-label='Страница "Фильмы"'>
      <div className="movies__empty-block"></div>
      <SearchForm
        onSearch={onSearch}
        handleChange={handleChange}
        handleClick={handleClickOnSearchInput}
        searchInputValue={searchInputValue}
        isChecked={isChecked}
        toogleClick={toogleClick}
      />
      <MoviesCardList cardList={cardList} />
      <MoreButton />
    </main>
  );
};

export default Movies;
