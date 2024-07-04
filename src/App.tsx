import { Component, ReactNode } from 'react';
import { List, Loader, SearchForm } from './components';
import { api } from './services/api';
import { ApiData } from './services/api.types';
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

  private handleSearch = (query: string) => {
    this.setState({ isLoader: true });

    api
      .searchData(query)
      .then((data) => this.setState({ data }))
      .catch((error) => console.log(error))
      .finally(() => this.setState({ isLoader: false }));
  };

  render(): ReactNode {
    const { data, isLoader } = this.state;

    return (
      <div className={styles.container}>
        <section className={styles.topSection}>
          <SearchForm handleSearch={this.handleSearch} />
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
