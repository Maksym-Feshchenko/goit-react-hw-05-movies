import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL, KEY } from '../components/Api';

const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchMovieReviews = async () => {
      try {
        const response = await fetch(`${BASE_URL}/movie/${movieId}/reviews?api_key=${KEY}&language=en-US`);
        const data = await response.json();
        setReviews(data.results);
      } catch (error) {
        console.log('Error getting reviews:', error);
      }
    };

    fetchMovieReviews();
  }, [movieId]);

  return (
    <div className='fontSizeDet'>
      <ul className='reviewList'>
        {reviews.map((review) => (
          <li key={review.id} className='reviewItem'>
            <h4> * {review.author}</h4>
            <p> ∙ {review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reviews;
