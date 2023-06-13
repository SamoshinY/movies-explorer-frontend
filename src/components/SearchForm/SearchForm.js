import './SearchForm.css';
import Toggle from '../Toggle/Toggle';

const SearchForm = () => {
  return (
    <div className="SearchForm">
      <form className="SearchForm__form">
        <div className="SearchForm__input-wrap">
          <input
            className="SearchForm__input"
            type="text"
            name="search-movie"
            placeholder="Фильм"
            required
          ></input>
          <button className="SearchForm__find-button"></button>
        </div>
        <Toggle />
      </form>
      <div className="SearchForm__line"></div>
    </div>
  );
};

export default SearchForm;
