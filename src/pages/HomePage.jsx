import { useEffect, useState } from 'react';
import { fetchTrendingMovies } from '../tmdb-api';
import MovieList from '../components/MovieList/MovieList';
import Loader from '../components/Loader/Loader';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      try {
        const trendingMovies = await fetchTrendingMovies();
        setMovies(trendingMovies);
      } catch {
        setError('Failed to load movies. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    loadMovies();
  }, []);

  if (loading) return <Loader />;
  if (error) return <h2>{error}</h2>;

  return (
    <div>
      <h1>Trending today</h1>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
