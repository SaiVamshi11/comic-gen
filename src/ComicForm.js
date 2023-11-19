// src/ComicForm.js
import React, { useState } from 'react';

function ComicForm({ generateComic }) {
  const [textInput, setTextInput] = useState('');

  const handleInputChange = (e) => {
    setTextInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    generateComic(textInput);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Text Input:
        <textarea value={textInput} onChange={handleInputChange} />
      </label>
      <button type="submit">Generate Comic</button>
    </form>
  );
}

export default ComicForm;
