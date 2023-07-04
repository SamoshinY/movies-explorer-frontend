import * as MoviesApi from '../utils/MoviesApi';
import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { usePagination } from '../hooks/usePagination';
import * as MainApi from '../utils/MainApi';
import MoviesCard from '../components/MoviesCard/MoviesCard';
import {
  searhInputErrorText,
  errorText,
  BASE_URL_SHORT,
  notFoundMessage,
} from '../utils/constants';

export const useSearchCards = () => {
  const location = useLocation();
  const moviesPage = location.pathname === '/movies';
  const inputValue = moviesPage ? 'keyWord' : 'keyWordOnSaved';
  const switchPosition = moviesPage ? 'isChecked' : 'isCheckedOnSaved';
  const cardsStorage = moviesPage ? 'moviesCards' : 'savedMoviesCards';

  const allMovies = JSON.parse(localStorage.getItem('allMovies'));
  const initialMovies = JSON.parse(localStorage.getItem(cardsStorage)) || [];
  const initialSavedMovies =
    JSON.parse(localStorage.getItem(cardsStorage)) || [];
  const initialChecked =
    JSON.parse(localStorage.getItem(switchPosition)) || false;
  const initialKeyWord = JSON.parse(localStorage.getItem(inputValue)) || '';
  const [initialCards, setInitialCards] = useState(initialMovies);
  const [initialSavedCards, setInitialSavedCards] =
    useState(initialSavedMovies);
  const [isChecked, setIsChecked] = useState(initialChecked);
  const [searchInputValue, setSearchInputValue] = useState('');
  const [savedCards, setSavedCards] = useState([]);
  const [savedCardsToRender, setSavedCardsToRender] = useState(initialMovies);
  const [cardsForRender, setCardsForRender] = useState([]);
  const { handleShowMoreCards, cardsToShow, count, chunkSize } =
    usePagination(cardsForRender);
  const [loading, setLoading] = useState(true);
  const [messageText, setMessageText] = useState('');

  useEffect(() => {
    setLoading(true);
    MainApi.getMoviesByOwnerId()
      .then((res) => {
        if (!res.message) {
          setSavedCards(res);
          setSavedCardsToRender(res);
        }
      })
      .catch((err) => {
        console.error(err);
        setMessageText(errorText);
      })
      .finally(setLoading(false));
  }, []);

  const handleCardLike = (card, isLiked) => {
    if (!isLiked) {
      MainApi.likeSetting(card)
        // .then((card) => setInitialSavedCards([...savedCards, card]))
        .then((card) => setSavedCards([...savedCards, card]))
        .catch((err) => console.error(err));
    } else {
      const savedCard = savedCards.length
        ? savedCards?.find(({ movieId }) => movieId === card.movieId)
        : null;
      MainApi.likeRemoving(savedCard)
        .then((data) =>
          // setInitialSavedCards((state) =>
          //   state.filter((c) => c._id !== savedCard._id)
          // )
          setSavedCards((state) => state.filter((c) => c._id !== savedCard._id))
        )
        .catch((err) => console.error(err));
    }
  };

  const getAllCards = useCallback(async () => {
    if (!allMovies || !allMovies.length) {
      try {
        setLoading(true);
        const data = await MoviesApi.getMovies();
        if (data) {
          const cards = data.map((card) => {
            const image = `${BASE_URL_SHORT}${card.image.url}`;
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
        }
        return data;
      } catch (err) {
        console.error(err);
        setMessageText(errorText);
      } finally {
        setLoading(false);
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

  const filteringCard = (cards, keyWord, setter) => {
    const filteredMoviesCards = cards.filter((card) =>
      card.nameRU.toLowerCase().includes(keyWord.toLowerCase())
    );
    localStorage.setItem(cardsStorage, JSON.stringify(filteredMoviesCards));
    setter(filteredMoviesCards);
    if (!filteredMoviesCards.length) {
      setMessageText(notFoundMessage);
    }
  };

  const handleSearch = async (keyWord) => {
    // if (!searchInputValue) {
    //   setSearchInputValue(searhInputErrorText);
    //   return;
    // }
    if (moviesPage) {
      if (!searchInputValue) {
        setSearchInputValue(searhInputErrorText);
        return;
      }
      if (!allMovies) {
        const allMovies = await getAllCards();
        filteringCard(allMovies, keyWord, setInitialCards);
      } else {
        filteringCard(allMovies, keyWord, setInitialCards);
      }
    } else {
      filteringCard(savedCards, keyWord, setInitialSavedCards);
    }

    localStorage.setItem(inputValue, JSON.stringify(keyWord));
  };

  useEffect(() => {
    if (moviesPage) {
      if (isChecked) {
        setCardsForRender(initialCards.filter((card) => card.duration <= 40));
        if (!cardsForRender.length) {
          setMessageText(notFoundMessage);
        }
      } else {
        setCardsForRender(initialCards);
      }
    } else {
      if (isChecked) {
        setSavedCardsToRender(
          savedCards.filter((card) => card.duration <= 40)
          // initialSavedCards.filter((card) => card.duration <= 40)
        );
        if (!savedCardsToRender.length) {
          setMessageText(notFoundMessage);
        }
      } else {
        setSavedCardsToRender(savedCards);
        // setSavedCardsToRender(initialSavedCards);
      }
    }
    localStorage.setItem(switchPosition, JSON.stringify(isChecked));
  }, [
    isChecked,
    initialCards,
    switchPosition,
    moviesPage,
    savedCards,
    cardsForRender,
    initialSavedCards,
    savedCardsToRender,
  ]);

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
    loading,
    messageText,
    setMessageText,
  };
};
