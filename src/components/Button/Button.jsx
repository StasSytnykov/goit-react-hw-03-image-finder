import { ThreeCircles } from 'react-loader-spinner';
import style from './Button.module.css';

export const Button = ({ onLoadMore, loading }) => {
  return (
    <div className={style.ButtonThumb}>
      {loading ? (
        <ThreeCircles
          color="#3f51b5"
          height={110}
          width={110}
          ariaLabel="three-circles-rotating"
        />
      ) : (
        <button onClick={onLoadMore} className={style.Button} type="button">
          Load More
        </button>
      )}
    </div>
  );
};
