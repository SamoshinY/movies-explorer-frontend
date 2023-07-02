import { useState, useCallback } from 'react';
import isEmail from 'validator/lib/isEmail';

export function useFormAndValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (evt) => {
    const { name, value } = evt.target;

    switch (true) {
      case name === 'name' && evt.target.validity.patternMismatch:
        evt.target.setCustomValidity(
          'это поле содержит только латиницу, кириллицу, пробел или дефис'
        );
        break;
      case name === 'email' && !isEmail(value):
        evt.target.setCustomValidity(
          'введите адрес электронной почты в правильном формате'
        );
        break;
      case name === 'password' && evt.target.validity.patternMismatch:
        evt.target.setCustomValidity(
          'это поле содержит только латиницу и цифры, минимум 4 символа'
        );
        break;
      case !evt.target.validity.patternMismatch:
        evt.target.setCustomValidity('');
        break;

      default:
        evt.target.setCustomValidity('');
    }

    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: evt.target.validationMessage });
    setIsValid(evt.target.form.checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
    setValues,
    setIsValid,
  };
}
