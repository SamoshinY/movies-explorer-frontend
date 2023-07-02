import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useSearchCards } from '../../hooks/useSearchCards';

const SavedMovies = () => {
  const {
    toogleClick,
    handleChangeSearchInput,
    handleClickSearchInput,
    handleSearch,
    isChecked,
    searchInputValue,
    cardList,
    loading,
    messageText,
  } = useSearchCards();

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
      <MoviesCardList
        cardList={cardList}
        loading={loading}
        messageText={messageText}
      />
      <div className="saved-movies__empty-block"></div>
    </main>
  );
};

export default SavedMovies;
