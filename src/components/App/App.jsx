import React, { Component } from 'react';
import { ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Searchbar } from 'components/Searchbar';
import { ImageGallery } from 'components/ImageGallery';
import { AppWrapper } from './App.styled';
import { Modal } from 'components/Modal';

export class App extends Component {
  state = {
    page: 1,
    query: '',
    showModal: false,
    modalUrl: '',
    alt: '',
  };

  onForm = ({ text, currentPage }) => {
    this.setState({ query: text, page: currentPage });
  };

  modalImage = ({ largeImageURL, tags }) => {
    this.setState({ modalUrl: largeImageURL, alt: tags });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { showModal, modalUrl, alt, query, page } = this.state;
    return (
      <AppWrapper>
        <Searchbar onForm={this.onForm} />
        <ImageGallery
          query={query}
          page={page}
          modalImage={this.modalImage}
          toggleModal={this.toggleModal}
        />
        <ToastContainer transition={Flip} />
        {showModal && (
          <Modal src={modalUrl} alt={alt} onClose={this.toggleModal} />
        )}
      </AppWrapper>
    );
  }
}
