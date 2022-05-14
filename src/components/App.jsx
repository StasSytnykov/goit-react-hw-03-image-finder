import { Component } from 'react';
import { Searchbar } from './Searchbar';
import { ImageGellary } from './ImageGallery';
import { ImgApiService } from './services/api';
import { Button } from './Button';
import { Loader } from 'components/Loader';

const imgApiService = new ImgApiService();

export class App extends Component {
  state = {
    imageArr: [],
    query: '',
    error: null,
    isLoading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    imgApiService.query = this.state.query;

    if (prevState.query !== this.state.query) {
      this.onFetchImage();
    }
  }

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
      console.log(imageArr);
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
      console.log(imageArr);
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
    return (
      <>
        <Searchbar onSubmit={this.onSearch} />
        <ImageGellary images={this.state.imageArr} />
        {this.state.isLoading && <Loader />}
        {this.state.imageArr.length >= 12 && (
          <Button onLoadMore={this.onLoadMore} loading={this.state.isLoading} />
        )}
      </>
    );
  }
}
