import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation, useParams } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import { fetchMovieDetails } from '../../tmdb-api';
import GoBack from '../../components/GoBack/GoBack';
import css from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const location = useLocation();
  const backLinkHref = location.state ?? '/';
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

  return (
    <div className={css.card}>
      <GoBack to={backLinkHref}>Go back</GoBack>
      <div className={css.cardWrapper}>
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
          <h2>{title}</h2>
          <div>
            <h3>Release Year: </h3>
            <p>{release_date ? release_date.split('-')[0] : 'N/A'}</p>
          </div>
          <div>
            <h3>User Score: </h3>
            <p>{vote_average ? `${vote_average * 10}%` : 'N/A'}</p>
          </div>
          <div>
            <h3>Overview: </h3>
            <p>{overview}</p>
          </div>
          <div>
            <h3>Rating: </h3>
            <p>{vote_average}</p>
          </div>
          <div>
            <h3>Genres: </h3>
            <ul>
              {genres && genres.length > 0 ? (
                genres.map(genre => <li key={genre.id}>{genre.name}</li>)
              ) : (
                <li>No genres available</li>
              )}
            </ul>
          </div>
        </div>
      </div>
      <div className={css.links}>
        <p>Additional information</p>
        <ul>
          <li>
            <NavLink to="cast">Cast</NavLink>
          </li>
          <li>
            <NavLink to="reviews">Reviews</NavLink>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
