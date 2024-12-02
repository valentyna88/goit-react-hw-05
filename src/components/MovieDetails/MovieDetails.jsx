import { FaRegCommentDots } from 'react-icons/fa';
import RatingStars from '../../components/RatingStars/RatingStars';
import css from './MovieDetails.module.css';

const MovieDetails = ({ movie, reviewCount }) => {
  const {
    title,
    poster_path,
    overview,
    vote_average,
    genres,
    release_date,
    runtime,
    production_countries,
  } = movie;

  return (
    <>
      <div className={css.titleBlock}>
        <h2 className={css.title}>{title}</h2>
        <RatingStars rating={vote_average} />
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
            <h3 className={css.subtitle}>Production:</h3>
            <span className={css.dashedLine}></span>
            <p className={css.text}>
              {production_countries && production_countries.length > 0
                ? production_countries.map(country => country.name).join(', ')
                : 'No information available'}
            </p>
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

          <div className={css.commentsBlock}>
            <FaRegCommentDots className={css.commentIcon} />
            <span>
              {reviewCount > 0
                ? `${reviewCount} Review${reviewCount > 1 ? 's' : ''}`
                : 'No reviews yet'}
            </span>
          </div>
        </div>
      </section>
    </>
  );
};

export default MovieDetails;
