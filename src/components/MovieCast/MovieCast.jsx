import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import css from './MovieCast.module.css';
import { fetchMovieCast } from '../../tmdb-api';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMovieCast = async () => {
      setLoading(true);
      try {
        const castData = await fetchMovieCast(movieId);
        setCast(castData);
      } catch {
        setError('Failed to load cast information');
      } finally {
        setLoading(false);
      }
    };
    loadMovieCast();
  }, [movieId]);

  if (loading) return <Loader />;
  if (error) return <h2>{error}</h2>;
  if (!cast) return <p>No cast information available.</p>;

  return (
    <ul className={css.castList}>
      {cast.map(({ id, name, profile_path, character }) => (
        <li key={id} className={css.castItem}>
          <img
            src={
              profile_path
                ? `https://image.tmdb.org/t/p/w200${profile_path}`
                : '/default-profile.jpg'
            }
            alt={name}
            className={css.castImage}
          />{' '}
          <p>
            {name} as {character}
          </p>
        </li>
      ))}
    </ul>
  );
};

export default MovieCast;
