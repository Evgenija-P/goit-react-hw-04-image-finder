import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { toast } from 'react-toastify';

import {
  SearchHeader,
  SearchForm,
  SearchButton,
  ButtoTitle,
  Input,
} from './Searchbar.styled';

export const Searchbar = ({ page, onForm }) => {
  const [currentPage, setСurrentPage] = useState(1);
  const [text, setText] = useState('');
  // const propPage = page;

  useEffect(() => {
    setСurrentPage(page);
  }, [page]);

  // useEffect(() => {
  //   onForm({ text, currentPage });
  // }, [currentPage, text]);

  console.log('propPage', page);
  console.log('currentPage', currentPage);

  const handleChange = e => {
    setText(e.target.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (text.trim() === '') {
      toast.error('Введите текст запроса!', { position: 'top-center' });
      return;
    }

    setСurrentPage(currentPage + 1);

    onForm({ text, currentPage });
    console.log(text, currentPage);
  };

  useEffect(() => {
    setСurrentPage(1);
  }, [text]);

  const id = nanoid(3);

  return (
    <SearchHeader>
      <SearchForm onSubmit={handleSubmit}>
        <SearchButton type="submit">
          <ButtoTitle>Search</ButtoTitle>
        </SearchButton>

        <Input
          type="text"
          name="text"
          value={text}
          id={id}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </SearchForm>
    </SearchHeader>
  );
};

Searchbar.propTypes = {
  onSearch: PropTypes.func,
  onForm: PropTypes.func.isRequired,
};
