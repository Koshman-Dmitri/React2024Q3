import { useCloseDetails } from '../../hooks/useCloseDetails';
import { useTheme } from '../../hooks/useTheme';
import { ApiElement } from '../../services/ST-API/api.types';
import styles from './DetailList.module.css';

export function DetailList({ data }: { data: { astronomicalObject: ApiElement } }) {
  const { closeDetails } = useCloseDetails();
  const { isLight } = useTheme();

  return (
    <div className={isLight ? styles.details : `${styles.details} ${styles.dark}`}>
      {data && (
        <p>
          Object type:{' '}
          <span className={styles.valueText}>
            {data.astronomicalObject?.astronomicalObjectType || 'No such object'}
          </span>
        </p>
      )}
      {data && (
        <p>
          Location:{' '}
          <span className={styles.valueText}>
            {data.astronomicalObject?.location?.name || 'No such object'}
          </span>
        </p>
      )}
      <button className={styles.closeBtn} type="button" onClick={closeDetails}>
        Close
      </button>
      <p className={styles.closeInstruction}>
        &#128073;To close this panel click on Close Button or Left Panel. If left panel full of
        elements click on border to check closing
      </p>
    </div>
  );
}
