import './App.css';
import { Route, Routes } from 'react-router-dom';
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

const App = () => {
  const {
    getCurrentUser,
    handleLogin,
    handleRegister,
    handleEdit,
    handleLogOut,
    currentUser,
    loggedIn,
    loading,
    messageText,
    setMessageText,
  } = useAuthorize();

  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser, loggedIn]);

  return loading ? (
    <Preloader />
  ) : (
    <div className="app">
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route path="/" element={<LevelWrap loggedIn={loggedIn} />}>
            <Route index element={<Main />} />
            <Route
              path="movies"
              element={<ProtectedRoute loggedIn={loggedIn} element={Movies} />}
            />
            <Route
              path="saved-movies"
              element={
                <ProtectedRoute loggedIn={loggedIn} element={SavedMovies} />
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
                  loading={loading}
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
                loggedIn={loggedIn}
                loading={loading}
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
                loggedIn={loggedIn}
                loading={loading}
              />
            }
          />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </CurrentUserContext.Provider>
    </div>
  );
};

export default App;
