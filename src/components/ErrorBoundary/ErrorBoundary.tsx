import { Component, ErrorInfo, ReactNode } from 'react';
import styles from './ErrorBoundary.module.css';

type Props = { children: ReactNode };
type State = { hasError: boolean };

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log(error.toString(), errorInfo.componentStack);
  }

  render(): ReactNode {
    const { hasError } = this.state;
    const { children } = this.props;

    return hasError ? <h2 className={styles.errorMsg}>Crash test</h2> : children;
  }
}
