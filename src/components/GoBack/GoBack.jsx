import { HiArrowLeft } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const GoBack = ({ to, children }) => {
  return (
    <Link to={to}>
      <HiArrowLeft size="24" />
      {children}
    </Link>
  );
};

export default GoBack;
