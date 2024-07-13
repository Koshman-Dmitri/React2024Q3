import { Link, useSearchParams } from 'react-router-dom';
import { ApiElement } from '../../services/ST-API/api.types';
import styles from './List.module.css';

export function List({ data, closeHandler }: { data: ApiElement[]; closeHandler: () => void }) {
  const [queryParams, setQueryParams] = useSearchParams();

  const handlerElementClick = (id: string): void => {
    const page = queryParams.get('page') || '';
    setQueryParams({ page, details: id });
  };

  const listElements = data.length ? (
    data.map((el) => {
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
        if (e.target === e.currentTarget) closeHandler();
      }}
    >
      {listElements}
    </ul>
  );
}
