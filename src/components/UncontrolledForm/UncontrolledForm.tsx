import { FormEvent, useRef, useState } from 'react';
import { ValidationError } from 'yup';
import schema from '../../utils/yupScheme';
import { IFormInput } from '../../redux/interfaces';
import styles from '../shared/formStyle.module.css';
import PasswordStrength from '../PasswordStrength/PasswordStrength';
import Autocomplete from '../AutocompleteControl/AutocompleteControl';

type Errors = Record<keyof IFormInput, string>;

function UncontrolledForm() {
  const [errors, setErrors] = useState<Errors>();

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const formData: IFormInput = {
      name: nameRef.current?.value || '',
      age: ageRef.current?.value || '',
      email: emailRef.current?.value || '',
      password: passwordRef.current?.value || '',
      confirmPassword: confirmPasswordRef.current?.value || '',
      gender: genderRef.current?.value as '',
      isTerms: termsRef.current?.checked || false,
      img: imgRef.current?.files || {},
      country: countryRef.current?.value || '',
    };

    try {
      await schema.validate(formData, { abortEarly: false });
      setErrors(undefined);
      console.log('Form submitted');
    } catch (error) {
      if (submitRef.current) submitRef.current.disabled = true;
      const newErrors: { [key: string]: string } = {};

      const yupError = error as ValidationError;
      yupError.inner.forEach((err) => {
        if (err.path) {
          if (!newErrors[err.path]) newErrors[err.path] = err.message;
        }
      });

      setErrors(newErrors as Errors);
    }
  };

  const enableSubmit = (): void => {
    if (submitRef.current) submitRef.current.disabled = false;
  };

  return (
    <>
      <h1 className={styles.title}>Uncontrolled form</h1>
      <form className={styles.form} onSubmit={handleSubmit} onChange={enableSubmit}>
        <label className={styles.label} htmlFor="name">
          Name
          <input ref={nameRef} className={styles.input} id="name" />
        </label>
        {errors?.name && <p className={styles.errorMsg}>{errors.name}</p>}

        <label className={styles.label} htmlFor="age">
          Age
          <input ref={ageRef} className={styles.input} id="age" />
        </label>
        {errors?.age && <p className={styles.errorMsg}>{errors.age}</p>}

        <label className={styles.label} htmlFor="email">
          E-mail
          <input ref={emailRef} className={styles.input} id="email" />
        </label>
        {errors?.email && <p className={styles.errorMsg}>{errors.email}</p>}

        <label className={styles.label} htmlFor="password">
          Password
          <PasswordStrength password={passwordRef.current?.value || ''} />
          <input ref={passwordRef} className={styles.input} id="password" />
        </label>
        {errors?.password && <p className={styles.errorMsg}>{errors.password}</p>}

        <label className={styles.label} htmlFor="confirmPassword">
          Confirm Password
          <input ref={confirmPasswordRef} className={styles.input} id="confirmPassword" />
        </label>
        {errors?.confirmPassword && <p className={styles.errorMsg}>{errors.confirmPassword}</p>}

        <label className={styles.label} htmlFor="gender">
          Gender
          <select ref={genderRef} className={styles.select} id="gender">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
        {errors?.gender && <p className={styles.errorMsg}>{errors.gender}</p>}

        <label className={styles.label} htmlFor="isTerms">
          <input ref={termsRef} className={styles.input} id="isTerms" type="checkbox" />
          Accept Terms and Conditions
        </label>
        {errors?.isTerms && <p className={styles.errorMsg}>{errors.isTerms}</p>}

        <label className={styles.label} htmlFor="img">
          Upload image
          <input ref={imgRef} className={styles.input} id="img" type="file" />
        </label>
        {errors?.img && <p className={styles.errorMsg}>{errors.img}</p>}

        <label className={styles.label} htmlFor="country">
          Country
          <input ref={countryRef} className={styles.input} id="country" />
          <Autocomplete
            propValue={countryRef.current?.value || ''}
            handleSuggestionClick={() => console.log('TODO CLICK')}
          />
        </label>
        {errors?.country && <p className={styles.errorMsg}>{errors.country}</p>}

        <button ref={submitRef} className={styles.submitButton} type="submit">
          Submit
        </button>
      </form>
    </>
  );
}

export default UncontrolledForm;
