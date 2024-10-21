import { HiArrowLeft } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import css from './GoBack.module.css';

const GoBack = ({ to, children }) => {
  return (
    <div className={css.goBackWrapper}>
      <Link to={to} className={css.goBackBtn}>
        <HiArrowLeft size="24" className={css.icon} />
        {children}
      </Link>
    </div>
  );
};

export default GoBack;
