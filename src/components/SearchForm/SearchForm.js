import './SearchForm.css';
import Toggle from '../Toggle/Toggle';

const SearchForm = () => {
  return (
    <div className="searchForm">
      <form className="searchForm__form">
        <div className="searchForm__input-wrap">
          <input
            className="searchForm__input"
            type="text"
            name="search-movie"
            placeholder="Фильм"
            required
          ></input>
          <button className="searchForm__find-button"></button>
        </div>
        <Toggle />
      </form>
      <div className="searchForm__line"></div>
    </div>
  );
};

export default SearchForm;
