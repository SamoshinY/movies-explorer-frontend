import { useState, useEffect } from 'react';
import * as MainApi from '../utils/MainApi';
import * as MoviesApi from '../utils/MoviesApi';
import MoviesCard from '../components/MoviesCard/MoviesCard';

export const useRenderCards = (setLoading, currentUser) => {
  const allMovies = JSON.parse(localStorage.getItem('allMovies'));
  const initialChecked = JSON.parse(localStorage.getItem('isChecked')) || false;
  const initialCheckedInSaved =
    JSON.parse(localStorage.getItem('isCheckedInSaved')) || false;
  const initialMovies = JSON.parse(localStorage.getItem('moviesCards')) || [];
  const initialKeyWord = JSON.parse(localStorage.getItem('keyWord')) || '';
  const initialKeyWordInSaved =
    JSON.parse(localStorage.getItem('keyWordInSaved')) || '';
  const shortMovies = initialMovies.filter((card) => card.duration <= 40);
  const searhInputErrorText = 'Нужно ввести ключевое слово';

  const [savedCards, setSavedCards] = useState([]);
  const [initialCards, setInitialCards] = useState([]);
  const [cardForRender, setCardForRender] = useState([]);
  const [searchInputValue, setSearchInputValue] = useState('');
  const [isChecked, setIsChecked] = useState(initialChecked);
  const [isCheckedInSaved, setIsCheckedInSaved] = useState(
    initialCheckedInSaved
  );

  const initialSavedMovies = savedCards;
  const shortSavedMovies = initialSavedMovies.filter(
    (card) => card.duration <= 40
  );

  //Функции для запросов к Апи и сохранения данных

  // Получение всех карточек с апи Яндекса

  const getAllCards = async () => {
    try {
      const data = await MoviesApi.getMovies();
      if (data) {
        const data = await MoviesApi.getMovies();
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
        throw new Error(data.message);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Получение массива сохраненных карточек

  const getSavedCards = async () => {
    try {
      const data = await MainApi.getMoviesByOwnerId();
      if (data) {
        setSavedCards(data);
        throw new Error(data.message);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Сохранение карточки

  const handleCardSave = async (card) => {
    try {
      const data = await MainApi.likeSetting(card);
      if (data) {
        setSavedCards([...savedCards, data]);
        throw new Error(data.message);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Удаление карточки из сохраненных

  const handleCardDelete = async (card) => {
    try {
      const data = await MainApi.likeRemoving(card);
      if (data) {
        setSavedCards((state) =>
          state.map((c) => {
            if (c.movieId === card.movieId) {
              delete c.owner;
              delete c._id;
              return c;
            } else return c;
          })
        );
        throw new Error(data.message);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Фильтрация по ключевому слову

  const filterCardsByKeyWord = (keyWord) => {
    localStorage.setItem('keyWord', JSON.stringify(keyWord));
    const filteredMoviesCards = allMovies.filter((card) =>
      card.nameRU.toLowerCase().includes(keyWord.toLowerCase())
    );
    localStorage.setItem('moviesCards', JSON.stringify(filteredMoviesCards));
    setInitialCards(filteredMoviesCards);
  };

  //Фильтрация по длительности

  const filterCardsByDuration = () => {
    localStorage.setItem('isChecked', JSON.stringify(isChecked));
    isChecked ? setCardForRender(shortMovies) : setCardForRender(initialCards);
  };

  const filterSavedCardsByDuration = () => {
    localStorage.setItem('isCheckedInSaved', JSON.stringify(isChecked));
    isCheckedInSaved
      ? setSavedCards(shortSavedMovies)
      : setSavedCards(initialSavedMovies);
  };

  // Установка значения инпута

  const handleChangeSearchInput = (evt) => {
    setSearchInputValue(evt.target.value);
  };

  useEffect(() => {
    setSearchInputValue(initialKeyWord);
  }, [initialKeyWord]);

  // Очистка инпута в состоянии фокуса

  const handleClickOnSearchInput = () => {
    if (searchInputValue === searhInputErrorText) {
      setSearchInputValue('');
    }
  };

  // Управление состоянием переключателя

  const toogleClick = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    filterCardsByDuration();
    localStorage.setItem('isChecked', JSON.stringify(isChecked));
  }, [isChecked]);

  // Сабмит формы

  const handleSearch = (inputText) => {
    if (!searchInputValue) {
      setSearchInputValue(searhInputErrorText);
      return;
    } else {
      filterCardsByKeyWord(inputText);
      filterCardsByDuration();
    }
  };

  // Рендер карточек

  const handleSaveButtonClick = (isLiked) => {
    isLiked ? handleCardDelete() : handleCardSave();
  };

  const moviesList = cardForRender.map((card) => {
    const isLiked = card.owner ? card.owner === currentUser._id : false;
    return (
      <MoviesCard
        card={card}
        key={card.movieId}
        onCardLike={handleSaveButtonClick}
        // onCardClick={handleCardClick}
        isLiked={isLiked}
      />
    );
  });

  return {
    handleCardSave,
    handleCardDelete,
    savedCards,
    setSavedCards,
    getAllCards,
    getSavedCards,
    handleChangeSearchInput,
    handleClickOnSearchInput,
    moviesList,
    toogleClick,
    handleSearch,
  };
};
