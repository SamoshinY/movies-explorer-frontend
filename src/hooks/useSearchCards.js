import * as MoviesApi from '../utils/MoviesApi';
import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

export const useSearchCards = (setCardsForRender) => {
  const location = useLocation();
  const moviesPage = location.pathname === '/movies';
  const inputValue = moviesPage ? 'keyWord' : 'keyWordOnSaved';
  const switchPosition = moviesPage ? 'isChecked' : 'isCheckedOnSaved';

  const allMovies = JSON.parse(localStorage.getItem('allMovies'));
  const initialMovies = JSON.parse(localStorage.getItem('moviesCards')) || [];
  const initialChecked =
    JSON.parse(localStorage.getItem(switchPosition)) || false;
  const initialKeyWord = JSON.parse(localStorage.getItem(inputValue)) || '';
  const [initialCards, setInitialCards] = useState(initialMovies);
  const [isChecked, setIsChecked] = useState(initialChecked);
  const [searchInputValue, setSearchInputValue] = useState('');
  const searhInputErrorText = 'Нужно ввести ключевое слово';

  const getAllCards = useCallback(async () => {
    if (!allMovies || !allMovies.length) {
      try {
        const data = await MoviesApi.getMovies();
        if (data) {
          const cards = data.map((card) => {
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
            return card;
          });
          localStorage.setItem('allMovies', JSON.stringify(cards));
          // throw new Error(data.message);
        }
        return data;
      } catch (err) {
        console.error(err);
      } finally {
        // setLoading(false);
      }
    }
  }, [allMovies]);

  const toogleClick = () => {
    setIsChecked(!isChecked);
  };

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

  // Фильтрация по ключевому слову (сабмит)

  const handleSearch = async (keyWord) => {
    if (!searchInputValue) {
      setSearchInputValue(searhInputErrorText);
      return;
    } else {
      localStorage.setItem(inputValue, JSON.stringify(keyWord));
      if (!allMovies) {
        const allMovies = await getAllCards();
        const filteredMoviesCards = allMovies.filter((card) =>
          card.nameRU.toLowerCase().includes(keyWord.toLowerCase())
        );
        localStorage.setItem(
          'moviesCards',
          JSON.stringify(filteredMoviesCards)
        );
        setInitialCards(filteredMoviesCards);
      } else {
        const filteredMoviesCards = allMovies.filter((card) =>
          card.nameRU.toLowerCase().includes(keyWord.toLowerCase())
        );
        localStorage.setItem(
          'moviesCards',
          JSON.stringify(filteredMoviesCards)
        );
        setInitialCards(filteredMoviesCards);
      }
    }
  };

  useEffect(() => {
    moviesPage
      ? isChecked
        ? setCardsForRender(initialCards.filter((card) => card.duration <= 40))
        : setCardsForRender(initialCards)
      : isChecked
      ? setCardsForRender(initialCards.filter((card) => card.duration <= 40))
      : setCardsForRender(initialCards);
    localStorage.setItem(switchPosition, JSON.stringify(isChecked));
  }, [isChecked, initialCards, setCardsForRender, switchPosition]);

  return {
    toogleClick,
    handleChangeSearchInput,
    handleClickSearchInput,
    handleSearch,
    isChecked,
    searchInputValue,
  };
};
