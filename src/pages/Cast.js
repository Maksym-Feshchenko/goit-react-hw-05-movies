import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL, KEY } from '../components/Api';

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
    <div className='fontSizeDet'>
      <ul className='castList'>
        {cast.map((actor) => (
          <li key={actor.id} className='castItem'>
            <img src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`} alt={actor.name} className='actorImage' />
            <div className='actorDetails'>
              <h3 className='actorName'>{actor.name}</h3>
              <p className='characterName'>{actor.character}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cast;
