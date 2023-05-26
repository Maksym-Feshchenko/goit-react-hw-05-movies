export const BASE_URL = 'https://api.themoviedb.org/3';
export const KEY = '56a1158049e37c9be6acff13320da327';
export const IMAGE_URL = 'https://image.tmdb.org/t/p/w500'

async function fetchWithErrorHandling(url = '', config = {}) {
    const response = await fetch(url, config);
    return response.ok
        ? await response.json()
        : Promise.reject(new Error('Not fond'));
}

export function fetchTrendingMovies() {
    return fetchWithErrorHandling(`${BASE_URL}/trending/all/day?api_key=${KEY}`);
}

export function fetchMoviesId(movieId) {
    return fetchWithErrorHandling(`${BASE_URL}/movie/${movieId}?api_key=${KEY}&language=en-US`);
}

export function fetchMovieSearch(query) {
    return fetchWithErrorHandling(`${BASE_URL}/search/movie?api_key=${KEY}&query=${query}&language=en-US&page=1&include_adult=false`);
}

export function fetchMovieCast(movieId) {
    return fetchWithErrorHandling(`${BASE_URL}/movie/${movieId}/credits?api_key=${KEY}&language=en-US`);
}

export function fetchMovieReviews(movieId) {
    return fetchWithErrorHandling(`${BASE_URL}/movie/${movieId}/reviews?api_key=${KEY}&language=en-US`);
}
