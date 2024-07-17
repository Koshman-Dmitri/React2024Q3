import { useSearchParams } from 'react-router-dom';
import { useCloseDetails } from '../../hooks/useCloseDetails';
import { starTrekApi } from '../../services/ST-API/api';
import { Loader } from '../Loader/Loader';
import styles from './DetailList.module.css';

export function DetailList() {
  const { closeDetails } = useCloseDetails();

  const [queryParams] = useSearchParams();
  const details = queryParams.get('details') || '';

  const { data, isFetching } = starTrekApi.useGetObjectByIdQuery(details);

  return (
    <div className={styles.details}>
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
      {isFetching && <Loader />}
    </div>
  );
}
