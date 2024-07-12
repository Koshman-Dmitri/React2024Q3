import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import styles from './SearchForm.module.css';

export function SearchForm() {
  const [lsValue, setLsValue] = useLocalStorage();
  const [value, setValue] = useState(lsValue);
  const navigate = useNavigate();

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>): void => {
    e?.preventDefault();
    const trimValue = value.trim();

    setValue(trimValue);
    setLsValue(trimValue);
    navigate(trimValue);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
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
