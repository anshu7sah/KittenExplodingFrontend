import React from "react";

const CurrentCard = ({ card }) => {
  return (
    <div className="w-48 h-64 border-2 border-lime-500 p-3 rounded-lg shadow-md bg-white">
      <div className="flex flex-col h-full items-center justify-center">
        <span className="text-5xl">{card.icon}</span>
        <p className="text-lg font-bold text-gray-800 mt-4">{card.name}</p>
      </div>
    </div>
  );
};

export default CurrentCard;
