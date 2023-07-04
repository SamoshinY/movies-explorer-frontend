import { useState, useEffect } from 'react';
import {
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
} from '../utils/constants';

export const usePagination = (cardsForRender) => {
  const [chunkSize, setChunkSize] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(0);
  const [next, setNext] = useState(0);
  const [count, setCount] = useState(0);
  const [cardsToShow, setCardsToShow] = useState([]);

  useEffect(() => {
    setCardsToShow(cardsForRender.slice(0, cardsPerPage));
    setNext(cardsPerPage);
    setCount(cardsPerPage);
  }, [cardsForRender, chunkSize, cardsPerPage]);

  useEffect(() => {
    getChunkSize();
    window.addEventListener('resize', getChunkSize);
    return () => window.removeEventListener('resize', getChunkSize);
  }, []);

  const getChunkSize = () => {
    let chunkSize;
    let cardsPerPage;
    const width = window.innerWidth;
    switch (true) {
      case width > WIDTH_L:
        chunkSize = chunkSize_XL;
        cardsPerPage = cardsPerPage_XL;
        break;
      case width > WIDTH_M && width <= WIDTH_L:
        chunkSize = chunkSize_L;
        cardsPerPage = cardsPerPage_L;
        break;
      case width > WIDTH_S && width <= WIDTH_M:
        chunkSize = chunkSize_M;
        cardsPerPage = cardsPerPage_M;
        break;
      default:
        chunkSize = chunkSize_S;
        cardsPerPage = cardsPerPage_S;
    }
    setChunkSize(chunkSize);
    setCardsPerPage(cardsPerPage);
  };

  const getCardsToShow = (start, end) => {
    const slicedCards = cardsForRender.slice(start, end);
    const currentCardsArray = [...cardsToShow, ...slicedCards];
    setCount(count + slicedCards.length);
    setCardsToShow(currentCardsArray);
  };

  const handleShowMoreCards = () => {
    getCardsToShow(next, next + chunkSize);
    setNext(next + chunkSize);
  };

  return { handleShowMoreCards, cardsToShow, setCardsToShow, count, chunkSize };
};
