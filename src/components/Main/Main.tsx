import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { initDetailData, initState } from './Main.consts';
import { api, lsAPI } from '../../services';
import { Loader } from '../Loader/Loader';
import { List } from '../List/List';
import { DetailList } from '../DetailList/DetailList';
import { Footer } from '../Footer/Footer';
import styles from './Main.module.css';

export function Main() {
  const [state, setState] = useState(initState);
  const [detailData, setDetailData] = useState(initDetailData);
  const [showDetails, setShowDetails] = useState(false);
  const [isListLoader, setIsListLoader] = useState(false);
  const [isDetailLoader, setIsDetailLoader] = useState(false);

  const [queryParams, setQueryParams] = useSearchParams();
  const { search } = useParams();

  useEffect(() => {
    lsAPI.setData('prevSearch_KD', search || '');
    const page = Number(queryParams.get('page')) - 1;

    setIsListLoader(true);
    api
      .searchData(search || '', page)
      .then((result) => {
        if (result.page.totalPages > 0) {
          const newPage = String(result.page.pageNumber + 1);
          setQueryParams({ page: newPage });
        }
        setState(result);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsListLoader(false));
  }, [search, queryParams, setQueryParams]);

  useEffect(() => {
    setShowDetails(false);
  }, [state]);

  const handlerElementClick = (id: string): void => {
    if (!showDetails) setShowDetails(true);
    setIsDetailLoader(true);

    api
      .getObject(id)
      .then((obj) => setDetailData(obj.astronomicalObject))
      .catch((error) => console.error(error))
      .finally(() => setIsDetailLoader(false));
  };

  const handlerCloseDetails = () => setShowDetails(false);

  return (
    <>
      <section className={styles.main}>
        {isListLoader && <Loader />}

        <List
          data={state.astronomicalObjects}
          clickHandler={handlerElementClick}
          closeHandler={handlerCloseDetails}
        />

        {showDetails && (
          <DetailList data={detailData} closeHandler={handlerCloseDetails}>
            {isDetailLoader && <Loader />}
          </DetailList>
        )}
      </section>

      <Footer
        isFirstPage={state.page.firstPage}
        isLastPage={state.page.lastPage}
        currentPage={state.page.pageNumber}
        totalPages={state.page.totalPages}
      />
    </>
  );
}
