import React, { useEffect, useState } from 'react';
import { useParams, Routes, Route, Link } from 'react-router-dom';
import Cast from './Cast';
import Reviews from './Reviews';
import css from './movies.module.css';
import PropTypes from 'prop-types'; 

function MovieDetails() {
  const [movieDetails, setMovieDetails] = useState(null);
  //useParams() umożliwia dostęp do parametrów przekazywanych do ścieżki URL w aplikacji
  //movieId jest parametrem pobieranym z aktualnego adresu URL. Np. jeśli mam ścieżkę "/movies/123", gdzie "123" to id filmu, movieId będzie miało wartość "123"
  const { movieId } = useParams();

  //https://developer.themoviedb.org/reference/movie-details - stąd wzięłam URL API
  // za każdym razem, gdy wartość movieId zostanie zaktualizowana (tablica zależności [movieId]) np. gdy użytkownik przejdzie do nowego filmu w aplikacji - zostanie pobrany nowy zestaw szczegółów filmu
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=55b41f82a3d9f463669460bf70677f68`
        );
        const data = await response.json();
        setMovieDetails(data);
      } catch (error) {
        console.error('Error fetching movie details', error);
      }
    };

    fetchMovieDetails();
    //Linijka fetchMovieDetails() jest tu potrzebna, bo chcę, żeby od razu po załadowaniu  komponentu zostały pobrane szczegóły filmu i wyświetlone. Bez tej linijki, funkcja fetchMovieDetails nie zostanie wykonana automatycznie po pierwszym razie. To samo będzie działo się za każdym razem, kiedy movieId się zmieni - wywołuje funkcję fetchMovieDetails, żebym mogła mieć aktualne informacje o filmie
  }, [movieId]);

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className={css['movie-details-container']}>
      <div className={css['movie-details']}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
          alt={movieDetails.title}
          className={css['movie-poster']}
        />
        <div>
          <h2 className={css['page-header']}>{movieDetails.title}</h2>
          <p>{movieDetails.overview}</p>
          <p>Rating: {movieDetails.vote_average}</p>
          <p>
            Genres: {movieDetails.genres.map(genre => genre.name).join(', ')}
          </p>
          <nav className={css['additional-info']}>
            <h3 className={css['page-header']}>Additional information</h3>
            <ul>
              <li>
                <Link to={`/movies/${movieId}/cast`}>Cast</Link>
              </li>
              <li>
                <Link to={`/movies/${movieId}/reviews`}>Reviews</Link>
              </li>
            </ul>
          </nav>{' '}
        </div>
      </div>

      <Routes>
        <Route path="cast" element={<Cast />} />
        {/* path="reviews" mówi, że ścieżka URL musi kończyć się na /reviews, aby wyrenderować komponent Reviews. */}
        <Route path="reviews" element={<Reviews />} />
      </Routes>
    </div>
  );
}

MovieDetails.propTypes = {
    movieId: PropTypes.string.isRequired,
  };

export default MovieDetails;
