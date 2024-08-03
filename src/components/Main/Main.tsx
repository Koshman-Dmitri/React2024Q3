import { PropsWithChildren } from 'react';
import { List } from '../List/List';
import { Footer } from '../Footer/Footer';
import styles from './Main.module.css';

export function Main({ children }: PropsWithChildren) {
  return (
    <>
      <section className={styles.main}>
        <List />
        {children}
      </section>

      <Footer />
    </>
  );
}
