import style from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ images, onToggleModal, onClickImg }) => {
  return images.map(({ id, tags, webformatURL }) => {
    return (
      <li onClick={onToggleModal} key={id} className={style.ImageGalleryItem}>
        <img
          onClick={onClickImg}
          className={style.ImageGalleryItemImage}
          src={webformatURL}
          alt={tags}
        />
      </li>
    );
  });
};
