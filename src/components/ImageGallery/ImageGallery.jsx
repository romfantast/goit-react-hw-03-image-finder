import React, { Component } from 'react';
import css from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

export default class ImageGallery extends Component {
  render() {
    const { imagesList } = this.props;
    return (
      <>
        <ul className={css.ImageGallery}>
          {imagesList.map(image => (
            <ImageGalleryItem
              key={image.id}
              id={image.id}
              webFormat={image.webformatURL}
              largeImageURL={image.largeImageURL}
            />
          ))}
        </ul>
      </>
    );
  }
}
