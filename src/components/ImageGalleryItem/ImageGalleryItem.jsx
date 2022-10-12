import React from 'react';
import PropTypes from 'prop-types';
import { Item, Img } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  webformatURL,
  tags,
  largeImageURL,
  onClickImage,
}) => {
  return (
    <Item>
      <Img
        src={webformatURL}
        alt={tags}
        width="200"
        onClick={() => onClickImage({ largeImageURL, tags })}
      />
    </Item>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onClickImage: PropTypes.func.isRequired,
};
