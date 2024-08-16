import { IFormInput } from '../../redux/interfaces';
import styles from './FormData.module.css';

function FormData({ data, isNew }: { data: IFormInput; isNew: boolean }) {
  const { name, age, email, password, confirmPassword, gender, isTerms, img, country } = data;

  return (
    <div className={isNew ? `${styles.wrapper} ${styles.active}` : styles.wrapper}>
      <div className={styles.backBefore} />
      <p>
        Name: <span>{name}</span>
      </p>
      <p>
        Age: <span>{age}</span>
      </p>
      <p>
        Email: <span>{email}</span>
      </p>
      <p>
        Password: <span>{password}</span>
      </p>
      <p>
        Confirm password: <span>{confirmPassword}</span>
      </p>
      <p>
        Gender: <span>{gender}</span>
      </p>
      <p>
        Accept T&C agreement: <span>{isTerms ? 'Yes' : ''}</span>
      </p>
      <p>
        Country: <span>{country}</span>
      </p>
      {img && <img src={img as string} className={styles.picture} alt="download pic" />}
      <div className={styles.backAfter} />
    </div>
  );
}

export default FormData;
