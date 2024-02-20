import React, { useState } from "react";
import { useSelector } from "react-redux";

const Leaderboard = () => {
  const { leaderboard } = useSelector((e) => e.game.game);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = leaderboard.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Leaderboard</h2>

      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="py-2">Username</th>
            <th className="py-2">Email</th>
            <th className="py-2">Points</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="py-2">{item.username}</td>
              <td className="py-2">{item.email}</td>
              <td className="py-2">{item.points}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4">
        <ul className="flex space-x-2">
          {Array.from(
            { length: Math.ceil(leaderboard.length / itemsPerPage) },
            (_, index) => (
              <li
                key={index}
                onClick={() => paginate(index + 1)}
                className={`cursor-pointer px-3 py-2 rounded-md ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                {index + 1}
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export default Leaderboard;
