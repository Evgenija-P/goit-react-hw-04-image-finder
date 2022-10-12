import React from 'react';
import PropTypes from 'prop-types';
import { BTN } from './Button.styled';

export const Button = ({ page, onClickButton }) => {
  return (
    <BTN type="button" onClick={() => onClickButton((page = page + 1))}>
      Load more
    </BTN>
  );
};

Button.propTypes = {
  page: PropTypes.number.isRequired,
  onClickButton: PropTypes.func.isRequired,
};
