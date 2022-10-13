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
  // const [perPage, setPerPage] = useState(12);
  const [isLoading, setIsLoading] = useState(false);
  const [showButton, setshowButton] = useState(false);

  function onFormText({ text, currentPage }) {
    setQuery(text);
    setPage(currentPage);
    console.log(text, currentPage);
  }

  function onFormPage({ currentPage }) {
    setPage(currentPage);
    console.log(currentPage);
  }

  useEffect(() => {
    setiItems([]);
    setIsLoading(true);
    setPage(1);
    fetchImage(page, query)
      .then(data => {
        const { hits, totalHits } = data.data;
        console.log(hits, totalHits);
        setiItems(hits);

        if (totalHits > 0) {
          // toast.success(`Hooray! We found ${totalHits} images.`);
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
    console.log(items);
  }, [query]);

  useEffect(() => {
    if (page > 1) {
      setIsLoading(true);
      fetchImage(page, query)
        .then(data => {
          const { hits, totalHits } = data.data;
          console.log(hits, totalHits);
          setiItems([...items, ...hits]);
          setshowButton(true);

          if (totalHits > 0) {
            // toast.success(`Hooray! We found ${totalHits} images.`);
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
      // console.log(items);
    }
  }, [page]);

  function onClick(page) {
    setPage(page);
  }

  return (
    <AppWrapper>
      <Searchbar page={page} onFormText={onFormText} onFormPage={onFormPage} />
      {isLoading && <Loader />}
      {items && <ImageGallery items={items} />}
      {showButton && (!items || items.length !== 0) && (
        <Button page={page} onClickButton={onClick} />
      )}
      <ToastContainer transition={Flip} />
    </AppWrapper>
  );
};
