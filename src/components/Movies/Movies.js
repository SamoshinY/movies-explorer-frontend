import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { useCallback } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoreButton from '../MoreButton/MoreButton';
import Preloader from '../Preloader/Preloader';
import MoviesCard from '../MoviesCard/MoviesCard';
import * as MainApi from '../../utils/MainApi';
import * as MoviesApi from '../../utils/MoviesApi';
import { useCardHandlers } from '../../hooks/useCardHandlers';
import { usePagination } from '../../hooks/usePagination';

const Movies = ({ loading }) => {
  const currentUser = useContext(CurrentUserContext);
  const allMovies = JSON.parse(localStorage.getItem('allMovies'));
  const initialChecked = JSON.parse(localStorage.getItem('isChecked')) || false;
  const initialMovies = JSON.parse(localStorage.getItem('moviesCards')) || [];
  const [isChecked, setIsChecked] = useState(initialChecked);
  const [initialCards, setInitialCards] = useState(initialMovies);
  const [savedCards, setSavedCards] = useState([]);
  const [cardsForRender, setCardsForRender] = useState([]);

  //Получение и запись массива фильмов

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

  useEffect(() => {
    getAllCards();
  }, [getAllCards]);

  // Получение массива сохраненных фильмов

  useEffect(() => {
    MainApi.getMoviesByOwnerId()
      .then((res) => {
        setSavedCards(res);
      })
      .catch((err) => console.error(err));
  }, []);

  // Управление состоянием переключателя

  const toogleClick = () => {
    setIsChecked(!isChecked);
  };

  //Инпут
  const [searchInputValue, setSearchInputValue] = useState('');
  const initialKeyWord = JSON.parse(localStorage.getItem('keyWord')) || '';
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

  // Фильтрация по ключевому слову (сабмит)

  const handleSearch = (keyWord) => {
    if (!searchInputValue) {
      setSearchInputValue(searhInputErrorText);
      return;
    } else {
      localStorage.setItem('keyWord', JSON.stringify(keyWord));
      const filteredMoviesCards = allMovies.filter((card) =>
        card.nameRU.toLowerCase().includes(keyWord.toLowerCase())
      );
      localStorage.setItem('moviesCards', JSON.stringify(filteredMoviesCards));
      setInitialCards(filteredMoviesCards);
    }
  };

  // Фильтрация по длительности

  useEffect(() => {
    isChecked
      ? setCardsForRender(initialCards.filter((card) => card.duration <= 40))
      : setCardsForRender(initialCards);
    localStorage.setItem('isChecked', JSON.stringify(isChecked));
  }, [isChecked, initialCards]);

  //Рендер

  const { handleShowMoreCards, cardsToShow, setCardsToShow, count, chunkSize } =
    usePagination(cardsForRender);

  const { handleCardLike } = useCardHandlers(setCardsToShow);

  const cardList = cardsToShow.map((card) => {
    if (savedCards.length) {
      const savedCard = savedCards?.find(
        ({ movieId }) => movieId === card.movieId
      );
      card = savedCard ? savedCard : card;
    }

    const isLiked = card.owner === currentUser._id ? true : false;
    // console.log(isLiked);

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
