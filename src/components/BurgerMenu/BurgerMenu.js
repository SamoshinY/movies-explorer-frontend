import './BurgerMenu.css';

const BurgerMenu = ({ isOpen, handleClick }) => {
  return (
    <div className="burgerMenu">
      {!isOpen && (
        <button
          type="button"
          className="burgerMenu__open"
          onClick={handleClick}
        ></button>
      )}
      {isOpen && (
        <button
          onClick={handleClick}
          type="button"
          className="burgerMenu__close"
        ></button>
      )}
    </div>
  );
};

export default BurgerMenu;
