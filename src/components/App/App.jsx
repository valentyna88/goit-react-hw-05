import { Route, Routes } from 'react-router-dom';
import HomePage from '../../pages/HomePage';
import MoviesPage from '../../pages/MoviesPage';
import NotFoundPage from '../../pages/NotFoundPage';
import MovieDetailsPage from '../../pages/MovieDetailsPage';
import MovieCast from '../MovieCast/MovieCast';
import MovieReviews from '../MovieReviews/MovieReviews';
import './App.module.css';

function App() {
  return (
    <div>
      <h1>App is rendering</h1>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
          <Route path="cast" element={<MovieCast />} />
          <Route path="reviews" element={<MovieReviews />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
