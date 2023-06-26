import { useState, useEffect } from 'react';
import { useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useCardHandlers } from '../hooks/useCardHandlers';
import * as MainApi from '../utils/MainApi';
import * as MoviesApi from '../utils/MoviesApi';
import MoviesCard from '../components/MoviesCard/MoviesCard';

export const useSearchAndRenderMovies = (currentUser) => {
  const location = useLocation();
  const initialChecked = JSON.parse(localStorage.getItem('isChecked')) || false;
  const [searchInputValue, setSearchInputValue] = useState('');
  const [isChecked, setIsChecked] = useState(initialChecked);
  const [moviesCards, setMoviesCards] = useState([]);
  const { handleCardLike } = useCardHandlers(setMoviesCards, moviesCards);

  const handleChangeSearchInput = (evt) => {
    setSearchInputValue(evt.target.value);
  };

  const searhInputErrorText = 'Нужно ввести ключевое слово';

  const handleClickOnSearchInput = () => {
    if (searchInputValue === searhInputErrorText) {
      setSearchInputValue('');
    }
  };

  const filterMoviesCardByKeyWord = (keyWord, allMovies) => {
    const filteredMoviesCardsByKeyWord = allMovies.filter((card) =>
      card.nameRU.toLowerCase().includes(keyWord.toLowerCase())
    );
    setMoviesCards(filteredMoviesCardsByKeyWord);
    localStorage.setItem(
      'moviesCards',
      JSON.stringify(filteredMoviesCardsByKeyWord)
    );
  };

  const toogleClick = () => {
    setIsChecked(!isChecked);
  };

  const filterMoviesCardsByDuration = useCallback(() => {
    const initialMovies = JSON.parse(localStorage.getItem('moviesCards')) || [];

    MainApi.getMoviesByOwnerId()
      .then((savedMovies) => {
        if (!savedMovies.length === 0) return;
        else {
          const result = initialMovies.map(
            (card) =>
              savedMovies?.find(({ movieId }) => movieId === card.movieId) ||
              card
          );
          if (result) {
            const shortMovies = result.filter((card) => card.duration <= 40);
            isChecked ? setMoviesCards(shortMovies) : setMoviesCards(result);
          }
        }
      })
      .catch((err) => console.error(err));
    const shortMovies = initialMovies.filter((card) => card.duration <= 40);
    isChecked ? setMoviesCards(shortMovies) : setMoviesCards(initialMovies);
  }, [isChecked]);

  useEffect(() => {
    filterMoviesCardsByDuration();
    localStorage.setItem('isChecked', JSON.stringify(isChecked));
  }, [filterMoviesCardsByDuration, isChecked]);

  useEffect(() => {
    const initialKeyWord = JSON.parse(localStorage.getItem('keyWord')) || '';
    setSearchInputValue(initialKeyWord);
  }, []);

  // Отправка формы

  const handleSearch = (inputText) => {
    if (!searchInputValue) {
      setSearchInputValue(searhInputErrorText);
      return;
    } else {
      localStorage.setItem('keyWord', JSON.stringify(inputText));
      const allMovies = JSON.parse(localStorage.getItem('allMovies'));
      if (!allMovies) {
        MoviesApi.getMovies()
          .then((cards) => {
            cards.forEach((card) => {
              const BASE_URL = 'https://api.nomoreparties.co';
              const image = `${BASE_URL}${card.image.url}`;
              card.image = image;
              card.thumbnail = image;
              card.trailer = card.trailerLink;
              delete card.trailerLink;
              card.movieId = card.id;
              delete card.id;
              delete card.created_at;
              delete card.updated_at;
            });
            localStorage.setItem('allMovies', JSON.stringify(cards));
            filterMoviesCardByKeyWord(inputText, cards);
            filterMoviesCardsByDuration();
          })
          .catch((err) => console.error(err));
      } else {
        filterMoviesCardByKeyWord(inputText, allMovies);
        filterMoviesCardsByDuration();
      }
    }
  };

  const [savedCards, setSavedCards] = useState([]);

  useEffect(() => {
    MainApi.getMoviesByOwnerId()
      .then((res) => setSavedCards(res))
      .catch((err) => console.error(err));
  }, [moviesCards]);

  const arrayForRender = Array.from(
    location.pathname === '/movies' ? moviesCards : savedCards
  );

  const cardListMovies = arrayForRender.map((card) => {
    const isLiked = card.owner ? card.owner === currentUser._id : false;
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

  return {
    moviesCards,
    setMoviesCards,
    handleChangeSearchInput,
    handleClickOnSearchInput,
    toogleClick,
    handleSearch,
    cardListMovies,
    isChecked,
    searchInputValue,
  };
};
