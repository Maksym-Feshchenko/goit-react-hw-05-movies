import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL, KEY} from '../components/Api';

const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchMovieCast = async () => {
      try {
        const response = await fetch(`${BASE_URL}/movie/${movieId}/credits?api_key=${KEY}&language=en-US`);
        const data = await response.json();
        setCast(data.cast);
      } catch (error) {
        console.log('Error getting cast information:', error);
      }
    };

    fetchMovieCast();
  }, [movieId]);

  return (
    <div>
      <h1>Cast</h1>
      <ul>
        {cast.map((actor) => (
          <li key={actor.id}>{actor.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Cast;
