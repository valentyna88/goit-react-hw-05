import { HiSearch } from 'react-icons/hi';
import css from './SearchBox.module.css';

const SearchBox = ({ filter, onSearch }) => {
  return (
    <div className={css.wrapper}>
      <HiSearch className={css.icon} />
      <input
        className={css.input}
        type="text"
        placeholder="Search movie"
        autoComplete="off"
        autoFocus
        name={filter}
        onChange={e => onSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBox;
