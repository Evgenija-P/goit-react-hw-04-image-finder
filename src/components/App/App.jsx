import React, { useState, useEffect } from 'react';
import { ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

import { Searchbar } from 'components/Searchbar';
import { ImageGallery } from 'components/ImageGallery';
import { AppWrapper } from './App.styled';
import { Modal } from 'components/Modal';
import { Button } from 'components/Button';
import { fetchImage } from '../api';
import { Loader } from 'components/Loader';

export const App = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');

  const [modalUrl, setModalUrl] = useState('');
  const [alt, setAlt] = useState('');
  const [items, setiItems] = useState([]);
  const [perPage, setPerPage] = useState(12);
  const [isLoading, setIsLoading] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [showButton, setshowButton] = useState(false);

  const options = {
    position: 'top-center',
    autoClose: 3000,
  };

  function onForm({ text, currentPage }) {
    setQuery(text);
    setPage(currentPage);
  }

  function modalImage({ largeImageURL, tags }) {
    setModalUrl(largeImageURL);
    setAlt(tags);
  }

  useEffect(() => {
    setIsLoading(true);
    fetchImage(page, perPage, query)
      .then(data => {
        const { hits, totalHits } = data.data;
        console.log(hits, totalHits);
        if (hits) {
          setiItems([...items, ...hits]);
          setshowButton(true);
        } else {
          setiItems(hits);
        }
        if (totalHits > 0) {
          toast.success(`Hooray! We found ${totalHits} images.`, options);
          const lastPage = Math.ceil(totalHits / perPage);
          if (page === lastPage) {
            toast.warn('Sorry, this is the last page...', options);
            setshowButton(false);
          }
        } else if (query !== query) {
          toast.warn(
            'Oops, we did not find anything for your request!',
            options
          );
        }
      })
      .catch(error => {
        console.log(error);
        toast.error(
          'Oops, something went wrong. Repeat one more time!',
          options
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
    console.log(items);
  }, [query, page]);

  function onClick(page) {
    setPage(page);
  }
  return (
    <AppWrapper>
      <Searchbar onForm={onForm} />
      {isLoading && <Loader />}
      {items && (
        <ImageGallery
          items={items}
          modalImage={modalImage}
          // toggleModal={toggleModal}
        />
      )}
      {showButton && (!items || items.length !== 0) && (
        <Button page={page} onClickButton={onClick} />
      )}
      <ToastContainer transition={Flip} />
      {/* {showModal && <Modal src={modalUrl} alt={alt} onClose={toggleModal} />} */}
    </AppWrapper>
  );
};
