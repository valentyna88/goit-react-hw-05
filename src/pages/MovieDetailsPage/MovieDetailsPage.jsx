import { Suspense, useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation, useParams } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import { fetchMovieDetails, fetchMovieReviews } from '../../api';
import GoBack from '../../components/GoBack/GoBack';
import css from './MovieDetailsPage.module.css';
import clsx from 'clsx';
import DocumentTitle from '../../components/DocumentTitle';
import MovieDetails from '../../components/MovieDetails/MovieDetails';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reviewCount, setReviewCount] = useState(0);

  const location = useLocation();
  const backLinkHref = location.state ?? '/movies';

  useEffect(() => {
    const loadMovieDetails = async () => {
      setLoading(true);
      try {
        const movieDetails = await fetchMovieDetails(movieId);
        setMovie(movieDetails);

        const reviewsData = await fetchMovieReviews(movieId);
        setReviewCount(reviewsData.length);
      } catch {
        setError(
          'Failed to load movie details or reviews. Please try again later.'
        );
      } finally {
        setLoading(false);
      }
    };
    loadMovieDetails();
  }, [movieId]);

  if (loading) return <Loader />;
  if (error) return <h2>{error}</h2>;
  if (!movie) return null;

  const buildLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };

  return (
    <>
      <DocumentTitle>MovieDetails</DocumentTitle>
      <main className={css.container}>
        <GoBack to={backLinkHref}>Go back</GoBack>

        <MovieDetails movie={movie} reviewCount={reviewCount} />

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
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
};

export default MovieDetailsPage;
