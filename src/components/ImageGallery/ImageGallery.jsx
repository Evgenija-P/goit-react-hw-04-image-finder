import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

import { List } from './ImageGallery.styled';
// import { Modal } from '../Modal/Modal';

export const ImageGallery = ({ items }) => {
  // const [showModal, setShowModal] = useState(false);

  // function toggleModal() {
  //   setShowModal(!showModal);
  // }
  // async componentDidUpdate(prevProps, prevState) {
  //   const { page, perPage } = this.state;

  //   const prevQuery = prevProps.query;
  //   const nextQuery = this.props.query;
  //   const prevPage = prevState.page;
  //   const currentPage = this.state.page;
  //   // const nextPage = this.props.page;

  //   if (prevQuery !== nextQuery) {
  //     this.setState({ items: [], page: 1 });
  //   }

  //   // if (nextPage && nextPage !== currentPage) {
  //   //   this.setState({ page: this.props.page });
  //   // }

  //   const options = {
  //     position: 'top-center',
  //     autoClose: 3000,
  //   };

  //   if (prevPage !== currentPage || prevQuery !== nextQuery) {
  //     this.setState({ isLoading: true });
  //     try {
  //       const images = await fetchImage(page, perPage, nextQuery);
  //       this.setState(state =>
  //         state.items
  //           ? {
  //               items: [...state.items, ...images.hits],
  //               showButton: true,
  //             }
  //           : { items: images.hits }
  //       );
  //       if (images.totalHits > 0 && prevQuery !== nextQuery) {
  //         toast.success(
  //           `Hooray! We found ${images.totalHits} images.`,
  //           options
  //         );
  //         const lastPage = Math.ceil(images.totalHits / perPage);
  //         if (page === lastPage && prevQuery !== nextQuery) {
  //           toast.warn('Sorry, this is the last page...', options);
  //           this.setState({ showButton: false });
  //         }
  //       } else if (prevQuery !== nextQuery) {
  //         toast.warn(
  //           'Oops, we did not find anything for your request!',
  //           options
  //         );
  //       }
  //     } catch {
  //       toast.error(
  //         'Oops, something went wrong. Repeat one more time!',
  //         options
  //       );
  //     } finally {
  //       this.setState({ isLoading: false });
  //     }
  //   }
  // }

  // onClick = page => {
  //   this.setState({ page });
  // };

  // onClickImage = ({ largeImageURL, tags }) => {
  //   this.setState({ largeImageURL, tags });
  //   this.props.modalImage({ largeImageURL, tags });
  //   this.props.toggleModal();
  // };

  // const { isLoading, items, page, showButton } = this.state;
  return (
    <div>
      {
        <List>
          {items.map(({ id, webformatURL, tags, largeImageURL }) => (
            <ImageGalleryItem
              key={id}
              webformatURL={webformatURL}
              tags={tags}
              largeImageURL={largeImageURL}
            />
          ))}
        </List>
      }
    </div>
  );
};

ImageGallery.propTypes = {
  page: PropTypes.number.isRequired,
  query: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
  modalImage: PropTypes.func.isRequired,
};
