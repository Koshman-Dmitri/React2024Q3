import { FromType } from '../../globalTypes';
import { useAppSelector } from '../../redux/hooks/hooks';
import styles from './FormData.module.css';

interface FormDataProps {
  title: FromType;
  isNewData: boolean;
}

function FormData({ title, isNewData }: FormDataProps) {
  const formState = title === 'react-hook-form' ? 'reactHookForm' : 'uncontrolledForm';
  const formTitle = title === 'react-hook-form' ? 'React hook form Data' : 'Uncontrolled form Data';

  const data = useAppSelector((state) => state[formState]);

  return (
    <div className={isNewData ? `${styles.wrapper} ${styles.active}` : styles.wrapper}>
      <div className={styles.backBefore} />
      <h2 className={styles.title}>{formTitle}</h2>
      <p>
        Name: <span>{data.name}</span>
      </p>
      <p>
        Age: <span>{data.age}</span>
      </p>
      <p>
        Email: <span>{data.email}</span>
      </p>
      <p>
        Password: <span>{data.password}</span>
      </p>
      <p>
        Confirm password: <span>{data.confirmPassword}</span>
      </p>
      <p>
        Gender: <span>{data.gender}</span>
      </p>
      <p>
        Accept Terms and Conditions agreement: <span>{data.isTerms ? 'Yes' : ''}</span>
      </p>
      {data.img && <img src={data.img as string} className={styles.picture} alt="download pic" />}
      <p>
        Country: <span>{data.country}</span>
      </p>
      <div className={styles.backAfter} />
    </div>
  );
}

export default FormData;
