import './Toggle.css';

const Toggle = () => {
  return (
    <label class="toggle">
      <span class="toggle-label">Короткометражки</span>
      <input class="toggle-checkbox" type="checkbox"></input>
      <span class="toggle-switch"></span>
    </label>
  );
};

export default Toggle;
