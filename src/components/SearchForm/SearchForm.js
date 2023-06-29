import './SearchForm.css';
import { useState, useEffect } from 'react';
import Toggle from '../Toggle/Toggle';

const SearchForm = ({ onSearch, isChecked, toogleClick }) => {
  const [searchInputValue, setSearchInputValue] = useState('');

  const initialKeyWord = JSON.parse(localStorage.getItem('keyWord')) || '';
  const searhInputErrorText = 'Нужно ввести ключевое слово';

  const handleChange = (evt) => {
    setSearchInputValue(evt.target.value);
  };

  const handleClick = () => {
    if (searchInputValue === searhInputErrorText) {
      setSearchInputValue('');
    }
  };

  useEffect(() => {
    setSearchInputValue(initialKeyWord);
  }, [initialKeyWord]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!searchInputValue) {
      setSearchInputValue(searhInputErrorText);
      return;
    } else {
      onSearch(searchInputValue);
    }
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
