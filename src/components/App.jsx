import { Component } from 'react';
import { Searchbar } from './Searchbar';
import { ImageGellary } from './ImageGallery';
import { onFetchImg } from './services/api';

export class App extends Component {
  state = {
    imageArr: [],
    query: '',
    error: null,
    isLoading: false,
  };

  // async componentDidMount() {
  //   this.setState({ isLoading: true });

  //   if (this.state.query) {
  //     try {
  //       const imageArr = await onFetchImg(this.state.query);
  //       this.setState({ imageArr });
  //     } catch (error) {
  //       this.setState({ error });
  //     } finally {
  //       this.setState({ isLoading: false });
  //     }
  //   }
  // }

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.setState({ isLoading: true });

      try {
        const imageArr = await onFetchImg(this.state.query);
        this.setState({ imageArr });
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
    }

    console.log(prevProps);
    console.log(prevState);
  }

  onSearch = newQuery => {
    this.setState({
      query: newQuery,
    });
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.onSearch} />
        <ImageGellary images={this.state.imageArr} />
      </>
    );
  }
}
