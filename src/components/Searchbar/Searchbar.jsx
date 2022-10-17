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

export const Searchbar = ({ query, page, onFormText, onFormPage }) => {
  const [currentPage, setСurrentPage] = useState(1);
  const [text, setText] = useState('');

  useEffect(() => {
    if (query !== text) {
      setСurrentPage(1);
      return;
    }
  }, [query, text]);

  useEffect(() => {
    if (query === text && currentPage < page) {
      setСurrentPage(page);
    } else {
      onFormPage({ currentPage });
    }
  }, [currentPage, onFormPage, page, query, text]);

  const handleChange = e => {
    setText(e.target.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (text.trim() === '') {
      toast.error('Введите текст запроса!');
      return;
    }

    if (currentPage > 1) {
      setСurrentPage(currentPage + 1);
    }

    onFormText({ text });
  };

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
  query: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  onFormText: PropTypes.func.isRequired,
  onFormPage: PropTypes.func.isRequired,
};
