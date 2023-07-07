import { headers, BASE_URL } from '../utils/constants';

const makeRequest = (url, method, body) => {
  const config = {
    method,
    headers,
  };
  if (body) {
    config.body = JSON.stringify(body);
  }
  return fetch(`${BASE_URL}${url}`, config).then((res) => res.json());
};

export const getMovies = () => {
  return makeRequest('/', 'GET');
};
