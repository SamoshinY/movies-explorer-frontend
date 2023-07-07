import { useState, useEffect } from 'react';
import {
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
    getCHUNK_SIZE();
    window.addEventListener('resize', getCHUNK_SIZE);
    return () => window.removeEventListener('resize', getCHUNK_SIZE);
  }, []);

  const getCHUNK_SIZE = () => {
    let chunkSize;
    let cardsPerPage;
    const width = window.innerWidth;
    switch (true) {
      case width > WIDTH_L:
        chunkSize = CHUNK_SIZE_XL;
        cardsPerPage = CARDS_PER_PAGE_XL;
        break;
      case width > WIDTH_M && width <= WIDTH_L:
        chunkSize = CHUNK_SIZE_L;
        cardsPerPage = CARDS_PER_PAGE_L;
        break;
      case width > WIDTH_S && width <= WIDTH_M:
        chunkSize = CHUNK_SIZE_M;
        cardsPerPage = CARDS_PER_PAGE_M;
        break;
      default:
        chunkSize = CHUNK_SIZE_S;
        cardsPerPage = CARDS_PER_PAGE_S;
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

  return {
    handleShowMoreCards,
    cardsToShow,
    setCardsToShow,
    count,
    chunkSize,
  };
};
