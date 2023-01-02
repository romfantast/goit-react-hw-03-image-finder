import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';
import Modal from 'components/Modal/Modal';

export default class ImageGalleryItem extends Component {
  state = {
    isOpenModal: false,
  };
  handleToggleModal = () => {
    this.setState(prev => ({ isOpenModal: !prev.isOpenModal }));
  };
  render() {
    const { webFormat, largeImageURL } = this.props;
    const { isOpenModal } = this.state;
    const { handleToggleModal } = this;
    return (
      <>
        <li className={css.ImageGalleryItem} onClick={handleToggleModal}>
          <img className={css.ImageGalleryItemImage} src={webFormat} alt="" />
        </li>
        {isOpenModal && (
          <Modal
            largeImageURL={largeImageURL}
            onToggleModal={handleToggleModal}
          />
        )}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  webFormat: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
