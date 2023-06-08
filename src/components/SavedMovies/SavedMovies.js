import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
// import Preloader from '../Preloader/Preloader';
import Footer from '../Footer/Footer';

const SavedMovies = ({ cardList, buttonVisible }) => {
  return (
    <section className="SavedMovies">
      <SearchForm />
      <MoviesCardList cardList={cardList} buttonVisible={buttonVisible} />
      <Footer />
      {/* <Preloader /> */}
    </section>
  );
};

export default SavedMovies;
