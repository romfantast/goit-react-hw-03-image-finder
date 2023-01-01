import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Button.module.css';

export default class Button extends Component {
  render() {
    const { children, onLoadMore } = this.props;
    return (
      <button onClick={onLoadMore} className={css.Button} type="button">
        {children}
      </button>
    );
  }
}

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
};
