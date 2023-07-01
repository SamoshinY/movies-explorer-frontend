import * as MoviesApi from '../utils/MoviesApi';
import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { usePagination } from '../hooks/usePagination';
import * as MainApi from '../utils/MainApi';
import MoviesCard from '../components/MoviesCard/MoviesCard';

export const useSearchCards = () => {
  const location = useLocation();
  const moviesPage = location.pathname === '/movies';
  const inputValue = moviesPage ? 'keyWord' : 'keyWordOnSaved';
  const switchPosition = moviesPage ? 'isChecked' : 'isCheckedOnSaved';
  const cardsStorage = moviesPage ? 'moviesCards' : 'savedMoviesCards';

  const allMovies = JSON.parse(localStorage.getItem('allMovies'));
  const initialMovies = JSON.parse(localStorage.getItem(cardsStorage)) || [];
  const initialChecked =
    JSON.parse(localStorage.getItem(switchPosition)) || false;
  const initialKeyWord = JSON.parse(localStorage.getItem(inputValue)) || '';
  const [initialCards, setInitialCards] = useState(initialMovies);
  const [isChecked, setIsChecked] = useState(initialChecked);
  const [searchInputValue, setSearchInputValue] = useState('');
  const searhInputErrorText = 'Нужно ввести ключевое слово';
  const [savedCards, setSavedCards] = useState([]);
  const [savedCardsToRender, setSavedCardsToRender] = useState(initialMovies);
  const [cardsForRender, setCardsForRender] = useState([]);
  const { handleShowMoreCards, cardsToShow, count, chunkSize } =
    usePagination(cardsForRender);

  useEffect(() => {
    MainApi.getMoviesByOwnerId()
      .then((res) => {
        if (!res.message) {
          setSavedCards(res);
          setSavedCardsToRender(res);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const handleCardLike = (card, isLiked) => {
    if (!isLiked) {
      MainApi.likeSetting(card)
        .then((card) => setSavedCards([...savedCards, card]))
        .catch((err) => console.error(err));
    } else {
      const savedCard = savedCards.length
        ? savedCards?.find(({ movieId }) => movieId === card.movieId)
        : null;
      MainApi.likeRemoving(savedCard)
        .then((data) =>
          setSavedCards((state) => state.filter((c) => c._id !== savedCard._id))
        )
        .catch((err) => console.error(err));
    }
  };

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

  const filteringCard = (cards, keyWord, setter) => {
    const filteredMoviesCards = cards.filter((card) =>
      card.nameRU.toLowerCase().includes(keyWord.toLowerCase())
    );
    localStorage.setItem(cardsStorage, JSON.stringify(filteredMoviesCards));
    setter(filteredMoviesCards);
  };

  const handleSearch = async (keyWord) => {
    if (!searchInputValue) {
      setSearchInputValue(searhInputErrorText);
      return;
    } else {
      localStorage.setItem(inputValue, JSON.stringify(keyWord));
      if (moviesPage) {
        if (!allMovies) {
          const allMovies = await getAllCards();
          filteringCard(allMovies, keyWord, setInitialCards);
        } else {
          filteringCard(allMovies, keyWord, setInitialCards);
        }
      } else {
        filteringCard(savedCards, keyWord, setSavedCardsToRender);
      }
    }
  };

  useEffect(() => {
    moviesPage
      ? isChecked
        ? setCardsForRender(initialCards.filter((card) => card.duration <= 40))
        : setCardsForRender(initialCards)
      : isChecked
      ? setSavedCardsToRender(savedCards.filter((card) => card.duration <= 40))
      : setSavedCardsToRender(savedCards);
    localStorage.setItem(switchPosition, JSON.stringify(isChecked));
  }, [isChecked, initialCards, switchPosition, moviesPage, savedCards]);

  const moviesCardList =
    location.pathname === '/movies' ? cardsToShow : savedCardsToRender;

  const cardList = moviesCardList.map((card) => {
    const isLiked = savedCards.length
      ? savedCards?.find(({ movieId }) => movieId === card.movieId)
      : false;

    return (
      <MoviesCard
        card={card}
        key={card.movieId}
        onCardLike={handleCardLike}
        isLiked={isLiked}
      />
    );
  });

  return {
    toogleClick,
    handleChangeSearchInput,
    handleClickSearchInput,
    handleSearch,
    isChecked,
    searchInputValue,
    cardList,
    setCardsForRender,
    cardsForRender,
    handleShowMoreCards,
    count,
    chunkSize,
  };
};
