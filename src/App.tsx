import { Component, ReactNode } from 'react';
import { SearchForm } from './components/SearchForm/SearchForm';
import { api } from './services/api';
import { ApiData } from './services/api.types';
import styles from './App.module.css';

interface Props {}
interface State {
  data: ApiData;
}

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      data: {
        astronomicalObjects: [],
      },
    };
  }

  private handleSearch = (query: string) => {
    api
      .searchData(query)
      .then((data) => this.setState({ data }))
      .catch((error) => console.log(error));
  };

  render(): ReactNode {
    const { data } = this.state;

    return (
      <div className={styles.container}>
        <section className={styles.topSection}>
          <SearchForm handleSearch={this.handleSearch} />
        </section>
        <section className={styles.botSection}>
          {data.astronomicalObjects.map((obj) => (
            <div key={obj.uid}>{obj.name}</div>
          ))}
        </section>
      </div>
    );
  }
}

export default App;
