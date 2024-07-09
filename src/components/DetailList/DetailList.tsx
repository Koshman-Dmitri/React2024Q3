import { ReactNode } from 'react';
import { ApiElement } from '../../services/ST-API/api.types';
import styles from './DetailList.module.css';

export function DetailList({
  data,
  closeHandler,
  children,
}: {
  data: ApiElement;
  closeHandler: () => void;
  children: ReactNode;
}) {
  return (
    <div className={styles.details}>
      {data.astronomicalObjectType && (
        <p>
          Object type: <span className={styles.valueText}>{data.astronomicalObjectType}</span>
        </p>
      )}
      {data.location && (
        <p>
          Location: <span className={styles.valueText}>{data.location.name}</span>
        </p>
      )}
      <button className={styles.closeBtn} type="button" onClick={closeHandler}>
        Close
      </button>
      <p className={styles.closeInstruction}>
        To close this panel click on Close Button or Left Panel. If left panel full of elements
        click on border to check closing
      </p>
      {children}
    </div>
  );
}
