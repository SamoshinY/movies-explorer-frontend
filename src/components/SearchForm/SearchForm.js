import './SearchForm.css';

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
        <div className="SearchForm__find-filter">
          Короткометражки
          <div className="SearchForm__tumbler"></div>
        </div>
      </form>
      <div className="SearchForm__line"></div>
    </div>
  );
};

export default SearchForm;
