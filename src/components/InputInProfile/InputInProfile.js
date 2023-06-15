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
    <div className="inputInProfile">
      <label className="inputInProfile__label">{labelCaption}</label>
      <span className={`${inputName}-input-error inputInProfile__input-error`}>
        {errors[inputName] || ''}
      </span>
      <input
        id={`${inputName}-input`}
        type={`${inputName}`}
        name={`${inputName}`}
        placeholder={placeholder}
        className={`inputInProfile__input inputInProfile__input_text_${inputName}" ${
          errors[inputName] && 'inputInProfile__input_type_error'
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
