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
  setLeaderBoard,
  setUserPoint,
} from "./gameSlice";
import store from "../store/index";
import axios from "axios";
import { logout } from "./authSlice";

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

export const updateScores = () => {
  return async (dispatch) => {
    const token = store.getState().auth.jwtToken;
    try {
      const { data } = await axios.get("http://localhost:4000/updatescore", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data) {
        console.log(data);
        console.log("successfully updated scores");
      }
    } catch (error) {
      dispatch(logout());
      console.log(error);
    }
  };
};

export const getAllScores = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("http://localhost:4000/getallscores");
      dispatch(setLeaderBoard(data));
      const getUser = store.getState().auth;
      if (getUser.isAuthenticated) {
        const userPoint = data.find((d) => d.email === getUser.email);
        dispatch(setUserPoint(userPoint.points));
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
};
