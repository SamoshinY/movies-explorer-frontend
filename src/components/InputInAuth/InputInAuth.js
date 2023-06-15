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
      <label className="inputInAuth__label">{labelCaption}</label>
      <input
        id={`${inputName}-input`}
        type={`${inputName}`}
        name={`${inputName}`}
        placeholder={placeholder}
        className={`inputInAuth__input inputInAuth__input_text_${inputName}" ${
          errors[inputName] && 'inputInAuth__input_type_error'
        }`}
        required
        minLength={minLength}
        maxLength={maxLength}
        onChange={handleChange}
        value={values[inputName] || ''}
      />
      <span className={`${inputName}-input-error inputInAuth__input-error`}>
        {errors[inputName] || ''}
      </span>
    </>
  );
};

export default InputInAuth;
