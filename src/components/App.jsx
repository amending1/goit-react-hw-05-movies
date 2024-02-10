import React from 'react';
import css from '../pages/movies.module.css';
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Navigate,
} from 'react-router-dom';
import Home from '../pages/Home.jsx';
import Cast from '../pages/Cast.jsx';
import MovieDetails from '../pages/MovieDetails.jsx';
import Movies from '../pages/Movies.jsx';
import Reviews from '../pages/Reviews.jsx';

function App() {
  return (
    <BrowserRouter>
      <div className={css.container}>
        <nav className={css.navbar}>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/movies">Movies</NavLink>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path='/movies/:movieId' element={<MovieDetails />} />
          <Route path='/movies/:movieId/cast' element={<Cast/>} />
          <Route path='/movies/:movieId/reviews' element={<Reviews />} />
          <Route path='*' element={<Navigate to="/" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
