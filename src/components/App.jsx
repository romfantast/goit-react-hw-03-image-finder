import React, { Component } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { ThreeDots } from 'react-loader-spinner';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import css from './App.module.css';

import { axiosGetImage } from 'pixabay-api/pixabay-api';

const FETCH_STATUS = {
  Idle: 'idle',
  Pending: 'pending',
  Resolved: 'resolved',
  Rejected: 'rejected',
};

export default class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    totalPages: null,
    status: FETCH_STATUS.Idle,
  };

  async componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    if (prevState.page !== this.state.page) {
      this.setState({ status: FETCH_STATUS.Pending });

      try {
        const { data } = await axiosGetImage(query, page);
        console.log(data);
        this.setState(prevState => ({
          images: [...prevState.images, ...data.hits],
          page,
          status: FETCH_STATUS.Resolved,
        }));
      } catch (error) {
        this.setState({ status: FETCH_STATUS.Rejected });
      }
    }
  }

  formSubmitHandler = async value => {
    const { page } = this.state;
    this.setState({ status: FETCH_STATUS.Pending });
    if (value) {
      try {
        const { data } = await axiosGetImage(value, page);
        console.log(data);
        this.setState({
          images: [...data.hits],
          status: FETCH_STATUS.Resolved,
          page: 1,
          query: value,
        });
      } catch (error) {
        console.log(error);
        this.setState({ status: FETCH_STATUS.Rejected });
      }
    } else {
      this.setState({ status: FETCH_STATUS.Rejected });
      Notify.warning('Please enter a valid query');
    }
  };

  handleLoadMore = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  render() {
    const { formSubmitHandler, handleLoadMore } = this;
    const { images, status } = this.state;
    return (
      <>
        <Searchbar formSubmitHandler={formSubmitHandler} />
        {images.length ? (
          <>
            <ImageGallery imagesList={images} />
          </>
        ) : null}
        {status === FETCH_STATUS.Pending && (
          <div className={css.loader}>
            <ThreeDots
              height="80"
              width="80"
              radius="9"
              color="#3f51b5"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
          </div>
        )}

        {status === FETCH_STATUS.Resolved && (
          <div className={css.btnLoadMoreWrapper}>
            <Button onLoadMore={handleLoadMore}>Load More</Button>
          </div>
        )}
      </>
    );
  }
}
