import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import * as MainApi from '../utils/MainApi';

export const useAuthorize = () => {
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [messageText, setMessageText] = useState('');

  const handleRegister = async ({ name, email, password }) => {
    try {
      setMessageText('');
      const data = await MainApi.register({ name, email, password });

      if (data.message) {
        setMessageText(data.message);
        throw new Error(data.message);
      }
      if (data._id) {
        handleLogin({ email, password });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (values) => {
    try {
      setMessageText('');
      const data = await MainApi.login(values);

      if (data.message !== 'Вы успешно прошли авторизацию!') {
        setMessageText(data.message);
        throw new Error(data.message);
      }
      setLoggedIn(true);
      navigate('/movies', { replace: true });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (values) => {
    try {
      setMessageText('');
      const data = await MainApi.updateProfile(values);

      if (data.message) {
        setMessageText(data.message);
        throw new Error(data.message);
      }
      setCurrentUser(data);
      setMessageText('Данные успешно изменены!');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentUser = useCallback(async () => {
    try {
      const data = await MainApi.getCurrentUser();

      if (!data._id) {
        throw new Error(data.message);
      }
      setLoggedIn(true);
      setCurrentUser(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLogOut = async () => {
    try {
      await MainApi.logOut();
      setLoggedIn(false);
      setCurrentUser({});
      localStorage.clear();
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
    setLoading,
    messageText,
    setMessageText,
  };
};
