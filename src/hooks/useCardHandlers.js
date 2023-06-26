import * as MainApi from '../utils/MainApi';

export const useCardHandlers = (setMoviesCards, moviesCards) => {
  const handleCardLike = (card, isLiked) => {
    if (!isLiked) {
      MainApi.likeSetting(card)
        .then((newCard) => {
          setMoviesCards((state) =>
            state.map((c) => {
              if (c.movieId === card.movieId) {
                return newCard;
              } else return c;
            })
          );
        })
        .catch((err) => console.error(err));
    } else {
      MainApi.likeRemoving(card)
        .then(() => {
          setMoviesCards((state) =>
            state.map((c) => {
              if (c.movieId === card.movieId) {
                delete c.owner;
                delete c._id;
                return c;
              } else return c;
            })
          );
        })
        .catch((err) => console.error(err));
    }
  };
  // const handleCardDelete = (card) => {
  //   setMoviesCards(moviesCards.filter((c) => c._id !== card._id));
  // };

  return { handleCardLike };
};
