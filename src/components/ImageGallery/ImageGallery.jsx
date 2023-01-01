import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export default class ImageGallery extends Component {
  render() {
    const { imagesList, onOpenModal } = this.props;

    return (
      <ul className={css.ImageGallery}>
        {imagesList.map(image => (
          <ImageGalleryItem
            onOpenModal={onOpenModal}
            key={image.id}
            id={image.id}
            webFormat={image.webformatURL}
            largeImageURL={image.largeImageURL}
          />
        ))}
      </ul>
    );
  }
}

ImageGallery.propTypes = {
  imagesList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    }).isRequired
  ),
  onOpenModal: PropTypes.func.isRequired,
};
