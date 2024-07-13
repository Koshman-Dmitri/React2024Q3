import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCloseDetails } from '../../hooks/useCloseDetails';
import { api } from '../../services';
import { Loader } from '../Loader/Loader';
import { initDetailData } from '../Main/Main.consts';
import { dummyState } from './DetailList.consts';
import styles from './DetailList.module.css';

export function DetailList() {
  const [state, setState] = useState(initDetailData);
  const [isLoader, setIsLoader] = useState(false);
  const [queryParams] = useSearchParams();
  const closeDetails = useCloseDetails();

  useEffect(() => {
    const details = queryParams.get('details') || '';

    setIsLoader(true);
    api
      .getObject(details)
      .then((data) => {
        if (data.astronomicalObject) {
          setState(data.astronomicalObject);
        } else {
          setState(dummyState);
        }
      })
      .catch((error) => console.error(error))
      .finally(() => setIsLoader(false));
  }, [queryParams]);

  return (
    <div className={styles.details}>
      {state.astronomicalObjectType && (
        <p>
          Object type: <span className={styles.valueText}>{state.astronomicalObjectType}</span>
        </p>
      )}
      {state.location && (
        <p>
          Location: <span className={styles.valueText}>{state.location.name}</span>
        </p>
      )}
      <button className={styles.closeBtn} type="button" onClick={closeDetails}>
        Close
      </button>
      <p className={styles.closeInstruction}>
        &#128073;To close this panel click on Close Button or Left Panel. If left panel full of
        elements click on border to check closing
      </p>
      {isLoader && <Loader />}
    </div>
  );
}
