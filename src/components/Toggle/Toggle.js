import './Toggle.css';

const Toggle = () => {
  return (
    <label class="Toggle">
      <span class="Toggle-label">Короткометражки</span>
      <input class="Toggle-checkbox" type="checkbox"></input>
      <div class="Toggle-switch"></div>
    </label>
  );
};

export default Toggle;
