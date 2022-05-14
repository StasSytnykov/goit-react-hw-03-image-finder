import style from './Button.module.css';

export const Button = ({ onLoadMore, loading }) => {
  return (
    <div className={style.ButtonThumb}>
      {!loading && (
        <button onClick={onLoadMore} className={style.Button} type="button">
          Load More
        </button>
      )}
    </div>
  );
};
