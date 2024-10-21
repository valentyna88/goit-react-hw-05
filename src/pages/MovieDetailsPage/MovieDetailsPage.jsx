import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation, useParams } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import { fetchMovieDetails } from '../../api';
import GoBack from '../../components/GoBack/GoBack';
import css from './MovieDetailsPage.module.css';
import clsx from 'clsx';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const location = useLocation();
  const backLinkHref = location.state ?? '/movies';
  useEffect(() => {
    const loadMoviesDetails = async () => {
      setLoading(true);
      try {
        const movieDetails = await fetchMovieDetails(movieId);
        setMovie(movieDetails);
      } catch {
        setError('Failed to load movie details');
      } finally {
        setLoading(false);
      }
    };
    loadMoviesDetails();
  }, [movieId]);

  if (loading) return <Loader />;
  if (error) return <h2>{error}</h2>;
  if (!movie) return null;

  const { title, poster_path, overview, vote_average, genres, release_date } =
    movie;

  const buildLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };

  return (
    <main className={css.container}>
      <GoBack to={backLinkHref}>Go back</GoBack>
      <h2 className={css.title}>{title}</h2>
      <section className={css.cardWrapper}>
        <img
          className={css.poster}
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : 'path-to-placeholder-image.jpg'
          }
          alt={title}
        />
        <div className={css.infoWrapper}>
          <h3 className={css.subtitle}>Release Year: </h3>
          <p className={css.text}>
            {release_date ? release_date.split('-')[0] : ''}
          </p>

          <h3 className={css.subtitle}>User Score: </h3>
          <p className={css.text}>
            {vote_average ? `${(vote_average * 10).toFixed(2)}%` : '0'}
          </p>

          <h3 className={css.subtitle}>Overview: </h3>
          <p className={css.text}>{overview}</p>

          <h3 className={css.subtitle}>Genres: </h3>
          <ul className={css.list}>
            {genres && genres.length > 0 ? (
              genres.map(genre => (
                <li className={css.item} key={genre.id}>
                  {genre.name}
                </li>
              ))
            ) : (
              <li className={css.item}>No genres available</li>
            )}
          </ul>
        </div>
      </section>

      <ul className={css.infoLinks}>
        <li>
          <NavLink
            to="cast"
            className={buildLinkClass}
            state={{ ...location.state }}
          >
            Cast
          </NavLink>
        </li>
        <li>
          <NavLink
            to="reviews"
            className={buildLinkClass}
            state={{ ...location.state }}
          >
            Reviews
          </NavLink>
        </li>
      </ul>

      <Outlet />
    </main>
  );
};

export default MovieDetailsPage;
