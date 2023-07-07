import './SearchForm.css';
import Toggle from '../Toggle/Toggle';

const SearchForm = ({
  onSearch,
  isChecked,
  toogleClick,
  handleChange,
  handleClick,
  searchInputValue,
  loading,
}) => {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSearch(searchInputValue);
  };

  return (
    <div className="search-form">
      <form className="search-form__form" onSubmit={handleSubmit}>
        <div className="search-form__input-wrap">
          <input
            className="search-form__input"
            type="text"
            name="search"
            placeholder="Фильм"
            onChange={handleChange}
            value={searchInputValue}
            onClick={handleClick}
            disabled={loading}
          ></input>
          <button
            className="search-form__find-button"
            type="submit"
            disabled={loading}
          ></button>
        </div>
        <Toggle isChecked={isChecked} toogleClick={toogleClick} />
      </form>
      <div className="search-form__line"></div>
    </div>
  );
};

export default SearchForm;
