import { useEffect, useState } from 'react';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import Loader from '../components/Loader/Loader';
import { fetchMovieDetails } from '../tmdb-api';
import GoBack from '../components/GoBack/GoBack';

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

  return (
    <div>
      <GoBack to={backLinkHref}>Go back</GoBack>
      <h1>{movie.title}</h1>
      <img src="" alt={movie.title} />
      <p>{movie.overview}</p>
      <p>Release Date: {movie.release_date}</p>
      <p>Rating: {movie.vote_average}</p>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
