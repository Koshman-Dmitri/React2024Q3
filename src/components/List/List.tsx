import { Link, useSearchParams } from 'react-router-dom';
import { ChangeEvent } from 'react';
import { ApiElement } from '../../services/ST-API/api.types';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { useCloseDetails } from '../../hooks/useCloseDetails';
import { addFavorite, deleteFavorite } from '../../app/slices/favoriteSlice';
import styles from './List.module.css';

export function List() {
  const [queryParams, setQueryParams] = useSearchParams();
  const { closeDetails } = useCloseDetails();

  const listData = useAppSelector((state) => state.list);
  const favorite = useAppSelector((state) => state.favorite);
  const dispatch = useAppDispatch();

  const handlerElementClick = (id: string): void => {
    const page = queryParams.get('page') || '';
    setQueryParams({ page, details: id });
  };

  const handlerFavoriteChange = (event: ChangeEvent<HTMLInputElement>, el: ApiElement): void => {
    if (event.target.checked) {
      dispatch(addFavorite(el));
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
      className={styles.list}
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeDetails();
      }}
    >
      {listElements}
    </ul>
  );
}
