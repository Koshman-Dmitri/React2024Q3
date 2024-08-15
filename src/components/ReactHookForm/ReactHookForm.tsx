import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { IFormInput } from '../../redux/interfaces';
import { useAppDispatch } from '../../redux/hooks/hooks';
import { submitForm } from '../../redux/slices/formsSlice';
import styles from '../shared/formStyle.module.css';
import PasswordStrength from '../PasswordStrength/PasswordStrength';
import schema from '../../utils/yupScheme';
import convertToBase64 from '../../utils/convertToBase64';
import Autocomplete from '../AutocompleteControl/AutocompleteControl';

let flag = true;

function ReactHookForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setFocus,
    formState: { errors, isValid },
  } = useForm<IFormInput>({ resolver: yupResolver(schema), mode: 'onChange' });

  const watchPassword = watch('password');
  const watchCountry = watch('country', '');

  const setCountry = (country: string): void => {
    setValue('country', country);
    flag = false;
    setTimeout(() => {
      setFocus('isTerms');
    });
  };

  const onSumbit = async (data: IFormInput): Promise<void> => {
    const file = data.img as FileList;
    const base64img = await convertToBase64(file[0]);

    const state: IFormInput = { ...data, img: base64img, id: crypto.randomUUID() };
    dispatch(submitForm(state));

    navigate('/', { state: { isNew: true } });
  };

  return (
    <>
      <h1 className={styles.title}>React hook form</h1>
      <form className={styles.form} onSubmit={handleSubmit(onSumbit)}>
        <label className={styles.label} htmlFor="name">
          Name
          <input className={styles.input} id="name" {...register('name')} />
        </label>
        {errors.name && <p className={styles.errorMsg}>{errors.name.message}</p>}

        <label className={styles.label} htmlFor="age">
          Age
          <input className={styles.input} id="age" {...register('age')} />
        </label>
        {errors.age && <p className={styles.errorMsg}>{errors.age.message}</p>}

        <label className={styles.label} htmlFor="email">
          E-mail
          <input className={styles.input} id="email" {...register('email')} />
        </label>
        {errors.email && <p className={styles.errorMsg}>{errors.email.message}</p>}

        <label className={styles.label} htmlFor="password">
          Password
          <PasswordStrength password={watchPassword} />
          <input className={styles.input} id="password" {...register('password')} />
        </label>
        {errors.password && <p className={styles.errorMsg}>{errors.password.message}</p>}

        <label className={styles.label} htmlFor="confirmPassword">
          Confirm Password
          <input className={styles.input} id="confirmPassword" {...register('confirmPassword')} />
        </label>
        {errors.confirmPassword && (
          <p className={styles.errorMsg}>{errors.confirmPassword.message}</p>
        )}

        <label className={styles.label} htmlFor="gender">
          Gender
          <select className={styles.select} id="gender" {...register('gender')}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
        {errors.gender && <p className={styles.errorMsg}>{errors.gender.message}</p>}

        <label className={styles.label} htmlFor="isTerms">
          <input className={styles.input} id="isTerms" type="checkbox" {...register('isTerms')} />
          Accept Terms and Conditions
        </label>
        {errors.isTerms && <p className={styles.errorMsg}>{errors.isTerms.message}</p>}

        <label className={styles.label} htmlFor="img">
          Upload image
          <input className={styles.input} id="img" type="file" {...register('img')} />
        </label>
        {errors.img && <p className={styles.errorMsg}>{errors.img.message}</p>}

        <label className={styles.label} htmlFor="country">
          Country
          <input
            className={styles.input}
            id="country"
            onInput={() => {
              flag = true;
            }}
            {...register('country')}
          />
          <Autocomplete propValue={watchCountry} handleSuggestionClick={setCountry} />
        </label>
        {errors.country && flag && <p className={styles.errorMsg}>{errors.country.message}</p>}

        <button className={styles.submitButton} type="submit" disabled={!isValid}>
          Submit
        </button>
      </form>
    </>
  );
}

export default ReactHookForm;
