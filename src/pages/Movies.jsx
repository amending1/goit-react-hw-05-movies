import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import css from './movies.module.css';

function Movies() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&api_key=55b41f82a3d9f463669460bf70677f68`
      );
      const data = await response.json();
      setSearchResults(data.results);
    } catch (error) {
      console.error('Error fetching search results', error);
    }
  };
  return (
    <div>
      <h2 className={css['page-header']}>Search Movie</h2>
      <form onSubmit={handleSearch}>
      <input
        type="text"
        value={searchQuery}
        onChange={event => setSearchQuery(event.target.value)}
        className={css['search-input']}
      />
      <button onClick={handleSearch} className={css['search-button']}>
        Search
      </button>
      </form>
      <ul className={css['movie-list']}>
        {searchResults.map(movie => (
          <li key={movie.id} className={css['movie-item']}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className={css['movie-image']}
            />{' '}
            <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Movies;
