import { useState, useEffect } from 'react';
import { useContext } from 'react';
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

const Movies = ({ loading }) => {
  const currentUser = useContext(CurrentUserContext);
  const allMovies = JSON.parse(localStorage.getItem('allMovies'));
  const initialChecked = JSON.parse(localStorage.getItem('isChecked')) || false;
  const initialMovies = JSON.parse(localStorage.getItem('moviesCards')) || [];
  const [isChecked, setIsChecked] = useState(initialChecked);
  const [initialCards, setInitialCards] = useState(initialMovies);
  const [savedCards, setSavedCards] = useState([]);
  const [cardForRender, setCardForRender] = useState([]);
  // const { handleCardLike } = useCardHandlers(setCardForRender);
  const [cardsToShow, setCardsToShow] = useState([]);
  const { handleCardLike } = useCardHandlers(setCardsToShow);

  //Получение и запись массива фильмов

  const getAllCards = async () => {
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
  };

  useEffect(() => {
    getAllCards();
  }, []);

  // Получение массива сохраненных фильмов

  useEffect(() => {
    MainApi.getMoviesByOwnerId()
      .then((res) => {
        setSavedCards(res);
      })
      .catch((err) => console.error(err));
  }, []);

  // Сопоставление массивов и замена карточек с совпадением по ID

  useEffect(() => {
    if (savedCards.length) {
      setInitialCards((cards) =>
        cards.map(
          (card) =>
            savedCards.find(({ movieId }) => movieId === card.movieId) || card
        )
      );
    }
  }, [savedCards]);

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

  //Рендер

  useEffect(() => {
    isChecked
      ? setCardForRender(initialCards.filter((card) => card.duration <= 40))
      : setCardForRender(initialCards);
    localStorage.setItem('isChecked', JSON.stringify(isChecked));
  }, [isChecked, initialCards]);

  //Пагинация

  const [chunkSize, setChunkSize] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(0);
  const [next, setNext] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCardsToShow(cardForRender.slice(0, chunkSize));
    setNext(chunkSize);
    setCount(chunkSize);
  }, [cardForRender, chunkSize]);

  useEffect(() => {
    getChunkSize();
    window.addEventListener('resize', getChunkSize);
    return () => window.removeEventListener('resize', getChunkSize);
  }, []);

  const getChunkSize = () => {
    let chunkSize;
    let cardsPerPage;
    const width = window.innerWidth;
    switch (true) {
      case width > 1080:
        chunkSize = 4;
        cardsPerPage = 16;
        break;
      case width > 830 && width <= 1080:
        chunkSize = 3;
        cardsPerPage = 12;
        break;
      case width > 520 && width <= 830:
        chunkSize = 2;
        cardsPerPage = 8;
        break;
      default:
        chunkSize = 2;
        cardsPerPage = 5;
    }
    setChunkSize(chunkSize);
    setCardsPerPage(cardsPerPage);
  };

  console.log(chunkSize, next, count);

  const getCardsToShow = (start, end) => {
    const slicedCards = cardForRender.slice(start, end);
    const currentCardsArray = [...cardsToShow, ...slicedCards];
    setCount(count + slicedCards.length);
    setCardsToShow(currentCardsArray.slice(cardsPerPage * -1));
  };

  const handleShowMoreCards = () => {
    getCardsToShow(next, next + chunkSize);
    setNext(next + chunkSize);
  };

  const cardList = cardsToShow.map((card) => {
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
      {cardForRender.length > count
        ? cardForRender.length > chunkSize && (
            <MoreButton handleShowMoreCards={handleShowMoreCards} />
          )
        : null}
    </main>
  );
};

export default Movies;
