import style from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ images }) => {
  console.log(images);
  return images.map(({ id, tags, webformatURL }) => (
    <li key={id} className={style.ImageGalleryItem}>
      <img
        className={style.ImageGalleryItemImage}
        src={webformatURL}
        alt={tags}
      />
    </li>
  ));
};
