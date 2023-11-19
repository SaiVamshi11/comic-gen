// src/ComicDisplay.js
import React from 'react';
import './ComicDisplay.css';

const ComicDisplay = ({ comicPanels }) => {
  return (
    <div className="comic-display">
      {comicPanels.map((panel, index) => (
        <div className="comic-panel" key={index}>
          <img src={panel} alt={`Comic Panel ${index + 1}`} />
        </div>
      ))}
    </div>
  );
};

export default ComicDisplay;
