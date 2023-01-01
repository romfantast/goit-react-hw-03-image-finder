import React, { Component } from 'react';
import css from './ImageGalleryItem.module.css';

export default class ImageGalleryItem extends Component {
  render() {
    const { webFormat, largeImageURL, onOpenModal } = this.props;
    return (
      <li
        className={css.ImageGalleryItem}
        onClick={() => onOpenModal(largeImageURL)}
      >
        <img className={css.ImageGalleryItemImage} src={webFormat} alt="" />
      </li>
    );
  }
}
