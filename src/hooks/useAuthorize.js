import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import * as MainApi from '../utils/MainApi';

export const useAuthorize = () => {
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [authResult, setAuthResult] = useState(false);
  const [errorText, setErrorText] = useState('');

  const handleRegister = async ({ name, email, password }) => {
    try {
      setErrorText('');
      const user = await MainApi.register({ name, email, password });

      if (user.error || user.message) {
        setErrorText(user.error || user.message);
        setAuthResult(false);
        throw new Error('Ошибка регистрации');
      }
      if (user._id) {
        console.log(user);
        setLoggedIn(true);
        setAuthResult(true);
        navigate('/movies', { replace: true });
      }
    } catch (err) {
      console.error(err);
      setAuthResult(false);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (values) => {
    try {
      setErrorText('');
      const data = await MainApi.login(values);

      if (data.error || data.message !== 'Вы успешно прошли авторизацию!') {
        setErrorText(data.error || data.message);
        setAuthResult(false);
        throw new Error('Ошибка аутентификации');
      }
      setLoggedIn(true);
      navigate('/', { replace: true });
      setUserData(values);
    } catch (err) {
      console.error(err);
      setAuthResult(false);
    } finally {
      setLoading(false);
    }
  };

  const checkToken = useCallback(async () => {
    try {
      const user = await MainApi.getInfoMe();

      if (!user._id) {
        throw new Error('Нет данных');
      }
      setLoggedIn(true);
      navigate('/', { replace: true });
      setUserData(user);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const handleLogOut = async () => {
    try {
      await MainApi.logOut();
      setLoggedIn(false);
      setUserData({});
      navigate('/signin', { replace: true });
    } catch (err) {
      console.error(err);
    }
  };

  return {
    checkToken,
    handleLogin,
    handleRegister,
    handleLogOut,
    loggedIn,
    loading,
    userData,
    authResult,
    errorText,
  };
};
