import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation, useParams } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import { fetchMovieDetails } from '../../api';
import GoBack from '../../components/GoBack/GoBack';
import css from './MovieDetailsPage.module.css';
import clsx from 'clsx';
import DocumentTitle from '../../components/DocumentTitle';

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

  const {
    title,
    poster_path,
    overview,
    vote_average,
    genres,
    release_date,
    runtime,
  } = movie;

  const buildLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };

  return (
    <>
      <DocumentTitle>MovieDetails</DocumentTitle>
      <main className={css.container}>
        <GoBack to={backLinkHref}>Go back</GoBack>
        <div className={css.titleBlock}>
          <h2 className={css.title}>{title}</h2>
        </div>
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
            <div className={css.infoItem}>
              <h3 className={css.subtitle}>Release Year: </h3>
              <span className={css.dashedLine}></span>
              <p className={css.text}>
                {release_date ? release_date.split('-')[0] : ''}
              </p>
            </div>

            <div className={css.infoItem}>
              <h3 className={css.subtitle}>Runtime:</h3>
              <span className={css.dashedLine}></span>
              <p className={css.text}>{runtime} min</p>
            </div>

            <div className={css.infoItem}>
              <h3 className={css.subtitle}>User Score: </h3>
              <span className={css.dashedLine}></span>
              <p className={css.text}>
                {vote_average ? `${(vote_average * 10).toFixed(2)}%` : '0'}
              </p>
            </div>

            <div className={css.infoItem}>
              <h3 className={css.subtitle}>Overview: </h3>
              <span className={css.dashedLine}></span>
              <p className={css.text}>{overview}</p>
            </div>

            <div className={css.infoItem}>
              <h3 className={css.subtitle}>Genres: </h3>
              <span className={css.dashedLine}></span>
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
    </>
  );
};

export default MovieDetailsPage;
