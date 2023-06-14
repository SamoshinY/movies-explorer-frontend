import './BurgerMenu.css';

const BurgerMenu = ({ isOpen, handleClick }) => {
  return (
    <div className="BurgerMenu">
      {!isOpen && (
        <button
          type="button"
          className="BurgerMenu__open"
          onClick={handleClick}
        ></button>
      )}
      {isOpen && (
        <button
          onClick={handleClick}
          type="button"
          className="BurgerMenu__close"
        ></button>
      )}
    </div>
  );
};

export default BurgerMenu;
