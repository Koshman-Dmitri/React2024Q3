import { Link, useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/reduxHooks';
import { useCloseDetails } from '../../hooks/useCloseDetails';
import styles from './List.module.css';

export function List() {
  const [queryParams, setQueryParams] = useSearchParams();
  const { closeDetails } = useCloseDetails();

  const listData = useAppSelector((state) => state.list);

  const handlerElementClick = (id: string): void => {
    const page = queryParams.get('page') || '';
    setQueryParams({ page, details: id });
  };

  const listElements = listData.length ? (
    listData.map((el) => {
      return (
        <li
          key={el.uid}
          className={styles.listElement}
          role="presentation"
          onClick={() => handlerElementClick(el.uid)}
        >
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
