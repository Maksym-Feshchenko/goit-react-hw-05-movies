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
        const apiKey = '56a1158049e37c9be6acff13320da327';
        const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();
        setMovieDetails(data);
        setLoading(false);
      } catch (error) {
        console.log('Failed to fetch movie details:', error);
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
        <div className='movieDetailsCard'>
        <h1>{movieDetails.title}</h1>
        <img src={`https://image.tmdb.org/t/p/w200/${movieDetails.poster_path}`} alt={movieDetails.title} />
        <p>Ganres: {movieDetails.genres.map((genre) => genre.name).join(', ')}</p>
        <p>Overview: {movieDetails.overview}</p>
        <p>User score: {movieDetails.vote_average.toFixed(1)}/10</p>
        <p>Release Date: {movieDetails.release_date}</p>
        </div>

        <ul>
          <li className='list'>
          <button onClick={handleToggleCast} className='button'>Cast</button>
        {showCast && <Cast movieId={movieId} />}
          </li>
          <li className='list'>
          <button onClick={handleToggleReviews} className='button'>Reviews</button>
      {showReviews && <Reviews movieId={movieId} />}
          </li>
        </ul>
    </div>
  );
};

export default MovieDetails;
