import { useEffect, useState } from 'react';
import { Outlet, useParams, useSearchParams } from 'react-router-dom';
import { useCloseDetails } from '../../hooks/useCloseDetails';
import { initState } from './Main.consts';
import { api } from '../../services';
import { Loader } from '../Loader/Loader';
import { List } from '../List/List';
import { Footer } from '../Footer/Footer';
import styles from './Main.module.css';

export function Main() {
  const [state, setState] = useState(initState);
  const [isLoader, setIsLoader] = useState(false);
  const [isLinksActive, setIsLinksActive] = useState(true);

  const [queryParams, setQueryParams] = useSearchParams();
  const { search } = useParams();
  const closeDetails = useCloseDetails();

  useEffect(() => {
    const page = Number(queryParams.get('page')) - 1;
    const hasDetails = queryParams.has('details');

    if (!hasDetails) setIsLoader(true);
    setIsLinksActive(false);

    api
      .searchData(search || '', page)
      .then((result) => {
        setState(result);

        if (result.page.totalPages > 0) {
          const newPage = String(result.page.pageNumber + 1);

          if (hasDetails) {
            const newDetails = queryParams.get('details') || '';
            setQueryParams({ page: newPage, details: newDetails });
          } else {
            setQueryParams({ page: newPage });
          }
        }
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setIsLoader(false);
        setIsLinksActive(true);
      });
  }, [search, queryParams, setQueryParams]);

  const handlerElementClick = (id: string): void => {
    const page = queryParams.get('page') || '';
    setQueryParams({ page, details: id });
  };

  return (
    <>
      <section className={isLinksActive ? styles.main : `${styles.main} ${styles.inactive}`}>
        <List
          data={state.astronomicalObjects}
          clickHandler={handlerElementClick}
          closeHandler={closeDetails}
        />

        {queryParams.has('details') && <Outlet />}
        {isLoader && <Loader />}
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
