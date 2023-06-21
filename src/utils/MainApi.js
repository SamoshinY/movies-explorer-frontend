const BASE_URL = 'https://samoshin-back.nomoredomains.monster/api';
const headers = { 'Content-Type': 'application/json' };

export { BASE_URL, headers };

const makeRequest = (url, method, body) => {
  const config = {
    method,
    headers,
    credentials: 'include',
  };
  if (body) {
    config.body = JSON.stringify(body);
  }
  return fetch(`${BASE_URL}${url}`, config).then((res) => res.json());
};

export const register = ({ name, email, password }) => {
  return makeRequest('/signup', 'POST', { name, email, password });
};

export const login = ({ password, email }) => {
  return makeRequest('/signin', 'POST', { password, email });
};

export const getInfoMe = () => {
  return makeRequest('/users/me', 'GET');
};

export const logOut = () => {
  return makeRequest('/signin', 'DELETE');
};
