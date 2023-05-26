import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IMAGE_URL } from '../Api';

const MoviesGallery = ({ movies }) => {
    const location = useLocation();
    return (
        <ul>
            {movies.map(movie => (
                <li key={movie.id}>
                
                    <Link to={{
                        pathname: `/movies/${movie.id}`,
                        state: {from: location},
                    }}>

                        <img src={IMAGE_URL + movie.poster_path} alt={movie.title} width={400}/>
                        <p>{movie.title}</p>
                </Link>
            </li>
            ))}
        </ul>
    );
};

export default MoviesGallery;