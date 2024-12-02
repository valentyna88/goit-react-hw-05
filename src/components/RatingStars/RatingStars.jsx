import { FaStar, FaRegStar } from 'react-icons/fa';
import css from './RatingStars.module.css';

const RatingStars = ({ rating }) => {
  const fullStars = Math.floor(rating / 2);
  const emptyStars = 5 - fullStars;

  return (
    <div className={css.stars}>
      {Array(fullStars)
        .fill()
        .map((_, index) => (
          <FaStar key={index} className={css.starFilled} />
        ))}
      {Array(emptyStars)
        .fill()
        .map((_, index) => (
          <FaRegStar key={index + fullStars} className={css.starEmpty} />
        ))}
    </div>
  );
};

export default RatingStars;
