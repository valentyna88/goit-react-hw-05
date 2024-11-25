import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import css from './MovieReviews.module.css';
import { fetchMovieReviews } from '../../api';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMovieReviews = async () => {
      setLoading(true);
      setError(null);
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

  const defaultImg =
    'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg';

  if (error) return <h2>{error}</h2>;
  if (!reviews || reviews.length === 0)
    return (
      <p className={css.noReviews}>No reviews available for this movie.</p>
    );

  return (
    <section>
      {loading && <Loader />}
      <ul className={css.reviewsList}>
        {reviews.length > 0 &&
          reviews.map(
            ({ id, author, content, author_details: { avatar_path } }) => (
              <li key={id} className={css.reviewItem}>
                <div className={css.reviewAuthor}>
                  <img
                    className={css.avatar}
                    src={
                      avatar_path
                        ? `https://image.tmdb.org/t/p/w500${avatar_path}`
                        : defaultImg
                    }
                    width={50}
                    alt={author}
                  />
                  <h4>{author}</h4>
                </div>
                <p className={css.text}>{content}</p>
              </li>
            )
          )}
      </ul>
    </section>
  );
};

export default MovieReviews;
