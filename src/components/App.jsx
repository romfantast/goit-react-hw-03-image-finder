import React, { Component } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { ThreeDots } from 'react-loader-spinner';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import { axiosGetImage } from 'pixabay-api/pixabay-api';
import css from './App.module.css';

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
    isOpenModal: false,
    activePhoto: null,
    totalPages: null,
    status: FETCH_STATUS.Idle,
  };

  imagesBlockRef = React.createRef();

  async componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    if (prevState.page !== this.state.page) {
      this.setState({ status: FETCH_STATUS.Pending });
      try {
        const { data } = await axiosGetImage(query, page);
        this.setState(prevState => ({
          images: [...prevState.images, ...data.hits],
          page,
          status: FETCH_STATUS.Resolved,
        }));
      } catch (error) {
        this.setState({ status: FETCH_STATUS.Rejected });
      }
    }

    if (
      prevState.images.length < this.state.images.length ||
      prevState.images[0]?.id !== this.state.images[0]?.id
    ) {
      this.scrollToBottom();
    }
  }
  scrollToBottom = () => {
    this.imagesBlockRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  formSubmitHandler = async value => {
    const { page } = this.state;
    this.setState({ status: FETCH_STATUS.Pending });
    if (value) {
      try {
        const { data } = await axiosGetImage(value, page);
        if (!data.hits.length) {
          this.setState({ status: FETCH_STATUS.Rejected, images: [] });
          return Notify.info('There are no images with this query');
        }

        this.setState({
          images: [...data.hits],
          status: FETCH_STATUS.Resolved,
          page: 1,
          query: value,
          totalPages: Math.ceil(data.totalHits / 15),
        });
      } catch (error) {
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

  handleToggleModal = activePhoto => {
    this.setState(prev => ({ isOpenModal: !prev.isOpenModal, activePhoto }));
  };

  render() {
    const { formSubmitHandler, handleLoadMore, handleToggleModal } = this;
    const { images, status, isOpenModal, activePhoto, totalPages, page } =
      this.state;
    return (
      <>
        <Searchbar formSubmitHandler={formSubmitHandler} />
        {(status === FETCH_STATUS.Resolved || page > 1) && (
          <>
            <ImageGallery imagesList={images} onOpenModal={handleToggleModal} />
            {isOpenModal && (
              <Modal
                modalPhoto={activePhoto}
                onToggleModal={handleToggleModal}
              />
            )}
          </>
        )}

        {status === FETCH_STATUS.Rejected && (
          <p className={css.error}>
            Something went wrong... Check the info above and try again :/
          </p>
        )}

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

        {status === FETCH_STATUS.Resolved &&
          page !== totalPages &&
          images.length !== 0 && (
            <div className={css.btnLoadMoreWrapper}>
              <Button ref={this.listRef} onLoadMore={handleLoadMore}>
                Load More
              </Button>
              <div ref={this.imagesBlockRef} />
            </div>
          )}
      </>
    );
  }
}
