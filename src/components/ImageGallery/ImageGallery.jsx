import { ImageGalleryItem } from './ImageGalleryItem';
import style from './ImageGallery.module.css';

export const ImageGallery = ({ images, onToggleModal, onClickImg }) => {
  return (
    <ul className={style.ImageGallery}>
      <ImageGalleryItem
        onClickImg={onClickImg}
        images={images}
        onToggleModal={onToggleModal}
      />
    </ul>
  );
};
