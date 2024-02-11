import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import css from './movies.module.css';
import PropTypes from 'prop-types'; 

function Cast() {
  const [cast, setCast] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=55b41f82a3d9f463669460bf70677f68`
        );
        const data = await response.json();
        setCast(data.cast);
      } catch (error) {
        console.error('Error fetching cast', error);
      }
    };
    fetchCast();
  }, [movieId]);

  return (
    <div>
      <h3 className={css['page-header']}>Cast</h3>
      <ul className={css['cast-list']}>
        {cast.map(actor => (
          <li key={actor.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
              alt={actor.name}
              className={css['actor-image']}
            />
            <p className={css.actor}>{actor.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

Cast.propTypes = {
    movieId: PropTypes.string.isRequired,
  };
  
export default Cast;
