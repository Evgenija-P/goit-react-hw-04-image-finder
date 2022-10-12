import React, { useState, useEffect } from 'react';
import { ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Searchbar } from 'components/Searchbar';
import { ImageGallery } from 'components/ImageGallery';
import { AppWrapper } from './App.styled';
import { Modal } from 'components/Modal';

export const App = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalUrl, setModalUrl] = useState('');
  const [alt, setAlt] = useState('');
  const [items, setiItems] = useState(null);
  const [perPage, setPerPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [showButton, setshowButton] = useState(false);

  // state = {
  //   page: 1,
  //   query: '',
  //   showModal: false,
  //   modalUrl: '',
  //   alt: '',

  //   items: null,
  //   perPage: 12,
  //   isLoading: false,
  //   largeImageURL: '',
  //   showButton: false,
  // };

  function onForm({ text, currentPage }) {
    setQuery(text);
    setPage(currentPage);
  }

  function modalImage({ largeImageURL, tags }) {
    setModalUrl(largeImageURL);
    setAlt(tags);
  }

  function toggleModal() {
    setShowModal(!showModal);
  }

  return (
    <AppWrapper>
      <Searchbar onForm={onForm} />
      <ImageGallery
        query={query}
        page={page}
        modalImage={modalImage}
        toggleModal={toggleModal}
      />
      <ToastContainer transition={Flip} />
      {showModal && <Modal src={modalUrl} alt={alt} onClose={toggleModal} />}
    </AppWrapper>
  );
};
