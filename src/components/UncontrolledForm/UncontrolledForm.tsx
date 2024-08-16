import { FormEvent, useRef, useState } from 'react';
import { ValidationError } from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import schema from '../../utils/yupScheme';
import { useAppDispatch } from '../../redux/hooks/hooks';
import { submitForm } from '../../redux/slices/formsSlice';
import { IFormInput } from '../../redux/interfaces';
import styles from '../shared/formStyle.module.css';
import PasswordStrength from '../PasswordStrength/PasswordStrength';
import Autocomplete from '../AutocompleteControl/AutocompleteControl';
import convertToBase64 from '../../utils/convertToBase64';

type Errors = Record<keyof IFormInput, string>;

function UncontrolledForm() {
  const [errors, setErrors] = useState<Errors>();
  const [passwordValue, setPasswordValue] = useState('');
  const [countryValue, setCountryValue] = useState('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);

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

      const file = formData.img as FileList;
      const base64img = await convertToBase64(file[0]);

      const state: IFormInput = { ...formData, img: base64img, id: crypto.randomUUID() };
      dispatch(submitForm(state));

      navigate('/', { state: { isNew: true } });
    } catch (error) {
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

  const setCountry = (country: string): void => {
    if (countryRef.current) countryRef.current.value = country;
    setCountryValue('');
  };

  return (
    <>
      <h1 className={styles.title}>Uncontrolled form</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.column}>
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
            <PasswordStrength password={passwordValue} />
            <input
              ref={passwordRef}
              className={styles.input}
              id="password"
              onChange={(e) => setPasswordValue(e.target.value)}
            />
          </label>
          {errors?.password && <p className={styles.errorMsg}>{errors.password}</p>}

          <label className={styles.label} htmlFor="confirmPassword">
            Confirm Password
            <input ref={confirmPasswordRef} className={styles.input} id="confirmPassword" />
          </label>
          {errors?.confirmPassword && <p className={styles.errorMsg}>{errors.confirmPassword}</p>}
        </div>

        <div className={styles.column}>
          <label className={styles.label} htmlFor="gender">
            Gender
            <select ref={genderRef} className={styles.select} id="gender">
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </label>
          {errors?.gender && <p className={styles.errorMsg}>{errors.gender}</p>}

          <label className={styles.label} htmlFor="img">
            Upload image
            <input ref={imgRef} className={styles.input} id="img" type="file" />
          </label>
          {errors?.img && <p className={styles.errorMsg}>{errors.img}</p>}

          <label className={styles.label} htmlFor="country">
            Country
            <input
              ref={countryRef}
              className={styles.input}
              id="country"
              onChange={(e) => setCountryValue(e.target.value)}
            />
            <Autocomplete propValue={countryValue} handleSuggestionClick={setCountry} />
          </label>
          {errors?.country && <p className={styles.errorMsg}>{errors.country}</p>}

          <label className={styles.label} htmlFor="isTerms">
            <input ref={termsRef} className={styles.input} id="isTerms" type="checkbox" />
            Accept Terms and Conditions
          </label>
          {errors?.isTerms && <p className={styles.errorMsg}>{errors.isTerms}</p>}
        </div>

        <button className={styles.submitButton} type="submit">
          Submit
        </button>
      </form>
      <Link className={styles.backLink} to="/">
        Back
      </Link>
    </>
  );
}

export default UncontrolledForm;
