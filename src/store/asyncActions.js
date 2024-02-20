import {
  afterDiffuse,
  catCard,
  endDeck,
  exitGame,
  initiateDeck,
  initiateExplodingAction,
  restartGame,
  setDiffuseCard,
  setGamewon,
} from "./gameSlice";
import store from "../store/index";

export const asyncDrawGame = (deck, diffusecard) => {
  return (dispatch) => {
    const temp = [...deck];
    let currentcard = deck[deck.length - 1];
    dispatch(initiateDeck(currentcard));
    if (currentcard.type === "explodingKitten") {
      dispatch(initiateExplodingAction());
    }
    setTimeout(() => {
      if (
        temp.length == 1 &&
        currentcard.type != "shuffle" &&
        currentcard.type != "explodingKitten"
      ) {
        dispatch(setGamewon());
      }
      if (currentcard.type === "cat") {
        temp.pop();
        dispatch(catCard(temp));
      } else if (currentcard.type === "diffuse") {
        temp.pop();
        dispatch(setDiffuseCard(temp));
      } else if (currentcard.type === "shuffle") {
        dispatch(restartGame());
      } else if (currentcard.type === "explodingKitten") {
        if (store.getState().game.game.explodeAction) {
          dispatch(exitGame());
        } else {
          if (temp.length === 1) {
            dispatch(setGamewon());
          } else {
            temp.pop();
            dispatch(afterDiffuse(temp));
          }
        }
      }
      dispatch(endDeck());
    }, 2500);
  };
};
