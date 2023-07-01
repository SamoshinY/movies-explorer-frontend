import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import LevelWrap from '../LevelWrap/LevelWrap';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';
import Preloader from '../Preloader/Preloader';
import { useAuthorize } from '../../hooks/useAuthorize';
import * as MainApi from '../../utils/MainApi';
import MoviesCard from '../MoviesCard/MoviesCard';
import { usePagination } from '../../hooks/usePagination';
import { useLocation } from 'react-router-dom';

const App = () => {
  // регистрация авторизация
  const {
    getCurrentUser,
    handleLogin,
    handleRegister,
    handleEdit,
    handleLogOut,
    currentUser,
    loggedIn,
    loading,
    // setLoading,
    messageText,
    setMessageText,
  } = useAuthorize();

  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser, loggedIn]);

  //Cards

  const [savedCards, setSavedCards] = useState([]);
  const [cardsForRender, setCardsForRender] = useState([]);
  const { handleShowMoreCards, cardsToShow, count, chunkSize } =
    usePagination(cardsForRender);

  useEffect(() => {
    MainApi.getMoviesByOwnerId()
      .then((res) => {
        if (!res.message) {
          setSavedCards(res);
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

  //Render
  const location = useLocation();
  // const moviesPage = location.pathname === '/movies';
  const moviesCardList =
    location.pathname === '/movies' ? cardsToShow : savedCards;

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

  return loading ? (
    <Preloader />
  ) : (
    <div className="app">
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route path="/*" element={<LevelWrap loggedIn={loggedIn} />}>
            <Route index element={<Main />} />
            <Route
              path="movies"
              element={
                <ProtectedRoute
                  loggedIn={loggedIn}
                  element={Movies}
                  cardList={cardList}
                  count={count}
                  chunkSize={chunkSize}
                  handleShowMoreCards={handleShowMoreCards}
                  cardsForRender={cardsForRender}
                  setCardsForRender={setCardsForRender}
                />
              }
            />
            <Route
              path="saved-movies"
              element={
                <ProtectedRoute
                  loggedIn={loggedIn}
                  element={SavedMovies}
                  cardList={cardList}
                  setCardsForRender={setCardsForRender}
                />
              }
            />
            <Route
              path="profile"
              element={
                <ProtectedRoute
                  loggedIn={loggedIn}
                  element={Profile}
                  onEdit={handleEdit}
                  onLogOut={handleLogOut}
                  messageText={messageText}
                  setMessageText={setMessageText}
                />
              }
            />
          </Route>
          <Route
            path="/signin"
            element={
              <Login
                onLogin={handleLogin}
                messageText={messageText}
                setMessageText={setMessageText}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <Register
                onRegister={handleRegister}
                messageText={messageText}
                setMessageText={setMessageText}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </CurrentUserContext.Provider>
    </div>
  );
};

export default App;
