import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoreButton from '../MoreButton/MoreButton';
import Preloader from '../Preloader/Preloader';
import { useSearchCards } from '../../hooks/useSearchCards';

const Movies = ({ loading }) => {
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
  } = useSearchCards();

  return loading ? (
    <Preloader />
  ) : (
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
      <MoviesCardList cardList={cardList} />
      {cardsForRender.length > count
        ? cardsForRender.length > chunkSize && (
            <MoreButton handleShowMoreCards={handleShowMoreCards} />
          )
        : null}
    </main>
  );
};

export default Movies;
