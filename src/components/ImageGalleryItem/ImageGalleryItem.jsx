import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from '../Modal/Modal';
import { Item, Img } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ webformatURL, tags, largeImageURL }) => {
  const [showModal, setShowModal] = useState(false);

  function toggleModal() {
    setShowModal(!showModal);
  }
  return (
    <>
      <Item>
        <Img src={webformatURL} alt={tags} width="200" onClick={toggleModal} />
      </Item>
      {showModal && (
        <Modal src={largeImageURL} alt={tags} onClose={toggleModal} />
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
