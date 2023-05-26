import { useState, useEffect } from 'react';
import MoviesDetails from '../components/MoviesGallery/MoviesGallery';
import { fetchTrendingMovies } from '../components/Api';

export default function HomePage() {
    const [movies, setMovies] = useState([]);
    
    useEffect(() => {
        fetchTrendingMovies()
            .then(request => setMovies(request.results)
            );
    }, [])

    return (
        <>
            <h1>Trending today</h1>

            <MoviesDetails movies={movies} />
        </>
    );
};