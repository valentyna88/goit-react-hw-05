import { useEffect, useState } from 'react';
import SearchBox from '../../components/SearchBox/SearchBox';
import css from './MoviesPage.module.css';
import { fetchMovies } from '../../tmdb-api';
import { useSearchParams } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import MovieList from '../../components/MovieList/MovieList';

const MoviesPage = () => {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchFilter = searchParams.get('searchFilter') ?? '';

  useEffect(() => {
    if (!searchFilter) return;
    const loadFilteredMovies = async () => {
      setLoading(true);
      try {
        const data = await fetchMovies(searchFilter);
        setFilteredMovies(data.results);
      } catch {
        setError('There are no movies with this request.');
      } finally {
        setLoading(false);
      }
    };
    loadFilteredMovies();
  }, [searchFilter]);

  const handleSearchFilter = newSearchFilter => {
    searchParams.set('searchFilter', newSearchFilter);
    setSearchParams(searchParams);
  };

  return (
    <main className={css.container}>
      <SearchBox searchFilter={searchFilter} onSearch={handleSearchFilter} />
      {loading && <Loader />}
      <MovieList filteredMovies={filteredMovies} />
      {error && <h2>{error}</h2>}
    </main>
  );
};

export default MoviesPage;
