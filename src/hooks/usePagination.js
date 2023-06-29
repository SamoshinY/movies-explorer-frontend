import React, { useState, useEffect } from 'react';

import cards from './cardsArray';
const cardsPerPage = 3;
let arrayForHoldingCards = [];

const Cards = ({ cardsToRender }) => {
  return (
    <ul>
      {cardsToRender.map((card, index) => (
        <li key={index}>
          <strong>{card.id}</strong>
          &nbsp;{card.title}
        </li>
      ))}
    </ul>
  );
};

const Pagination = () => {
  const [cardsToShow, setCardsToShow] = useState([]);
  const [next, setNext] = useState(3);

  const loopWithSlice = (start, end) => {
    const slicedCards = cards.slice(start, end);
    arrayForHoldingCards = [...arrayForHoldingCards, ...slicedCards];
    setCardsToShow(arrayForHoldingCards);
  };

  useEffect(() => {
    loopWithSlice(0, cardsPerPage);
  }, []);

  const handleShowMoreCards = () => {
    loopWithSlice(next, next + cardsPerPage);
    setNext(next + cardsPerPage);
  };

  return (
    <div>
      <Cards cardsToRender={cardsToShow} />
      <button onClick={handleShowMoreCards}>Load more</button>
    </div>
  );
};

export default Pagination;
