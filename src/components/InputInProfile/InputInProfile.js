import './InputInProfile.css';

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
  return (
    <div className="input-profile">
      <label className="input-profile__label">{labelCaption}</label>
      <span className={`${inputName}-input-error input-profile__input-error`}>
        {errors[inputName] || ''}
      </span>
      <input
        id={`${inputName}-input`}
        type={`${inputName === 'name' ? 'text' : 'email'}`}
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
  );
};

export default InputInProfile;
