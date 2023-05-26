import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Movies = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (searchQuery.trim() === '') {
      setError('Будь ласка, введіть дійсний пошуковий запит');
      return;
    }

    try {
      const apiKey = '56a1158049e37c9be6acff13320da327';
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}`;
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        setSearchResults(data.results);
        setError(null);
      } else {
        setError('Помилка при пошуку фільмів');
      }
    } catch (error) {
      setError('Помилка при пошуку фільмів');
    }
  };

  const handleResetSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setError(null);
  };

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Шукати</button>
      <button onClick={handleResetSearch}>Скинути</button>
      {error && <div>{error}</div>}
      <ul>
        {searchResults.map((movie) => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Movies;
