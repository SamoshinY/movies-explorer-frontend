import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import LevelWrap from '../LevelWrap/LevelWrap';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import movies from '../../utils/movies';
import MoviesCard from '../MoviesCard/MoviesCard';
import currentUser from '../../utils/user';
import NotFound from '../NotFound/NotFound';

const App = () => {
  // Для ревью: в коде присутствуют сущности и функции, предназначенные
  // только для рендера и на следующем этапе будут удалены или преобразованы

  const [moviesCards, setMoviesCards] = useState(movies);

  const deleteMovie = (movie) => {
    setMoviesCards(moviesCards.filter((c) => c._id !== movie._id));
  };

  const cardListMovies = moviesCards.map((movie) => (
    <MoviesCard movie={movie} key={movie._id} />
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
    <div className="App">
      <Routes>
        <Route path="/" element={<LevelWrap />}>
          <Route path="" element={<Main />} />
          <Route path="movies" element={<Movies cardList={cardListMovies} />} />
          <Route
            path="saved-movies"
            element={<SavedMovies cardList={cardListSavedMovies} />}
          />
          <Route path="profile" element={<Profile />} />
        </Route>

        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
