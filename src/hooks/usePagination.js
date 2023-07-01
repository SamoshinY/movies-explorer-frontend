import { useState, useEffect } from 'react';

export const usePagination = (cardsForRender) => {
  const [chunkSize, setChunkSize] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(0);
  const [next, setNext] = useState(0);
  const [count, setCount] = useState(0);
  const [cardsToShow, setCardsToShow] = useState([]);

  useEffect(() => {
    setCardsToShow(cardsForRender.slice(0, chunkSize));
    setNext(chunkSize);
    setCount(chunkSize);
  }, [cardsForRender, chunkSize]);

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
      case width > 1080:
        chunkSize = 4;
        cardsPerPage = 16;
        break;
      case width > 830 && width <= 1080:
        chunkSize = 3;
        cardsPerPage = 12;
        break;
      case width > 520 && width <= 830:
        chunkSize = 2;
        cardsPerPage = 8;
        break;
      default:
        chunkSize = 2;
        cardsPerPage = 5;
    }
    setChunkSize(chunkSize);
    setCardsPerPage(cardsPerPage);
  };

  const getCardsToShow = (start, end) => {
    const slicedCards = cardsForRender.slice(start, end);
    const currentCardsArray = [...cardsToShow, ...slicedCards];
    setCount(count + slicedCards.length);
    setCardsToShow(currentCardsArray.slice(cardsPerPage * -1));
  };

  const handleShowMoreCards = () => {
    getCardsToShow(next, next + chunkSize);
    setNext(next + chunkSize);
  };

  return { handleShowMoreCards, cardsToShow, setCardsToShow, count, chunkSize };
};
