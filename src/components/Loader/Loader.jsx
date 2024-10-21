import { LineWave } from 'react-loader-spinner';
import css from './Loader.module.css';

const Loader = () => {
  return (
    <LineWave
      visible={true}
      height="100"
      width="100"
      color="DodgerBlue"
      ariaLabel="line-wave-loading"
      wrapperClass={css.loader}
    />
  );
};

export default Loader;
