import { Component, ErrorInfo, MouseEvent, ReactNode } from 'react';
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

  private handleClose = (): void => this.setState({ hasError: false });

  render(): ReactNode {
    const { hasError } = this.state;
    const { children } = this.props;

    return (
      <>
        {children}
        {hasError && (
          <div
            className={styles.overlay}
            role="presentation"
            onMouseDown={(e: MouseEvent<HTMLDivElement>) => {
              if (e.target === e.currentTarget) this.handleClose();
            }}
          >
            <div className={styles.errorMsg}>
              <h2 className={styles.errorTitle}>Fallback message</h2>
              <p className={styles.errorDesc}>Check console</p>
              <p className={styles.errorDesc}>Error caught successfully!</p>
              <button className={styles.closeBtn} type="button" onClick={this.handleClose}>
                Close
              </button>
            </div>
          </div>
        )}
      </>
    );
  }
}
