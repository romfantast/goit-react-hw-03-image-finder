import React, { Component } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import { axiosGetImage } from 'pixabay-api/pixabay-api';
import css from './App.module.css';
import Loader from './Loader/Loader';

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

  imagesBlockRef = React.createRef();

  async componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (
      prevState.page !== this.state.page ||
      prevState.query !== this.state.query
    ) {
      this.setState({ status: FETCH_STATUS.Pending });
      try {
        const { data } = await axiosGetImage(query, page);
        console.log(data);
        if (!data.total) {
          this.setState({ status: FETCH_STATUS.Rejected });
          return Notify.info('There are no images with this search string');
        }
        this.setState(prevState => ({
          images: [...prevState.images, ...data.hits],
          page,
          status: FETCH_STATUS.Resolved,
          totalPages: Math.ceil(data.totalHits / 15),
        }));
      } catch (error) {
        this.setState({ status: FETCH_STATUS.Rejected });
      }
    }

    if (prevState.images.length < this.state.images.length) {
      this.scrollToBottom();
    }
  }
  scrollToBottom = () => {
    this.imagesBlockRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  formSubmitHandler = async value => {
    if (!value) {
      return Notify.warning("The search string can't be an empty");
    }
    this.setState({
      query: value,
      currentPage: 1,
      images: [],
    });
  };

  handleLoadMore = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  handleToggleModal = activePhoto => {
    this.setState(prev => ({ isOpenModal: !prev.isOpenModal, activePhoto }));
  };

  render() {
    const { formSubmitHandler, handleLoadMore } = this;
    const { images, status, totalPages, page } = this.state;
    return (
      <>
        <Searchbar formSubmitHandler={formSubmitHandler} />
        {(status === FETCH_STATUS.Resolved || page > 1) && (
          <>
            <ImageGallery imagesList={images} />
          </>
        )}

        {status === FETCH_STATUS.Rejected && (
          <p className={css.error}>
            Something went wrong...Check the info above and try again :/
          </p>
        )}

        {status === FETCH_STATUS.Pending && (
          <div className={css.loader}>
            <Loader />
          </div>
        )}

        {status === FETCH_STATUS.Resolved &&
          page !== totalPages &&
          images.length !== 0 && (
            <div className={css.btnLoadMoreWrapper}>
              <Button onLoadMore={handleLoadMore}>Load More</Button>
              <div ref={this.imagesBlockRef} />
            </div>
          )}
      </>
    );
  }
}
