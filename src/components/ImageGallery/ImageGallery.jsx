import { ImageGalleryItem } from './ImageGalleryItem';
import style from './ImageGallery.module.css';

export const ImageGallery = ({ images, onToggleModal }) => {
  return (
    <ul className={style.ImageGallery}>
      <ImageGalleryItem images={images} onToggleModal={onToggleModal} />
    </ul>
  );
};
