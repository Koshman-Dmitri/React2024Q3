import { Link } from 'react-router-dom';
import { ApiElement } from '../../services/ST-API/api.types';
import styles from './List.module.css';

export function List({
  data,
  clickHandler,
  closeHandler,
}: {
  data: ApiElement[];
  clickHandler: (id: string) => void;
  closeHandler: () => void;
}) {
  const listElements = data.length ? (
    data.map((el) => {
      return (
        <li
          key={el.uid}
          className={styles.listElement}
          role="presentation"
          onClick={() => clickHandler(el.uid)}
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
