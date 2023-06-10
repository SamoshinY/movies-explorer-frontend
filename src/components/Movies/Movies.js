import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoreButton from '../MoreButton/MoreButton';
import Footer from '../Footer/Footer';
import HeaderWithNavigation from '../HeaderWithNavigation/HeaderWithNavigation';

const Movies = ({ cardList }) => {
  return (
    <section className="Movies">
      <HeaderWithNavigation />
      <SearchForm />
      <MoviesCardList cardList={cardList} />
      <MoreButton />
      <Footer />
    </section>
  );
};

export default Movies;
