import './BurgerMenu.css';

const BurgerMenu = ({ isOpen, handleClick }) => {
  return (
    <div className="burger-menu">
      {!isOpen && (
        <button
          type="button"
          className="burger-menu__open"
          onClick={handleClick}
        ></button>
      )}
      {isOpen && (
        <button
          onClick={handleClick}
          type="button"
          className="burger-menu__close"
        ></button>
      )}
    </div>
  );
};

export default BurgerMenu;
