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

  const handleSearchFilter = newSearchFilter => {
    searchParams.set('searchFilter', newSearchFilter);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    if (!searchFilter) return;
    const loadFilteredMovies = async () => {
      try {
        setLoading(true);
        const data = await fetchMovies(searchFilter);
        if (data.length === 0) {
          setError('There are no movies with this request. Please, try again');
          return;
        }
        setFilteredMovies(data);
      } catch {
        setError('There are no movies with this request.');
      } finally {
        setLoading(false);
      }
    };
    loadFilteredMovies();
  }, [searchFilter]);

  return (
    <main className={css.container}>
      {loading && <Loader />}
      <SearchBox filter={searchFilter} onSearch={handleSearchFilter} />

      {!loading && !error && <MovieList movies={filteredMovies} />}
    </main>
  );
};

export default MoviesPage;