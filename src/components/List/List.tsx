import { Link } from '@remix-run/react';
import { ChangeEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ApiElement } from '../../services/ST-API/api.types';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { useCloseDetails } from '../../hooks/useCloseDetails';
import { useTheme } from '../../hooks/useTheme';
import { addFavorite, deleteFavorite } from '../../app/slices/favoriteSlice';
import styles from './List.module.css';

export function List({ listData }: { listData: ApiElement[] }) {
  const [queryParams, setQueryParams] = useSearchParams();
  const { closeDetails } = useCloseDetails();
  const { isLight } = useTheme();

  const favorite = useAppSelector((state) => state.favorite);
  const dispatch = useAppDispatch();

  const handlerElementClick = (id: string): void => {
    const page = queryParams.get('page') || '';
    setQueryParams({ page, details: id });
  };

  const handlerFavoriteChange = (event: ChangeEvent<HTMLInputElement>, el: ApiElement): void => {
    if (event.target.checked) {
      let url = window.location.href;

      if (!url.includes('detail?')) {
        url = url.split('?').join(url.includes('/?') ? 'detail?' : '/detail?');
      }

      dispatch(addFavorite({ ...el, url }));
    } else {
      dispatch(deleteFavorite(el.uid));
    }
  };

  const listElements = listData.length ? (
    listData.map((el) => {
      const isChecked = Boolean(favorite.find((fav) => fav.uid === el.uid));

      return (
        <li
          key={el.uid}
          className={styles.listElement}
          role="presentation"
          onClick={() => handlerElementClick(el.uid)}
        >
          <input
            type="checkbox"
            className={styles.checkBox}
            checked={isChecked}
            onChange={(event) => handlerFavoriteChange(event, el)}
          />
          {el.name && (
            <Link to="detail" className={styles.link}>
              Name: <span className={styles.valueText}>{el.name}</span>
            </Link>
          )}
        </li>
      );
    })
  ) : (
    <li className={styles.empty}>No results were found for your request</li>
  );

  return (
    <ul
      className={isLight ? styles.list : `${styles.list} ${styles.dark}`}
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeDetails();
      }}
    >
      {listElements}
    </ul>
  );
}
