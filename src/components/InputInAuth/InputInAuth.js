import './InputInAuth.css';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';

const InputInAuth = ({
  inputName,
  labelCaption,
  minLength,
  maxLength,
  placeholder,
}) => {
  const { values, handleChange, errors } = useFormAndValidation();

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
