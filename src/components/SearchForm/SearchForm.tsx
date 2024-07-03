import React, { Component, ReactNode } from 'react';
import styles from './SearchForm.module.css';

type FormProps = { initValue?: string };
type FormState = { value: string };

export class SearchForm extends Component<FormProps, FormState> {
  constructor(props: FormProps) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
  }

  private handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ value: e.target.value });
  };

  render(): ReactNode {
    const { value } = this.state;
    const { initValue } = this.props;

    return (
      <form className={styles.form}>
        <label className={styles.label} htmlFor="search">
          Find your pokemon:
          <input
            id="search"
            className={styles.input}
            type="text"
            value={value}
            defaultValue={initValue}
            onChange={this.handleChange}
            placeholder="Pokemon name..."
          />
        </label>
        <button className={styles.button} type="submit">
          Search
        </button>
      </form>
    );
  }
}
