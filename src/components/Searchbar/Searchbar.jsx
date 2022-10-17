import React, { useState, useEffect, useRef } from 'react';
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

export const Searchbar = ({ page, onFormText, onFormPage }) => {
  const [currentPage, setСurrentPage] = useState(0);
  const [text, setText] = useState('');
  const isFirsRender = useRef(true);

  useEffect(() => {
    if (isFirsRender.current) {
      isFirsRender.current = false;
      return;
    }
    if (page >= currentPage) {
      setСurrentPage(page);
    } else {
      onFormPage({ currentPage });
    }
  }, [currentPage, onFormPage, page]);

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

    setСurrentPage(currentPage + 1);

    onFormText({ text, currentPage });
    console.log(text, currentPage);
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
  onSearch: PropTypes.func,
  onFormText: PropTypes.func.isRequired,
  onFormPage: PropTypes.func.isRequired,
};
