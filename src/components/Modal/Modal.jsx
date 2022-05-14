import { Component } from 'react';
import { createPortal } from 'react-dom';
import style from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  // onGetLargeImage = event => {
  //   console.log(event.currentTarget);
  //   // this.props.images.map(image => {
  //   //   console.log(image.largeImageURL);
  //   //   return image.largeImageURL;
  //   // });
  // };

  render() {
    return createPortal(
      <div className={style.Overlay}>
        <div className={style.Modal}>
          <img src="" alt="" />
        </div>
      </div>,
      modalRoot
    );
  }
}
