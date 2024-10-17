import { Link } from 'react-router-dom';
import css from './MovieList.module.module.css';

const MovieList = ({ movies }) => {
  return (
    <ul className={css.movieList}>
      {movies.map(({ id, title, poster_path }) => (
        <li key={id} className={css.movieItem}>
          <Link to={`/movies/${id}`}>
            <img
              src={
                poster_path
                  ? `https://image.tmdb.org/t/p/w200${poster_path}`
                  : 'path-to-placeholder-image.jpg'
              }
              alt={title}
            />
            <p className={css.movieTitle}>{title}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
