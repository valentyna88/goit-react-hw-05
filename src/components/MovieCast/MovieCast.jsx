import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import css from './MovieCast.module.css';
import { fetchMovieCast } from '../../api';

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

  const defaultImg =
    'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg';

  if (error) return <h2>{error}</h2>;
  if (!cast) return <p>No cast information available.</p>;

  return (
    <ul className={css.castList}>
      {loading && <Loader />}
      {cast.map(({ id, name, profile_path, character }) => (
        <li key={id} className={css.castItem}>
          <img
            src={
              profile_path
                ? `https://image.tmdb.org/t/p/w200${profile_path}`
                : defaultImg
            }
            width={150}
            alt={name}
            className={css.castImage}
          />
          <div className={css.castInfo}>
            <h3 className={css.name}>{name}</h3>
            <p className={css.character}>{character}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MovieCast;
