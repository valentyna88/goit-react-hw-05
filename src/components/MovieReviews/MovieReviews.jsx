import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import css from './MovieReviews.module.css';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMovieReviews = async () => {
      setLoading(true);
      try {
        const reviewsData = await fetchMovieReviews(movieId);
        setReviews(reviewsData);
      } catch {
        setError('Failed to load reviews');
      } finally {
        setLoading(false);
      }
    };
    loadMovieReviews();
  }, [movieId]);

  if (loading) return <Loader />;
  if (error) return <h2>{error}</h2>;
  if (reviews.length === 0) return <p>No reviews available for this movie.</p>;

  return (
    <ul className={css.reviewsList}>
      {reviews.map(({ id, author, content }) => (
        <li key={id} className={css.reviewItem}>
          <h3>Review by {author}</h3>
          <p>{content}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieReviews;
