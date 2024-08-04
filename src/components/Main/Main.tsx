import { List } from '../List/List';
import { Footer } from '../Footer/Footer';
import { MainProps } from './Main.types';
import styles from './Main.module.css';

export function Main({ listProps, paginationProps, children }: MainProps) {
  return (
    <>
      <section className={styles.main}>
        <List listData={listProps} />
        {children}
      </section>

      <Footer paginationProps={paginationProps} />
    </>
  );
}
