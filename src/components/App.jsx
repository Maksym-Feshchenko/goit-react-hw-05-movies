import React, { Suspense } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';

const Home = React.lazy(() => import('../pages/Home'));
const Movies = React.lazy(() => import('../pages/Movies'));
const MovieDetails = React.lazy(() => import('../pages/MovieDetails'));

export const App = () => {
  return (
    <div
      style={{
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
      }}
    >
      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-item">
            <NavLink to='/' className="nav-link">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to='/movies' className="nav-link">Movies</NavLink>
          </li>
        </ul>
      </nav>

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:movieId" element={<MovieDetails />} />
        </Routes>
      </Suspense>
    </div>
  );
};
