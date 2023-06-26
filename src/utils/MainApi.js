// const BASE_URL = 'https://samoshin-back.nomoredomains.monster/api';
const BASE_URL = 'http://localhost:3000/api';
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

// Users

export const register = ({ name, email, password }) => {
  return makeRequest('/signup', 'POST', { name, email, password });
};

export const login = ({ email, password }) => {
  return makeRequest('/signin', 'POST', { email, password });
};

export const getCurrentUser = () => {
  return makeRequest('/users/me', 'GET');
};

export const updateProfile = ({ name, email }) => {
  return makeRequest('/users/me', 'PATCH', { name, email });
};

export const logOut = () => {
  return makeRequest('/signout', 'POST');
};

// Cards

export const getMoviesByOwnerId = () => {
  return makeRequest('/movies', 'GET');
};

export const likeSetting = (card) => {
  return makeRequest('/movies', 'POST', card);
};

export const likeRemoving = (card) => {
  return makeRequest(`/movies/${card._id}`, 'DELETE');
};
