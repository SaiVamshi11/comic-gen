// src/App.js
import React, { useState, useEffect } from 'react';
import ComicForm from './ComicForm';
import ComicDisplay from './ComicDisplay';
import './App.css';

function App() {
  const API_URL = "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud";
  const API_KEY = "VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM";

  const [comicPanels, setComicPanels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateComic = async (textInput) => {
    try {
      setLoading(true);
      setComicPanels([]); // Clear existing panels

      for (let i = 0; i < 10; i++) {
        const payload = { inputs: textInput };
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Accept": "image/png",
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload),
          timeout: 60000, // Increased timeout for the API call
        });

        if (!response.ok) {
          throw new Error(`Failed to generate comic: ${response.status} ${response.statusText}`);
        }

        const result = await response.blob();
        const imageUrl = URL.createObjectURL(result);

        setComicPanels((prevPanels) => [...prevPanels, imageUrl]);

        // Introduce a delay (e.g., 3 seconds) between consecutive API calls
        await new Promise((resolve) => setTimeout(resolve, 3000));
      }
    } catch (error) {
      console.error(error);
      setError("Error generating comic");
    } finally {
      setLoading(false); // Reset loading state even if an error occurs
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>Comic Generator</h1>
      </header>
      <main>
        <ComicForm generateComic={generateComic} />
        {loading && <p>Loading...</p>}
        {error && <p className="error-message">{error}</p>}
        <ComicDisplay comicPanels={comicPanels} />
      </main>
      <footer>
        <p>© 2023 Comic Generator</p>
      </footer>
    </div>
  );
}

export default App;
