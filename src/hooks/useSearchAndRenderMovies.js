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
  const initialMovies = JSON.parse(localStorage.getItem('moviesCards')) || [];
  const initialKeyWord = JSON.parse(localStorage.getItem('keyWord')) || '';
  const allMovies = JSON.parse(localStorage.getItem('allMovies'));
  const shortMovies = initialMovies.filter((card) => card.duration <= 40);
  const [searchInputValue, setSearchInputValue] = useState('');
  const [isChecked, setIsChecked] = useState(initialChecked);
  const [moviesCards, setMoviesCards] = useState([]);
  const [savedCards, setSavedCards] = useState([]);
  const arrayForRender = Array.from(
    location.pathname === '/movies' ? moviesCards : savedCards
  );
  const searhInputErrorText = 'Нужно ввести ключевое слово';
  const { handleCardLike } = useCardHandlers(setMoviesCards, moviesCards);

  useEffect(() => {
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
        })
        .catch((err) => console.error(err));
    }
  }, [allMovies]);

  useEffect(() => {
    MainApi.getMoviesByOwnerId()
      .then((res) => {
        setSavedCards(res);
      })
      .catch((err) => console.error(err));
  }, [moviesCards]);

  useEffect(() => {
    setSearchInputValue(initialKeyWord);
  }, [initialKeyWord]);

  const handleChangeSearchInput = (evt) => {
    setSearchInputValue(evt.target.value);
  };

  const handleClickOnSearchInput = () => {
    if (searchInputValue === searhInputErrorText) {
      setSearchInputValue('');
    }
  };

  const toogleClick = () => {
    setIsChecked(!isChecked);
  };

  const filterMoviesCardsByDuration = () => {
    MainApi.getMoviesByOwnerId()
      .then((savedMovies) => {
        if (!savedMovies.length === 0) return;
        else {
          const collatedCards = initialMovies.map(
            (card) =>
              savedMovies?.find(({ movieId }) => movieId === card.movieId) ||
              card
          );
          if (collatedCards) {
            const shortMovies = collatedCards.filter(
              (card) => card.duration <= 40
            );
            isChecked
              ? setMoviesCards(shortMovies)
              : setMoviesCards(collatedCards);
          }
        }
      })
      .catch((err) => console.error(err));

    isChecked ? setMoviesCards(shortMovies) : setMoviesCards(initialMovies);
  };

  useEffect(() => {
    filterMoviesCardsByDuration();
    localStorage.setItem('isChecked', JSON.stringify(isChecked));
  }, [isChecked]);

  useEffect(() => {}, []);

  // Отправка формы
  const filterMoviesCardByKeyWord = (keyWord) => {
    localStorage.setItem('keyWord', JSON.stringify(keyWord));
    const filteredMoviesCards = allMovies.filter((card) =>
      card.nameRU.toLowerCase().includes(keyWord.toLowerCase())
    );
    console.log(moviesCards);
    localStorage.setItem('moviesCards', JSON.stringify(filteredMoviesCards));
    setMoviesCards(filteredMoviesCards);
  };

  const handleSearch = (inputText) => {
    if (!searchInputValue) {
      setSearchInputValue(searhInputErrorText);
      return;
    } else {
      filterMoviesCardByKeyWord(inputText);
      // filterMoviesCardsByDuration();
    }
  };

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
