import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoreButton from '../MoreButton/MoreButton';
import { useSearchCards } from '../../hooks/useSearchCards';

const Movies = () => {
  const {
    toogleClick,
    handleChangeSearchInput,
    handleClickSearchInput,
    handleSearch,
    isChecked,
    searchInputValue,
    cardList,
    cardsForRender,
    handleShowMoreCards,
    count,
    chunkSize,
    loading,
    messageText,
  } = useSearchCards();

  return (
    <main className="movies" aria-label='Страница "Фильмы"'>
      <div className="movies__empty-block"></div>
      <SearchForm
        onSearch={handleSearch}
        isChecked={isChecked}
        toogleClick={toogleClick}
        handleChange={handleChangeSearchInput}
        handleClick={handleClickSearchInput}
        searchInputValue={searchInputValue}
      />
      <MoviesCardList
        cardList={cardList}
        loading={loading}
        messageText={messageText}
      />
      {cardsForRender.length > count
        ? cardsForRender.length > chunkSize && (
            <MoreButton handleShowMoreCards={handleShowMoreCards} />
          )
        : null}
    </main>
  );
};

export default Movies;
