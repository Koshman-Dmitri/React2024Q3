import { clearFavorite } from '../../app/slices/favoriteSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { useTheme } from '../../hooks/useTheme';
import { createCsvHref } from '../../utils/createCsvHref';
import styles from './FlyOut.module.css';

export function FlyOut() {
  const { isLight } = useTheme();
  const favorite = useAppSelector((state) => state.favorite);
  const dispatch = useAppDispatch();

  const count = favorite.length;

  const activeClassName = count ? `${styles.flyOut} ${styles.active}` : styles.flyOut;
  const className = isLight ? activeClassName : `${activeClassName} ${styles.dark}`;

  return (
    <div className={className}>
      <p className={styles.title}>
        <span className={styles.counter}>{count}</span> {count > 1 ? 'items are' : 'item is'}{' '}
        sellected
      </p>
      <div className={styles.buttonWrapper}>
        <button className={styles.btnClear} type="button" onClick={() => dispatch(clearFavorite())}>
          Unsellect all
        </button>
        <button className={styles.btnDownload} type="button">
          <a
            className={styles.linkDownload}
            href={createCsvHref(favorite)}
            download={`${count}_astrObject.csv`}
          >
            Download
          </a>
        </button>
      </div>
    </div>
  );
}
