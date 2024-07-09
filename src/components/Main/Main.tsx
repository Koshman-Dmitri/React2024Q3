import { ReactNode, useEffect, useState } from 'react';
import { api } from '../../services';
import { ApiElement } from '../../services/ST-API/api.types';
import { List } from '../List/List';
import { DetailList } from '../DetailList/DetailList';
import { Loader } from '../Loader/Loader';
import styles from './Main.module.css';

const initialData = {
  uid: '',
  name: '',
  astronomicalObjectType: '',
  location: {
    uid: '',
    name: '',
  },
};

export function Main({ data, children }: { data: ApiElement[]; children: ReactNode }) {
  const [showDetails, setShowDetails] = useState(false);
  const [detailData, setDetailData] = useState(initialData);
  const [isLoader, setIsLoader] = useState(false);

  useEffect(() => {
    setShowDetails(false);
  }, [data]);

  const handlerElementClick = (id: string): void => {
    if (!showDetails) setShowDetails(true);
    setIsLoader(true);

    api
      .getObject(id)
      .then((obj) => setDetailData(obj.astronomicalObject))
      .catch((error) => console.error(error))
      .finally(() => setIsLoader(false));
  };

  const handlerCloseDetails = () => setShowDetails(false);

  return (
    <section className={styles.main}>
      <List data={data} clickHandler={handlerElementClick} closeHandler={handlerCloseDetails} />

      {showDetails && (
        <DetailList data={detailData} closeHandler={handlerCloseDetails}>
          {isLoader && <Loader />}
        </DetailList>
      )}

      {children}
    </section>
  );
}
