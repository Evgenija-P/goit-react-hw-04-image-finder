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
  const [currentPage, setСurrentPage] = useState(0);
  const [text, setText] = useState('');

  useEffect(() => {
    setСurrentPage(0);
  }, [text]);

  useEffect(() => {
    if (page >= currentPage) {
      setСurrentPage(page);
    }
  }, [currentPage, page]);

  console.log('propPage', page);
  console.log('currentPage', currentPage);

  const handleChange = e => {
    setText(e.target.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (text.trim() === '') {
      toast.error('Введите текст запроса!');
      return;
    }

    // setСurrentPage(currentPage + 1);

    onForm({ text, currentPage });
    console.log(text, currentPage);
  };

  const id = nanoid(3);

  return (
    <SearchHeader>
      <SearchForm
        onSubmit={handleSubmit}
        onClick={() => setСurrentPage(page + 1)}
      >
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
