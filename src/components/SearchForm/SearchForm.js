import './SearchForm.css';
import Toggle from '../Toggle/Toggle';

const SearchForm = () => {
  return (
    <div className="search-form">
      <form className="search-form__form">
        <div className="search-form__input-wrap">
          <input
            className="search-form__input"
            type="text"
            name="search-movie"
            placeholder="Фильм"
            required
          ></input>
          <button className="search-form__find-button"></button>
        </div>
        <Toggle />
      </form>
      <div className="search-form__line"></div>
    </div>
  );
};

export default SearchForm;
