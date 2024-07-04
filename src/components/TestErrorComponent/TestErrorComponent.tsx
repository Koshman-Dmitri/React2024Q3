import { Component, ReactNode } from 'react';
import styles from './TestErrorComponent.module.css';

interface Props {}
type State = { isError: boolean };

export class TestErrorComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { isError: false };
  }

  private handleClick = () => {
    this.setState({ isError: true });
  };

  render(): ReactNode {
    const { isError } = this.state;
    if (isError) throw new Error('Crash test passed successfully');

    return (
      <button className={styles.errorButton} type="button" onClick={this.handleClick}>
        Throw error
      </button>
    );
  }
}
