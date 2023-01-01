import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

ImageGalleryItem.propTypes = {
  webFormat: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onOpenModal: PropTypes.func.isRequired,
};
