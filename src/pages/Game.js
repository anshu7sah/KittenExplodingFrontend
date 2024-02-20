import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import { endExplodingAction } from "../store/gameSlice";
import {
  asyncDrawGame,
  getAllScores,
  updateScores,
} from "../store/asyncActions";
import GameResult from "../components/GameResult";
import CurrentCard from "../components/CurrentCard";

const Game = () => {
  const dispatch = useDispatch();
  const { game } = useSelector((e) => e.game);
  const { isAuthenticated } = useSelector((e) => e.auth);

  const {
    currentCard,
    deck,
    points,
    diffusecard,
    leaderboard,
    explodeAction,
    gamewon,
    gameover,
    cardIsShowing,
  } = game;

  useEffect(() => {
    if (gamewon && isAuthenticated) {
      dispatch(updateScores());
    }
    if (gamewon) {
      dispatch(getAllScores());
    }
  }, [gamewon, isAuthenticated]);

  const drawCardFromDeck = () => {
    dispatch(asyncDrawGame(deck, diffusecard));
  };
  const handleDiffuseAction = () => {
    dispatch(endExplodingAction());
  };

  const temp = [...leaderboard];
  const topHighScores = temp.sort((a, b) => b.points - a.points).slice(0, 10);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      {gamewon || gameover ? (
        <div className="flex items-center justify-center h-screen">
          <GameResult gamewon={gamewon} gameover={gameover} />
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row items-center justify-center h-screen p-4 lg:p-8">
          <div className="flex flex-col items-center gap-10 lg:mr-8">
            <div className="text-lg font-bold text-gray-800">
              Points: {points}
            </div>
            <div className="flex flex-wrap gap-4">
              {deck.map((card) => (
                <img
                  src="./assets/images.jpg" // Replace with the actual card image source
                  alt="card"
                  key={card.id}
                  className="cursor-pointer w-24 h-36"
                />
              ))}
            </div>
            {currentCard && (
              <div className="flex justify-center">
                <CurrentCard card={currentCard} />
              </div>
            )}
            <button
              className={`px-5 py-3 bg-lime-500 rounded-md text-white ${
                cardIsShowing ? "cursor-not-allowed bg-lime-200" : ""
              }`}
              onClick={drawCardFromDeck}
              disabled={cardIsShowing}
            >
              Draw Card
            </button>
            {explodeAction && diffusecard > 0 && (
              <button
                className={`px-5 py-3 bg-lime-500 rounded-md text-white`}
                onClick={() => handleDiffuseAction()}
              >
                Diffuse Bomb
              </button>
            )}
            <div className="text-gray-700">Diffuse Cards: {diffusecard}</div>
          </div>

          <div className="lg:w-1/3 mt-8 lg:mt-0">
            <div className="bg-white p-4 rounded-md shadow-md mb-4">
              <h2 className="text-lg font-bold text-gray-800 mb-4">
                Top 10 High Scores
              </h2>
              <ul>
                {topHighScores.map((score, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center mb-2"
                  >
                    <span>{score.username}</span>
                    <span>{score.points} points</span>
                  </li>
                ))}
              </ul>
            </div>

            {!isAuthenticated && (
              <div className="bg-white p-4 rounded-md shadow-md">
                <h2 className="text-lg font-bold text-gray-800 mb-4">
                  Authenticate to Save
                </h2>
                <p className="text-gray-700">
                  Login or sign up to save your game and see your name on the
                  leaderboard!
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;
