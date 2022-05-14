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
  };

  componentDidUpdate(prevProps, prevState) {
    imgApiService.query = this.state.query;

    if (prevState.query !== this.state.query) {
      this.onFetchImage();
    }
  }

  onToggleModal = event => {
    console.log(event.target.src);
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  // async componentDidUpdate(prevProps, prevState) {
  //   imgApiService.query = this.state.query;

  //   if (prevState.query !== this.state.query) {
  //     this.setState({ isLoading: true });

  //     try {
  //       const imageArr = await imgApiService.fetchImage();
  //       console.log(imageArr);
  //       this.setState({ imageArr });
  //     } catch (error) {
  //       this.setState({ error });
  //     } finally {
  //       this.setState({ isLoading: false });
  //     }
  //   }
  // }

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

  onSearch = newQuery => {
    this.setState({
      query: newQuery,
    });
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
        <ImageGallery images={imageArr} onToggleModal={this.onToggleModal} />
        {showModal && <Modal images={imageArr} />}
        {isLoading && <Loader />}
        {imageArr.length >= 12 && (
          <Button onLoadMore={this.onLoadMore} loading={isLoading} />
        )}
      </>
    );
  }
}
