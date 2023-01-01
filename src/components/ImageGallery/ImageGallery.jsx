import React, { Component } from 'react';
import css from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

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
