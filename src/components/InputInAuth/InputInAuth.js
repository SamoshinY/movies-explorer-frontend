import './InputInAuth.css';

const InputInAuth = ({
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
    <>
      <label className="InputInAuth__label">{labelCaption}</label>
      <input
        id={`${inputName}-input`}
        type={`${inputName}`}
        name={`${inputName}`}
        placeholder={placeholder}
        className={`InputInAuth__input InputInAuth__input_text_${inputName}" ${
          errors[inputName] && 'InputInAuth__input_type_error'
        }`}
        required
        minLength={minLength}
        maxLength={maxLength}
        onChange={handleChange}
        value={values[inputName] || ''}
      />
      <span className={`${inputName}-input-error InputInAuth__input-error`}>
        {errors[inputName] || ''}
      </span>
    </>
  );
};

export default InputInAuth;
