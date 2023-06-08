import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

const Movies = ({ cardList, buttonVisible }) => {
  return (
    <section className="Movies">
      <SearchForm />
      <MoviesCardList cardList={cardList} buttonVisible={buttonVisible} />
      <Footer />
    </section>
  );
};

export default Movies;
