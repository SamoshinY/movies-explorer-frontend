const BASE_URL = 'https://api.nomoreparties.co/beatfilm-movies';
const headers = { 'Content-Type': 'application/json' };

export { BASE_URL, headers };

const makeRequest = (url, method, body) => {
  const config = {
    method,
    headers,
    // credentials: 'include',
  };
  if (body) {
    config.body = JSON.stringify(body);
  }
  return fetch(`${BASE_URL}${url}`, config).then((res) => res.json());
};

export const getMovies = () => {
  return makeRequest('/', 'GET');
};
