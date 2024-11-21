import { useEffect, useState } from 'react';
import { fetchTrendingMovies } from '../../api';
import MovieList from '../../components/MovieList/MovieList';
import Loader from '../../components/Loader/Loader';
import DocumentTitle from '../../components/DocumentTitle';
import css from './HomePage.module.css';

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

  return (
    <>
      <DocumentTitle>Home</DocumentTitle>
      <main className={css.container}>
        <h1 className={css.title}>Trending today</h1>
        <MovieList movies={movies} />
        {loading && <Loader />}
        {error && <h2>{error}</h2>}
      </main>
    </>
  );
};

export default HomePage;
