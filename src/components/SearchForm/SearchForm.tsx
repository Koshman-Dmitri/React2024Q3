import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useTheme } from '../../hooks/useTheme';
import { lsAPI } from '../../services/LS-API/LS-API';
import styles from './SearchForm.module.css';

export function SearchForm() {
  const [lsValue, setLsValue] = useLocalStorage();
  const [value, setValue] = useState(lsValue);
  const { isLight } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    if (!lsValue) setValue(lsAPI.getData('prevSearch_KD'));
  }, [lsValue]);

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>): void => {
    e?.preventDefault();
    const trimValue = value.trim();

    setValue(trimValue);
    setLsValue(trimValue);
    navigate(trimValue);
  };

  const componentClassName = isLight ? styles.form : `${styles.form} ${styles.dark}`;

  return (
    <form className={componentClassName} onSubmit={handleSubmit}>
      <label className={styles.label} htmlFor="search">
        Search astronomical object:
        <input
          id="search"
          className={styles.input}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Earth..."
        />
      </label>
      <button className={styles.button} type="submit">
        Search
      </button>
    </form>
  );
}
