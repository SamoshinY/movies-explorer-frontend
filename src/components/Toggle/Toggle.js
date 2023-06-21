import './Toggle.css';

const Toggle = ({ isChecked, toogleClick }) => {
  return (
    <label className="toggle">
      <span className="toggle-label">Короткометражки</span>
      <input
        className="toggle-checkbox"
        type="checkbox"
        checked={isChecked}
        onChange={toogleClick}
      ></input>
      <span className="toggle-switch"></span>
    </label>
  );
};

export default Toggle;
