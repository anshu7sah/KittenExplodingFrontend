import React from "react";
import { useNavigate } from "react-router-dom";
import { cancelhandler, initiateGame } from "../store/gameSlice";
import { useDispatch } from "react-redux";

const GameResult = ({ gamewon, gameover }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const restartHandler = () => {
    dispatch(initiateGame());
  };
  const gameCancelHandler = () => {
    dispatch(cancelhandler());
    navigate("/");
  };
  return (
    <div className="flex flex-col gap-4 border-2 border-lime-500 p-3 ">
      <p className="font-serif ">
        You {(gameover && "lose") || (gamewon && "won")} the Game
      </p>
      <div className="flex gap-4">
        <button
          className={`px-4 py-2 bg-lime-500 rounded-md text-[#222]`}
          onClick={gameCancelHandler}
        >
          Cancel
        </button>
        <button
          className={`px-4 py-2 bg-lime-500 rounded-md text-[#222]`}
          onClick={restartHandler}
        >
          Restart Game
        </button>
      </div>
    </div>
  );
};

export default GameResult;
