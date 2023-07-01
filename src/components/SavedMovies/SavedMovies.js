import './SavedMovies.css';
import { useState, useEffect } from 'react';
import { useContext } from 'react';
// import { useCallback } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';
import * as MainApi from '../../utils/MainApi';
import { useCardHandlers } from '../../hooks/useCardHandlers';

const SavedMovies = ({ loading, cardsForRender }) => {
  const currentUser = useContext(CurrentUserContext);
  const { handleCardLike } = useCardHandlers();
  const initialChecked =
    JSON.parse(localStorage.getItem('isCheckedOnSaved')) || false;
  const [savedCards, setSavedCards] = useState([]);
  const [cardsToRender, setCardsToRender] = useState([]);
  const [notFoundText, setNotFoundText] = useState('');
  const [isChecked, setIsChecked] = useState(initialChecked);
  const [initialCards, setInitialCards] = useState([]);

  // Управление состоянием переключателя

  const toogleClick = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    MainApi.getMoviesByOwnerId()
      .then((res) => {
        setSavedCards(res);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (savedCards.length) {
      setCardsToRender(savedCards);
    } else {
      setNotFoundText('Ничего не найдено');
    }
  }, [savedCards]);

  // Фильтрация по ключевому слову (сабмит)

  const [searchInputValue, setSearchInputValue] = useState('');
  const initialKeyWord =
    JSON.parse(localStorage.getItem('keyWordOnSaved')) || '';
  const searhInputErrorText = 'Нужно ввести ключевое слово';

  const handleChangeSearchInput = (evt) => {
    setSearchInputValue(evt.target.value);
  };

  const handleClickSearchInput = () => {
    if (searchInputValue === searhInputErrorText) {
      setSearchInputValue('');
    }
  };

  useEffect(() => {
    setSearchInputValue(initialKeyWord);
  }, [initialKeyWord]);

  const handleSearch = (keyWord) => {
    if (!searchInputValue) {
      setSearchInputValue(searhInputErrorText);
      return;
    } else {
      localStorage.setItem('keyWordOnSaved', JSON.stringify(keyWord));
      const filteredMoviesCards = savedCards.filter((card) =>
        card.nameRU.toLowerCase().includes(keyWord.toLowerCase())
      );
      localStorage.setItem('moviesCards', JSON.stringify(filteredMoviesCards));
      setInitialCards(filteredMoviesCards);
    }
  };

  const cardList = cardsToRender.map((card) => {
    const isLiked = card.owner === currentUser._id ? true : false;
    return (
      <MoviesCard
        card={card}
        key={card.movieId}
        onCardLike={handleCardLike}
        // onCardClick={handleCardClick}
        isLiked={isLiked}
      />
    );
  });
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
      <MoviesCardList cardList={cardList} />
      <div className="saved-movies__empty-block"></div>
    </main>
  );
};

export default SavedMovies;
