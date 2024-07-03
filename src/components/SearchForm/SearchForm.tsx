import React, { Component, ReactNode } from 'react';
import styles from './SearchForm.module.css';

type FormProps = { handleSearch: (query: string) => void };
type FormState = { value: string };

export class SearchForm extends Component<FormProps, FormState> {
  constructor(props: FormProps) {
    super(props);
    this.state = { value: '' };
  }

  private handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ value: e.target.value });
  };

  private handleSubmit = (e?: React.FormEvent<HTMLFormElement>): void => {
    e?.preventDefault();

    const { value } = this.state;
    const { handleSearch } = this.props;
    handleSearch(value.trim());
  };

  render(): ReactNode {
    const { value } = this.state;

    return (
      <form className={styles.form} onSubmit={this.handleSubmit}>
        <label className={styles.label} htmlFor="search">
          Search astronomical object:
          <input
            id="search"
            className={styles.input}
            type="text"
            value={value}
            onChange={this.handleChange}
            placeholder="Earth..."
          />
        </label>
        <button className={styles.button} type="submit">
          Search
        </button>
      </form>
    );
  }
}
