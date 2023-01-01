import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

export default class Searchbar extends Component {
  state = {
    value: '',
  };
  handlerInputValue = e => {
    const { value } = e.target;
    this.setState({ value: value });
  };
  handlerSubmitForm = e => {
    const { value } = this.state;
    const { formSubmitHandler } = this.props;
    e.preventDefault();
    formSubmitHandler(value);
  };

  render() {
    const { handlerInputValue, handlerSubmitForm } = this;
    const { value } = this.state;

    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={handlerSubmitForm}>
          <button type="submit" className={css.SearchFormButton}>
            <span className={css.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            value={value}
            onChange={handlerInputValue}
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  formSubmitHandler: PropTypes.func.isRequired,
};
