import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";

const Header = () => {
  const { isAuthenticated } = useSelector((e) => e.auth);
  const { points } = useSelector((e) => e.game.game);
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <header className="p-5 border-b-4">
      <nav className="flex justify-between items-center">
        <ul className="flex space-x-4">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/leaderboard">Leaderboard</Link>
          </li>
          <li>Total Points: {points}</li>
        </ul>

        <ul className="flex space-x-4">
          {isAuthenticated ? (
            <>
              <li className="cursor-pointer" onClick={logoutHandler}>
                Logout
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/signin">Sign In</Link>
              </li>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
