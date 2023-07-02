import './InputInProfile.css';
import { namePattern, passwordPattern } from '../../utils/constants';

const InputInProfile = ({
  inputName,
  labelCaption,
  handleChange,
  values,
  errors,
  minLength,
  maxLength,
  placeholder,
}) => {
  const getCurrentPattern = () => {
    if (inputName === 'name') return namePattern;
    if (inputName === 'password') return passwordPattern;
  };

  return (
    <div className="input-profile">
      <div className="input-profile__wrap">
        <label className="input-profile__label">{labelCaption}</label>
        <input
          id={`${inputName}-input`}
          type={`${inputName === 'name' ? 'text' : 'email'}`}
          pattern={getCurrentPattern()}
          name={`${inputName}`}
          placeholder={placeholder}
          className={`input-profile__input input-profile__input_text_${inputName}" ${
            errors[inputName] && 'input-profile__input_type_error'
          }`}
          required
          minLength={minLength}
          maxLength={maxLength}
          onChange={handleChange}
          value={values[inputName] || ''}
        />
      </div>
      <span className={`${inputName}-input-error input-profile__input-error`}>
        {errors[inputName] || ''}
      </span>
    </div>
  );
};

export default InputInProfile;
