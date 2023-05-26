import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Cast from '../pages/Cast';
import Reviews from '../pages/Reviews';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showCast, setShowCast] = useState(false);
  const [showReviews, setShowReviews] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const apiKey = '56a1158049e37c9be6acff13320da327'; // Замініть на свій API ключ
        const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();
        setMovieDetails(data);
        setLoading(false);
      } catch (error) {
        console.log('Помилка при отриманні інформації про фільм:', error);
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!movieDetails) {
    return <div>Failed to fetch movie details.</div>;
  }

  const handleToggleCast = () => {
    setShowCast(!showCast);
  };

  const handleToggleReviews = () => {
    setShowReviews(!showReviews);
  };

  return (
    <div>
        
        <h1>{movieDetails.title}</h1>
        <img src={`https://image.tmdb.org/t/p/w200/${movieDetails.poster_path}`} alt={movieDetails.title} />
        <p>Ganres: {movieDetails.genres.map((genre) => genre.name).join(', ')}</p>
        <p>Overview: {movieDetails.overview}</p>
        <p>User score: {movieDetails.vote_average* 10}%</p>
        <p>Release Date: {movieDetails.release_date}</p>

        <button onClick={handleToggleCast}>Показати акторський склад</button>
        {showCast && <Cast movieId={movieId} />}

      <button onClick={handleToggleReviews}>Показати огляди</button>
      {showReviews && <Reviews movieId={movieId} />}
    </div>
  );
};

export default MovieDetails;
