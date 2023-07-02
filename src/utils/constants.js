const namePattern = '^[A-Za-zА-Яа-яЁё\\-\\s]+$';
const passwordPattern = '[a-zA-Z0-9]{4,}';

const headers = { 'Content-Type': 'application/json' };
const BASE_URL = 'https://api.nomoreparties.co/beatfilm-movies';
const BASE_URL_SHORT = 'https://api.nomoreparties.co';
// const BASE_URL_MAIN = 'http://localhost:3000/api';
const BASE_URL_MAIN = 'https://samoshin-back.nomoredomains.monster/api';

const nameValidationText =
  'это поле содержит только латиницу, кириллицу, пробел или дефис';
const emailValidationText =
  'введите адрес электронной почты в правильном формате';
const passwordValidationText =
  'это поле содержит только латиницу и цифры, минимум 4 символа';

const searhInputErrorText = 'Нужно ввести ключевое слово';
const errorText =
  'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз';

const notFoundMessage = 'Ничего не найдено';

const WIDTH_S = 520;
const WIDTH_M = 830;
const WIDTH_L = 1080;
const chunkSize_S = 2;
const chunkSize_M = 2;
const chunkSize_L = 3;
const chunkSize_XL = 4;
const cardsPerPage_S = 5;
const cardsPerPage_M = 8;
const cardsPerPage_L = 12;
const cardsPerPage_XL = 16;

export {
  namePattern,
  passwordPattern,
  headers,
  BASE_URL,
  BASE_URL_SHORT,
  BASE_URL_MAIN,
  nameValidationText,
  emailValidationText,
  passwordValidationText,
  WIDTH_S,
  WIDTH_M,
  WIDTH_L,
  chunkSize_S,
  chunkSize_M,
  chunkSize_L,
  chunkSize_XL,
  cardsPerPage_S,
  cardsPerPage_M,
  cardsPerPage_L,
  cardsPerPage_XL,
  searhInputErrorText,
  errorText,
  notFoundMessage,
};
