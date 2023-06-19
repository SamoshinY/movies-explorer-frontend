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
    <div className="input-auth">
      <label className="input-auth__label">{labelCaption}</label>
      <input
        id={`${inputName}-input`}
        type={`${inputName === 'name' ? 'text' : inputName}`}
        name={`${inputName}`}
        placeholder={placeholder}
        className={`input-auth__input input-auth__input_text_${inputName}" ${
          errors[inputName] && 'input-auth__input_type_error'
        }`}
        required
        minLength={minLength}
        maxLength={maxLength}
        onChange={handleChange}
        value={values[inputName] || ''}
      />
      <span className={`${inputName}-input-error input-auth__input-error`}>
        {errors[inputName] || ''}
      </span>
    </div>
  );
};

export default InputInAuth;
