import Game from "./pages/Game";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllScores } from "./store/asyncActions";
import Leaderboard from "./pages/Leaderboard";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllScores());
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </div>
  );
}
