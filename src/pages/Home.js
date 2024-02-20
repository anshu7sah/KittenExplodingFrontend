import React, { useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { exitGame, initiateGame } from "../store/gameSlice";

const Home = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [tempUsername, setTempUsername] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const playGameHandler = () => {
    if (tempUsername.length > 0) {
      setError("");
      dispatch(exitGame());
      dispatch(initiateGame());
      navigate("/game");
    } else {
      setError("Please Enter your username");
    }
  };
  return (
    <div className="h-lvh">
      <Header />
      <div className="flex justify-center items-center w-full h-full">
        <div className="flex flex-col items-center justify-center gap-4">
          {!openDialog ? (
            <button
              className={`px-5 py-3 bg-lime-500 rounded-md text-[#222] ${
                openDialog
                  ? "bg-slate-600 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              onClick={() => setOpenDialog(true)}
              disabled={openDialog}
            >
              Start Game
            </button>
          ) : (
            <div className="flex flex-col gap-2 items-center">
              <label htmlFor="username">Create User Name</label>
              <input
                type="text"
                id="username"
                className="border-2 border-black p-2 rounded-md"
                value={tempUsername}
                onChange={(e) => setTempUsername(e.target.value)}
                placeholder="Username"
              />
              {error && <p className="text-red-700">{error}</p>}
              <div className="flex justify-around gap-4">
                <button
                  className="px-2 py-1 bg-lime-500 rounded-md text-[#222]"
                  onClick={() => setOpenDialog(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-5 py-3 bg-lime-500 rounded-md text-[#222]"
                  onClick={playGameHandler}
                >
                  Play game
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
