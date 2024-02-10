import React, { useEffect, useState } from 'react';
import css from './movies.module.css';

function Home() {
  const [trendingMovies, setTrendingMovies] = useState([]);

  //NOTATKA
  //https://developer.themoviedb.org/reference/trending-movies
  // Na tej stronie kliknąć 'Try it!', wswietli się przykładowa odpowiedź z GET. Tam widać, że odpowiedź jest tablicą o nazwie 'results'. Dlatego w kodzie jest data.results

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await fetch(
          'https://api.themoviedb.org/3/trending/movie/day?api_key=55b41f82a3d9f463669460bf70677f68'
        );
        const data = await response.json();
        setTrendingMovies(data.results);
      } catch (error) {
        console.error('Error fetching trending movies', error);
      }
    };

    fetchTrendingMovies();
  }, []);

  // podczas renderowania linku do konkretnego filmu używam wzorca ścieżki '/movies/:movieId' ale dynamiczny parametr zastępuję rzeczywistym identyfikatorem, czyli 'movie.id'
  return (
    <div>
      <h2 className={css['page-header']}>Trending Movies</h2>
      <ul className={css['movie-list']}>
        {trendingMovies.map(movie => (
          <li key={movie.id} className={css['movie-item']}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title} className={css['movie-image']}
            />
            <a href={`/movies/${movie.id}`}>{movie.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
