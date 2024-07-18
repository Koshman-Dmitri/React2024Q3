import { clearFavorite } from '../../app/slices/favoriteSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import styles from './FlyOut.module.css';

export function FlyOut() {
  const count = useAppSelector((state) => state.favorite.length);
  const dispatch = useAppDispatch();

  const handlerDownload = (): void => {
    console.log('TODO download');
  };

  return (
    <div className={count ? `${styles.flyOut} ${styles.active}` : styles.flyOut}>
      <p className={styles.title}>
        <span className={styles.counter}>{count}</span> {count > 1 ? 'items are' : 'item is'}{' '}
        sellected
      </p>
      <div className={styles.buttonWrapper}>
        <button className={styles.btnClear} type="button" onClick={() => dispatch(clearFavorite())}>
          Unsellect all
        </button>
        <button className={styles.btnDownload} type="button" onClick={handlerDownload}>
          Download
        </button>
      </div>
    </div>
  );
}
