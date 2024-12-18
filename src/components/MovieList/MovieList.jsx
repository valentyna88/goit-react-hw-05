import { Link, useLocation } from 'react-router-dom';
import css from './MovieList.module.css';

const MovieList = ({ movies }) => {
  const location = useLocation();
  const defaultImg =
    'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg';
  return (
    <ul className={css.movieList}>
      {Array.isArray(movies) &&
        movies.map(({ id, title, poster_path }) => (
          <li key={id} className={css.movieItem}>
            <Link to={`/movies/${id}`} state={location}>
              <div>
                <img
                  className={css.img}
                  src={
                    poster_path
                      ? `https://image.tmdb.org/t/p/w500${poster_path}`
                      : defaultImg
                  }
                  width={250}
                  alt="poster"
                />
              </div>
              <div>
                <p className={css.movieTitle}>{title}</p>
              </div>
            </Link>
          </li>
        ))}
    </ul>
  );
};

export default MovieList;
