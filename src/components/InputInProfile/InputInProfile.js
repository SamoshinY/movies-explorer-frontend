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
    <div className="InputInProfile">
      <label className="InputInProfile__label">{labelCaption}</label>
      <span className={`${inputName}-input-error InputInProfile__input-error`}>
        {errors[inputName] || ''}
      </span>
      <input
        id={`${inputName}-input`}
        type={`${inputName}`}
        name={`${inputName}`}
        placeholder={placeholder}
        className={`InputInProfile__input InputInProfile__input_text_${inputName}" ${
          errors[inputName] && 'InputInProfile__input_type_error'
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
