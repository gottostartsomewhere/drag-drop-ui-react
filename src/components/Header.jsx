import React from 'react';

const Header = ({ addCard, toggleConnectMode }) => {
  return (
    <div className="flex items-center justify-between bg-white text-blue-500 p-4 rounded-2xl w-4/5 mx-auto mt-6  ">
      <h1 className="text-3xl font-bold">Card Canvas</h1>
      <div className="flex space-x-4">
        <button 
          className="bg-white text-blue-500 px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 shadow-lg hover:shadow-2xl"
          onClick={addCard}
        >
          Add Card
        </button>
        <button 
          className="bg-white text-blue-500 px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 shadow-lg hover:shadow-2xl"
          onClick={toggleConnectMode}
        >
          {toggleConnectMode ? 'Start / Stop Connecting' : 'Connect'}
        </button>
      </div>
    </div>
  );
};

export default Header;
