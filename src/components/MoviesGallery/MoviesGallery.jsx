import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IMAGE_URL } from '../Api';

const MoviesGallery = ({ movies }) => {
  const location = useLocation();

  return (
    <ul className='trandingList'>
      {movies.map((movie) => {
        // Перевірка наявності заголовка та постеру фільму
        if (!movie.title || !movie.poster_path) {
          return null; // Пропустити рендеринг фільму
        }

        return (
          <li key={movie.id} className='trandingCard'>
            <Link
              to={{
                pathname: `/movies/${movie.id}`,
                state: { from: location },
              }}
            >
              <h4 className='movieTitle'>{movie.title}</h4>
              <img
                src={IMAGE_URL + movie.poster_path}
                alt={movie.title}
                width={300}
              />

            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default MoviesGallery;
