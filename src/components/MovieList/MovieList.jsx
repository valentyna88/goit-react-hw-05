import { Link } from 'react-router-dom';
import css from './MovieList.module.css';

const MovieList = ({ movies }) => {
  return (
    <div className={css.container}>
      <ul className={css.movieList}>
        {movies.map(({ id, title, poster_path }) => (
          <li key={id} className={css.movieItem}>
            <Link to={`/movies/${id}`}>
              <img
                className={css.moviePoster}
                src={
                  poster_path
                    ? `https://image.tmdb.org/t/p/w500${poster_path}`
                    : 'path-to-placeholder-image.jpg'
                }
                alt={title}
              />
              <p className={css.movieTitle}>{title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
