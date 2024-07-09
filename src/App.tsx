import { useEffect, useState } from 'react';
import { ErrorBoundary, Footer, List, Loader, SearchForm } from './components';
import { api, lsAPI } from './services';
import { ApiData } from './services/ST-API/api.types';
import styles from './App.module.css';

const initialData: ApiData = {
  astronomicalObjects: [],
  page: {
    pageNumber: 0,
    pageSize: 0,
    numberOfElements: 0,
    totalElements: 0,
    totalPages: 0,
    firstPage: true,
    lastPage: true,
  },
};

function App() {
  const [state, setState] = useState(initialData);
  const [isLoader, setIsLoader] = useState(false);

  const handleSearch = (query: string, page?: number): void => {
    lsAPI.setData('prevSearch_KD', query);
    setIsLoader(true);

    api
      .searchData(query, page)
      .then((data) => setState(data))
      .catch((error) => console.log(error))
      .finally(() => setIsLoader(false));
  };

  const getSearchParam = (): string => lsAPI.getData('prevSearch_KD');

  useEffect(() => {
    handleSearch(getSearchParam() || '');
  }, []);

  const handlePrev = (): void => {
    handleSearch(getSearchParam(), state.page.pageNumber - 1);
  };

  const handleNext = (): void => {
    handleSearch(getSearchParam(), state.page.pageNumber + 1);
  };

  return (
    <ErrorBoundary>
      <div className={styles.container}>
        <section>
          <SearchForm initialSearch={getSearchParam()} handleSearch={handleSearch} />
        </section>

        <section className={styles.main}>
          <List data={state.astronomicalObjects} />
          {isLoader && <Loader />}
        </section>

        <Footer
          isFirstPage={state.page.firstPage}
          isLastPage={state.page.lastPage}
          currentPage={state.page.pageNumber}
          totalPages={state.page.totalPages}
          handlePrev={handlePrev}
          handleNext={handleNext}
        />
      </div>
    </ErrorBoundary>
  );
}

export default App;
