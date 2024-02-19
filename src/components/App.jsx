import React, { Suspense, lazy } from 'react';
import css from '../pages/movies.module.css';
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Navigate,
} from 'react-router-dom';

const Home = lazy(() => import('../pages/Home.jsx'));
const MovieDetails = lazy(() => import('../pages/MovieDetails.jsx'));
const Movies = lazy(() => import('../pages/Movies.jsx'));
const Reviews = lazy(() => import('../pages/Reviews.jsx'));
const Cast = lazy(() => import('../pages/Cast.jsx'));
const Loader = lazy(() => import('../pages/Loader.jsx'));

function App() {
  return (
    <BrowserRouter basename="/goit-react-hw-05-movies/">
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
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/:movieId" element={<MovieDetails />} />
              <Route path="cast" element={<Cast />} />
              <Route path="reviews" element={<Reviews />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;
