import './MoreButton.css';

const MoreButton = ({ handleShowMoreCards }) => {
  return (
    <button className="more-button" type="button" onClick={handleShowMoreCards}>
      Ещё
    </button>
  );
};

export default MoreButton;
