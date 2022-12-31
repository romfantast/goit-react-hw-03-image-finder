import React, { Component } from 'react';
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
