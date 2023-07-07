const namePattern = '^[A-Za-zА-Яа-яЁё\\-\\s]+$';
const passwordPattern = '[a-zA-Z0-9]{4,}';

const headers = { 'Content-Type': 'application/json' };
const BASE_URL = 'https://api.nomoreparties.co/beatfilm-movies';
const BASE_URL_SHORT = 'https://api.nomoreparties.co';
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
const CHUNK_SIZE_S = 2;
const CHUNK_SIZE_M = 2;
const CHUNK_SIZE_L = 3;
const CHUNK_SIZE_XL = 4;
const CARDS_PER_PAGE_S = 5;
const CARDS_PER_PAGE_M = 8;
const CARDS_PER_PAGE_L = 12;
const CARDS_PER_PAGE_XL = 16;

const SHORT_DURATION_LIMIT = 40;

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
  CHUNK_SIZE_S,
  CHUNK_SIZE_M,
  CHUNK_SIZE_L,
  CHUNK_SIZE_XL,
  CARDS_PER_PAGE_S,
  CARDS_PER_PAGE_M,
  CARDS_PER_PAGE_L,
  CARDS_PER_PAGE_XL,
  searhInputErrorText,
  errorText,
  notFoundMessage,
  SHORT_DURATION_LIMIT,
};
