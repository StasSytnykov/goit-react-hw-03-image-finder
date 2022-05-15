import { Component } from 'react';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { ImgApiService } from './services/api';
import { Button } from './Button';
import { Loader } from 'components/Loader';
import { Modal } from './Modal';

const imgApiService = new ImgApiService();

export class App extends Component {
  state = {
    imageArr: [],
    query: '',
    error: null,
    isLoading: false,
    showModal: false,
    largeImageURL: '',
  };

  componentDidUpdate(prevProps, prevState) {
    imgApiService.query = this.state.query;

    if (prevState.query !== this.state.query) {
      this.onFetchImage();
    }
  }

  onSearch = newQuery => {
    this.setState({
      query: newQuery,
    });
  };

  onToggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  onClickImg = event => {
    console.log(event.target.src);
    this.setState({
      largeImageURL: this.state.imageArr.find(
        img => img.webformatURL === event.target.src
      ).largeImageURL,
    });
  };

  onFetchImage = async () => {
    this.setState({ isLoading: true });

    try {
      const imageArr = await imgApiService.fetchImage();
      this.setState({ imageArr });
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  onLoadMore = async () => {
    this.setState({ isLoading: true });

    try {
      const imageArr = await imgApiService.fetchImage();
      this.setState(prevState => ({
        imageArr: [...prevState.imageArr, ...imageArr],
      }));
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { isLoading, imageArr, showModal } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.onSearch} />

        {
          <ImageGallery
            onClickImg={this.onClickImg}
            images={imageArr}
            onToggleModal={this.onToggleModal}
          />
        }
        {showModal && (
          <Modal
            onToggleModal={this.onToggleModal}
            img={this.state.largeImageURL}
          />
        )}
        {isLoading && <Loader />}
        {imageArr.length >= 12 && (
          <Button onLoadMore={this.onLoadMore} loading={isLoading} />
        )}
      </>
    );
  }
}
