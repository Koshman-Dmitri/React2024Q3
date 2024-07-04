import { PureComponent, ReactNode } from 'react';
import { ApiElement } from '../../services/api.types';
import styles from './List.module.css';

export class List extends PureComponent<{ data: ApiElement[] }> {
  render(): ReactNode {
    const { data } = this.props;
    const listElements = data.length ? (
      data.map((el) => {
        return (
          <li key={el.uid} className={styles.listElement}>
            {el.name && (
              <p>
                Name: <span className={styles.valueText}>{el.name}</span>
              </p>
            )}
            {el.astronomicalObjectType && (
              <p>
                Astronomical object type:{' '}
                <span className={styles.valueText}>{el.astronomicalObjectType}</span>
              </p>
            )}
            {el.location && (
              <p>
                Location: <span className={styles.valueText}>{el.location.name}</span>
              </p>
            )}
          </li>
        );
      })
    ) : (
      <li className={styles.empty}>No results were found for your request</li>
    );

    return <ul className={styles.list}>{listElements}</ul>;
  }
}
