import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import css from './movies.module.css';
import PropTypes from 'prop-types'; 

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=55b41f82a3d9f463669460bf70677f68`
        );
        const data = await response.json();
        setReviews(data.results);
      } catch (error) {
        console.error('Erroe fetching reviews', error);
      }
    };
    fetchReviews();
  }, [movieId]);
  return (
    <div>
      <h2>Reviews</h2>
      <ul className={css['review']}>
        {reviews.map(review => (
          <li key={review.id} className={css['review']} >
            <p className={css['review-author']}>Author: {review.author}</p>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

Reviews.propTypes = {
    movieId: PropTypes.string.isRequired,
  };

export default Reviews;
