// File: client/src/components/portfolio/pageComponents/GalleryPopUp.tsx

import React from 'react';
import styles from '../../../assets/css/portfolio/pageStyles/GalleryPopUp.module.css';

interface GalleryPopUpProps {
  images: { src: string; alt: string }[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const GalleryPopUp: React.FC<GalleryPopUpProps> = ({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext
}) => {
  const currentImage = images[currentIndex];

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>&times;</button>
        <div className={styles.controls}>
          {currentIndex > 0 && (
            <button onClick={onPrev} className={styles.navButton}>
              ←
            </button>
          )}
          <div className={styles.imageWrapper}>
            <img src={currentImage.src} alt={currentImage.alt} className={styles.image} />
            <p className={styles.caption}>{currentImage.alt}</p>
          </div>
          {currentIndex < images.length - 1 && (
            <button onClick={onNext} className={styles.navButton}>
              →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GalleryPopUp;
