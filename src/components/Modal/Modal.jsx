import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { ModalWrapper, Overlay } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ src, alt, onClose }) => {
  useEffect(() => {
    function keyDown(e) {
      if (e.code === 'Escape' || e.currentTarget === e.target) {
        onClose();
      }
    }
    window.addEventListener('keydown', keyDown);
    return () => {
      window.removeEventListener('keydown', keyDown);
    };
  }, [onClose]);

  return createPortal(
    <Overlay onClick={onClose}>
      <ModalWrapper>
        <img src={src} alt={alt} />
      </ModalWrapper>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  alt: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
