'use client';

import { ChangeEvent } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { ApiElement } from '../../services/ST-API/api.types';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { useCloseDetails } from '../../hooks/useCloseDetails';
import { useTheme } from '../../hooks/useTheme';
import { addFavorite, deleteFavorite } from '../../lib/slices/favoriteSlice';
import styles from './List.module.css';

export function List({ listData }: { listData: ApiElement[] }) {
  const { closeDetails } = useCloseDetails();
  const { isLight } = useTheme();

  const pathname = usePathname();
  const queryParams = useSearchParams();
  const router = useRouter();

  const favorite = useAppSelector((state) => state.favorite);
  const dispatch = useAppDispatch();

  const createQuery = (page: string, details?: string): string => {
    const params = new URLSearchParams();
    params.set('page', page);
    if (details) params.set('details', details);

    return params.toString();
  };

  const handlerElementClick = (id: string): void => {
    const page = queryParams.get('page') || '1';
    const newPath = pathname.split('/')[1].replace('detail', '') || '';
    const newRoute = `${newPath && '/'}${newPath}/detail?${createQuery(page, id)}`;

    router.push(newRoute);
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
            <span className={styles.link}>
              Name: <span className={styles.valueText}>{el.name}</span>
            </span>
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
