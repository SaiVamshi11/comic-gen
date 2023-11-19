// src/ComicDisplay.js
import React from 'react';

function ComicDisplay({ comicPanels }) {
  return (
    <div>
      {comicPanels.map((imageUrl, index) => (
        <img key={index} src={imageUrl} alt={`Comic Panel ${index + 1}`} />
      ))}
    </div>
  );
}

export default ComicDisplay;
