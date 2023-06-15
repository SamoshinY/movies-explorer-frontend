import './Toggle.css';

const Toggle = () => {
  return (
    <label class="toggle">
      <span class="toggle-label">Короткометражки</span>
      <input class="toggle-checkbox" type="checkbox"></input>
      <div class="toggle-switch"></div>
    </label>
  );
};

export default Toggle;
