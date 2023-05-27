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
        <div className='homePage'>
            <h1 className='titleTranding'>Trending today</h1>
            <MoviesDetails movies={movies} />
        </div>
    );
};