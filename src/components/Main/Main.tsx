import { useEffect } from 'react';
import { Outlet, useParams, useSearchParams } from 'react-router-dom';
import { starTrekApi } from '../../services/ST-API/api';
import { Loader } from '../Loader/Loader';
import { List } from '../List/List';
import { Footer } from '../Footer/Footer';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { updatePagination } from '../../app/slices/paginationSlice';
import { updateList } from '../../app/slices/listSlice';
import styles from './Main.module.css';

export function Main() {
  const [queryParams, setQueryParams] = useSearchParams();
  const { search } = useParams();
  const dispatch = useAppDispatch();

  const [searchForObject, { isLoading, isError }] = starTrekApi.useSearchForObjectsMutation();

  useEffect(() => {
    const page = Number(queryParams.get('page')) - 1;
    const hasDetails = queryParams.has('details');

    searchForObject({ query: search || '', page })
      .unwrap()
      .then((result) => {
        dispatch(updatePagination(result.page));
        dispatch(updateList(result.astronomicalObjects));

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
      .catch(() => console.log('error'));
  }, [queryParams, search, dispatch, searchForObject, setQueryParams]);

  const hasDetails = queryParams.has('details');

  return (
    <>
      {isError && <h1 className={styles.error}>Could not fetch data from API</h1>}

      <section className={styles.main}>
        <List />
        {hasDetails && <Outlet />}
        {isLoading && !hasDetails && <Loader />}
      </section>

      <Footer />
    </>
  );
}
