import React from 'react';

const DetailedPopup = ({ card, onClose }) => {
  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>Card Details</h2>
        <p>{card.text}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default DetailedPopup;
