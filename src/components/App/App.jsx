import React, { useState, useEffect } from 'react';
import { ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

import { Searchbar } from 'components/Searchbar';
import { ImageGallery } from 'components/ImageGallery';
import { AppWrapper } from './App.styled';
import { Button } from 'components/Button';
import { fetchImage } from '../api';
import { Loader } from 'components/Loader';

export const App = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [items, setiItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showButton, setshowButton] = useState(false);

  function onFormText({ text }) {
    setQuery(text);
  }

  function onFormPage({ currentPage }) {
    setPage(currentPage);
  }

  useEffect(() => {
    setiItems([]);
    setPage(1);
  }, [query]);

  useEffect(() => {
    if (query === '') {
      return;
    }

    setIsLoading(true);
    fetchImage(page, query)
      .then(data => {
        const { hits, totalHits } = data.data;
        setiItems(prevItems => [...prevItems, ...hits]);
        if (totalHits > 0) {
          setshowButton(true);
        }
        if (totalHits > 0 && hits.length === totalHits) {
          toast.warn('Sorry, this is the last page...');
          setshowButton(false);
        } else if (totalHits === 0) {
          toast.warn('Oops, we did not find anything for your request!');
        }
      })
      .catch(error => {
        console.log(error);
        toast.error('Oops, something went wrong. Repeat one more time!');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [page, query]);

  function onClick(page) {
    setPage(page);
  }

  return (
    <AppWrapper>
      <Searchbar
        page={page}
        onFormText={onFormText}
        onFormPage={onFormPage}
        query={query}
      />
      {isLoading && <Loader />}
      {(!items || items.length !== 0) && <ImageGallery items={items} />}
      {showButton && (!items || items.length !== 0) && (
        <Button page={page} onClickButton={onClick} />
      )}
      <ToastContainer transition={Flip} />
    </AppWrapper>
  );
};
