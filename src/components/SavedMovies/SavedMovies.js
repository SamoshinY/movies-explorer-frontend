import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useSearchCards } from '../../hooks/useSearchCards';

const SavedMovies = ({ loading }) => {
  const {
    toogleClick,
    handleChangeSearchInput,
    handleClickSearchInput,
    handleSearch,
    isChecked,
    searchInputValue,
    cardList,
  } = useSearchCards();

  const notFoundText = 'не найдено';

  return (
    <main className="saved-movies" aria-label='Страница "Сохраненные фильмы"'>
      <SearchForm
        onSearch={handleSearch}
        isChecked={isChecked}
        toogleClick={toogleClick}
        handleChange={handleChangeSearchInput}
        handleClick={handleClickSearchInput}
        searchInputValue={searchInputValue}
      />
      <div className="saved-movies__empty-block-upper"></div>
      <MoviesCardList cardList={cardList} notFoundText={notFoundText} />
      <div className="saved-movies__empty-block"></div>
    </main>
  );
};

export default SavedMovies;
