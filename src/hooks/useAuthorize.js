import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import * as MainApi from '../utils/MainApi';

export const useAuthorize = () => {
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [authResult, setAuthResult] = useState(false);
  const [errorText, setErrorText] = useState('');

  const handleRegister = async ({ name, email, password }) => {
    try {
      setErrorText('');
      const user = await MainApi.register({ name, email, password });
      console.log(user);

      if (user.error || user.message) {
        setErrorText(user.message);
        console.log(errorText);
        setAuthResult(false);
        throw new Error(user.message);
      }
      if (user._id) {
        handleLogin({ email, password });
        setAuthResult(true);
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
      console.log(data);

      if (data.error || data.message !== 'Вы успешно прошли авторизацию!') {
        setErrorText(data.error || data.message);
        setAuthResult(false);
        throw new Error('Ошибка аутентификации');
      }

      getCurrentUser();
      setLoggedIn(true);
      navigate('/movies', { replace: true });
    } catch (err) {
      console.error(err);
      setAuthResult(false);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (values) => {
    try {
      setErrorText('');
      const user = await MainApi.updateProfile(values);
      console.log(user);

      if (user.error || user.message) {
        setErrorText(user.error || user.message);
        setAuthResult(false);
        throw new Error(user.error || user.message);
      }
      setCurrentUser(user);
      setLoggedIn(true);
      setAuthResult(true);
      navigate('/movies', { replace: true });
    } catch (err) {
      console.error(err);
      setAuthResult(false);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentUser = useCallback(async () => {
    try {
      const user = await MainApi.getCurrentUser();

      if (!user._id) {
        navigate('/', { replace: true });
        throw new Error('Нет данных');
      }
      setLoggedIn(true);
      setCurrentUser(user);
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
      setCurrentUser({});
      navigate('/', { replace: true });
    } catch (err) {
      console.error(err);
    }
  };

  return {
    getCurrentUser,
    handleLogin,
    handleRegister,
    handleEdit,
    handleLogOut,
    currentUser,
    loggedIn,
    loading,
    authResult,
    errorText,
    setErrorText,
  };
};
