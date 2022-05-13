import { ImageGalleryItem } from './ImageGalleryItem';
import style from './ImageGallery.module.css';

export const ImageGellary = ({ images }) => {
  return (
    <ul className={style.ImageGallery}>
      <ImageGalleryItem images={images} />
    </ul>
  );
};
