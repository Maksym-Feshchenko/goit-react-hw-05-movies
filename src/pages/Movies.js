import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IMAGE_URL } from '../components/Api';

const Movies = () => {
  const [searchQuery, setSearchParams] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (searchQuery.trim() === '') {
      setError('Start typing to search for a movie');
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
        setError('Error while searching for movies');
      }
    } catch (error) {
      setError('Error while searching for movies');
    }
  };

  const handleResetSearch = () => {
    setSearchParams('');
    setSearchResults([]);
    setError(null);
  };

  const handleInputChange = (e) => {
    setSearchParams(e.target.value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch();
    }, 500);
  
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  return (
    <div className='searchMovie'>
      <input
        className='searchInput'
        type='text'
        value={searchQuery}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch} className='btnSearchBar'>Search</button>
      <button onClick={handleResetSearch} className='btnSearchBar'>Remove</button>
      {error && <div>{error}</div>}
      <ul className='searchList'>
        {searchResults.map((movie) => (
          <li key={movie.id} className='movieSearch'>
         
            <Link to={`/movies/${movie.id}`}> 
              <img
                src={IMAGE_URL + movie.poster_path}
                alt={movie.title}
                width={150}
              />
               {movie.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Movies;
