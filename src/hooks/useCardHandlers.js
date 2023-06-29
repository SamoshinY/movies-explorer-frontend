import * as MainApi from '../utils/MainApi';

export const useCardHandlers = (setCardForRender) => {
  const handleCardLike = (card, isLiked) => {
    if (!isLiked) {
      MainApi.likeSetting(card)
        .then((newCard) => {
          setCardForRender((state) =>
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
          setCardForRender((state) =>
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

  return { handleCardLike };
};
