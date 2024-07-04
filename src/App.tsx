import { Component, ReactNode } from 'react';
import { List, Loader, SearchForm } from './components';
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
      },
      isLoader: false,
    };
  }

  componentDidMount(): void {
    const value = lsAPI.getData('prevSearch_KD');
    this.handleSearch(value || '');
  }

  private handleSearch = (query: string) => {
    lsAPI.setData('prevSearch_KD', query);
    this.setState({ isLoader: true });

    api
      .searchData(query)
      .then((data) => this.setState({ data }))
      .catch((error) => console.log(error))
      .finally(() => this.setState({ isLoader: false }));
  };

  render(): ReactNode {
    const { data, isLoader } = this.state;
    const initialSearch = lsAPI.getData('prevSearch_KD') || '';

    return (
      <div className={styles.container}>
        <section className={styles.topSection}>
          <SearchForm initialSearch={initialSearch} handleSearch={this.handleSearch} />
        </section>
        <section className={styles.botSection}>
          <List data={data.astronomicalObjects} />
          {isLoader && <Loader />}
        </section>
      </div>
    );
  }
}

export default App;
