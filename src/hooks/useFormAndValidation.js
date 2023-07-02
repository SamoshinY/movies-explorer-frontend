import { useState, useCallback } from 'react';
import isEmail from 'validator/lib/isEmail';
import {
  nameValidationText,
  emailValidationText,
  passwordValidationText,
} from '../utils/constants';

export function useFormAndValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (evt) => {
    const { name, value } = evt.target;

    switch (true) {
      case name === 'name' && evt.target.validity.patternMismatch:
        evt.target.setCustomValidity(nameValidationText);
        break;
      case name === 'email' && !isEmail(value):
        evt.target.setCustomValidity(emailValidationText);
        break;
      case name === 'password' && evt.target.validity.patternMismatch:
        evt.target.setCustomValidity(passwordValidationText);
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
