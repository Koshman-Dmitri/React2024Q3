import { Component, ReactNode } from 'react';
import { ErrorBoundary, Footer, List, Loader, SearchForm } from './components';
import { api, lsAPI } from './services';
import { ApiData } from './services/ST-API/api.types';
import styles from './App.module.css';

interface Props {}
interface State {
  data: ApiData;
  isLoader: boolean;
}

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      data: {
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
      },
      isLoader: false,
    };
  }

  componentDidMount(): void {
    const value = lsAPI.getData('prevSearch_KD');
    this.handleSearch(value || '');
  }

  private handleSearch = (query: string, page?: number) => {
    lsAPI.setData('prevSearch_KD', query);
    this.setState({ isLoader: true });

    api
      .searchData(query, page)
      .then((data) => this.setState({ data }))
      .catch((error) => console.log(error))
      .finally(() => this.setState({ isLoader: false }));
  };

  private getSearchParams = (): {
    value: string;
    data: ApiData;
  } => {
    const value = lsAPI.getData('prevSearch_KD');
    const { data } = this.state;

    return { value, data };
  };

  private handlePrev = (): void => {
    const { value, data } = this.getSearchParams();
    this.handleSearch(value, data.page.pageNumber - 1);
  };

  private handleNext = (): void => {
    const { value, data } = this.getSearchParams();
    this.handleSearch(value, data.page.pageNumber + 1);
  };

  render(): ReactNode {
    const { data, isLoader } = this.state;
    const initialSearch = lsAPI.getData('prevSearch_KD');

    return (
      <ErrorBoundary>
        <div className={styles.container}>
          <section>
            <SearchForm initialSearch={initialSearch} handleSearch={this.handleSearch} />
          </section>

          <section className={styles.main}>
            <List data={data.astronomicalObjects} />
            {isLoader && <Loader />}
          </section>

          <Footer
            isFirstPage={data.page.firstPage}
            isLastPage={data.page.lastPage}
            currentPage={data.page.pageNumber}
            totalPages={data.page.totalPages}
            handlePrev={this.handlePrev}
            handleNext={this.handleNext}
          />
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
