import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { lsAPI } from '../../services';
import styles from './SearchForm.module.css';

export function SearchForm() {
  const [value, setValue] = useState(lsAPI.getData('prevSearch_KD'));
  const navigate = useNavigate();
  const { search } = useParams();

  useEffect(() => {
    setValue(search || '');
  }, [search]);

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>): void => {
    e?.preventDefault();

    const trimmedValue = value.trim();
    setValue(trimmedValue);
    navigate(trimmedValue);
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
