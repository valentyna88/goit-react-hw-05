import { HiSearch } from 'react-icons/hi';
import css from './SearchBox.module.css';

const SearchBox = ({ filter, onSearch }) => {
  return (
    <div className={css.searchBox}>
      <input
        className={css.input}
        placeholder="Search movie"
        autoComplete="off"
        autoFocus
        name={filter}
        onChange={e => onSearch(e.target.value)}
      />
      <HiSearch className={css.icon} size={24} />
    </div>
  );
};

export default SearchBox;
