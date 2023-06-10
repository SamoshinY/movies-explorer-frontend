import './Register.css';
import Auth from '../Auth/Auth';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import HeaderOnlyLogo from '../HeaderOnlyLogo/HeaderOnlyLogo';

const Register = () => {
  const { values, handleChange, errors } = useFormAndValidation();

  return (
    <>
      <HeaderOnlyLogo />
      <section className="Register">
        <Auth
          greeting={'Добро пожаловать!'}
          textButton={'Зарегистрироваться'}
          textAuth={'Уже зарегистрированы?'}
          textLink={'Войти'}
          link={'/signin'}
        >
          <label className="Auth__label">Имя</label>
          <input
            id="name-input"
            type="text"
            name="name"
            placeholder=""
            className={`Auth__input Auth__input_text_name" ${
              errors.name && 'Auth__input_type_error'
            }`}
            required
            minLength="2"
            maxLength="40"
            onChange={handleChange}
            value={values.name || ''}
          />
          <span className="name-input-error Auth__input-error">
            {errors.name || ''}
          </span>
        </Auth>
      </section>
    </>
  );
};

export default Register;
