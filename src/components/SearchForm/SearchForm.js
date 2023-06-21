import './SearchForm.css';
import Toggle from '../Toggle/Toggle';

const SearchForm = ({
  onSearch,
  handleChange,
  handleClick,
  searchInputValue,
  isChecked,
  toogleClick,
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
          ></input>
          <button className="search-form__find-button" type="submit"></button>
        </div>
        <Toggle isChecked={isChecked} toogleClick={toogleClick} />
      </form>
      <div className="search-form__line"></div>
    </div>
  );
};

export default SearchForm;
