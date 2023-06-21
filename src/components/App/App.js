import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import LevelWrap from '../LevelWrap/LevelWrap';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import MoviesCard from '../MoviesCard/MoviesCard';
import NotFound from '../NotFound/NotFound';
import * as MoviesApi from '../../utils/MoviesApi';
import { useAuthorize } from '../../hooks/useAuthorize';

const App = () => {
  const [currentUser, setCurrentUser] = useState({});

  // регистрация авторизация
  const {
    checkToken,
    handleLogin,
    handleRegister,
    handleLogOut,
    loggedIn,
    loading,
    userData,
    authResult,
    errorText,
  } = useAuthorize();
  // блок поиска по фильмам

  const initialChecked = JSON.parse(localStorage.getItem('isChecked')) || false;

  const [searchInputValue, setSearchInputValue] = useState('');
  const [isChecked, setIsChecked] = useState(initialChecked);
  const [moviesCards, setMoviesCards] = useState([]);

  const handleChange = (evt) => {
    setSearchInputValue(evt.target.value);
  };

  const searhInputErrorText = 'Нужно ввести ключевое слово';

  const handleClickOnSearchInput = () => {
    if (searchInputValue === searhInputErrorText) {
      setSearchInputValue('');
    }
  };

  const filterMoviesByKeyWord = (keyWord, allMovies) => {
    const filteredByKeyWordMovies = allMovies.filter((movie) =>
      movie.nameRU.toLowerCase().includes(keyWord.toLowerCase())
    );
    setMoviesCards(filteredByKeyWordMovies);
    localStorage.setItem('movies', JSON.stringify(filteredByKeyWordMovies));
  };

  //Переключатель

  const toogleClick = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    const initialMovies = JSON.parse(localStorage.getItem('movies')) || [];
    const shortMovies = initialMovies.filter((movie) => movie.duration <= 40);
    isChecked ? setMoviesCards(shortMovies) : setMoviesCards(initialMovies);
    localStorage.setItem('isChecked', JSON.stringify(isChecked));
  }, [isChecked]);

  // Отправка формы

  useEffect(() => {
    const initialKeyWord = JSON.parse(localStorage.getItem('keyWord')) || '';
    setSearchInputValue(initialKeyWord);
  }, []);

  const onSearch = (inputText) => {
    if (!searchInputValue) {
      setSearchInputValue(searhInputErrorText);
      return;
    } else {
      localStorage.setItem('keyWord', JSON.stringify(inputText));
      const allMovies = JSON.parse(localStorage.getItem('allMovies'));
      if (!allMovies) {
        MoviesApi.getMovies()
          .then((movies) => {
            localStorage.setItem('allMovies', JSON.stringify(movies));
            filterMoviesByKeyWord(inputText, movies);
          })
          .catch((err) => console.error(err));
      } else {
        filterMoviesByKeyWord(inputText, allMovies);
      }
    }
  };

  //рендер карточек

  const deleteMovie = (movie) => {
    setMoviesCards(moviesCards.filter((c) => c._id !== movie._id));
  };

  const cardListMovies = moviesCards.map((movie) => (
    <MoviesCard movie={movie} key={movie.id} />
  ));

  const cardListSavedMovies = moviesCards
    .filter((movie) => movie.owner === currentUser._id)
    .map((movie) => (
      <MoviesCard
        movie={movie}
        key={movie._id}
        inSavedList={true}
        deleteMovie={deleteMovie}
      />
    ));

  return (
    <div className="app">
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route path="/" element={<LevelWrap />}>
            <Route path="" element={<Main />} />
            <Route
              path="movies"
              element={
                <Movies
                  cardList={cardListMovies}
                  onSearch={onSearch}
                  handleChange={handleChange}
                  handleClickOnSearchInput={handleClickOnSearchInput}
                  searchInputValue={searchInputValue}
                  isChecked={isChecked}
                  toogleClick={toogleClick}
                />
              }
            />
            <Route
              path="saved-movies"
              element={<SavedMovies cardList={cardListSavedMovies} />}
            />
            <Route path="profile" element={<Profile errorMessage={''} />} />
          </Route>

          <Route path="/signin" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/signup"
            element={<Register onRegister={handleRegister} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </CurrentUserContext.Provider>
    </div>
  );
};

export default App;
