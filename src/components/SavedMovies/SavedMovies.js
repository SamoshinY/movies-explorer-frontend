import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import HeaderWithNavigation from '../Header/HeaderWithNavigation/HeaderWithNavigation';

const SavedMovies = ({ cardList }) => {
  return (
    <section className="SavedMovies">
      <HeaderWithNavigation />
      <SearchForm />
      <MoviesCardList cardList={cardList} />
      <div className="SavedMovies__empty-block"></div>
      <Footer />
    </section>
  );
};

export default SavedMovies;
