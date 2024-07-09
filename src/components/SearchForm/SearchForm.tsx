import React, { useState } from 'react';
import styles from './SearchForm.module.css';

type FormProps = {
  initialSearch: string;
  handleSearch: (query: string) => void;
};

export function SearchForm({ initialSearch, handleSearch }: FormProps) {
  const [value, setValue] = useState(initialSearch);

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>): void => {
    e?.preventDefault();

    const trimmedValue = value.trim();
    setValue(trimmedValue);

    handleSearch(trimmedValue);
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
