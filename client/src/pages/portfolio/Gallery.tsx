// File: client/src/pages/portfolio/Gallery.tsx

import React, { useState } from 'react';
import styles from '../../assets/css/portfolio/pageStyles/Gallery.module.css';
import GalleryPopUp from '../../components/portfolio/pageComponents/GalleryPopUp';

const gallerySections = [
  {
    title: 'InnerOrbit',
    images: [
      { src: '/assets/portfolio/images/gallery/innerOrbit/home.png', alt: 'Home Page' },
      { src: '/assets/portfolio/images/gallery/innerOrbit/login.png', alt: 'Login Page' },
      { src: '/assets/portfolio/images/gallery/innerOrbit/register.png', alt: 'Register Page' },
      { src: '/assets/portfolio/images/gallery/innerOrbit/dashboard.png', alt: 'Dashboard Weekly Review' },
      { src: '/assets/portfolio/images/gallery/innerOrbit/timer.png', alt: 'Dashboard Pomodoro Timer' },
      { src: '/assets/portfolio/images/gallery/innerOrbit/timer-settings.png', alt: 'Pomodoro Timer Settings' },
      { src: '/assets/portfolio/images/gallery/innerOrbit/account.png', alt: 'Account Settings Page' },
      { src: '/assets/portfolio/images/gallery/innerOrbit/library.png', alt: 'Library Page' },
      { src: '/assets/portfolio/images/gallery/innerOrbit/tracker.png', alt: 'Tracker' },
      { src: '/assets/portfolio/images/gallery/innerOrbit/journal-galaxy.png', alt: 'Journal Galaxy View' },
      { src: '/assets/portfolio/images/gallery/innerOrbit/journal-constellation.png', alt: 'Journal Constellation View' },
      { src: '/assets/portfolio/images/gallery/innerOrbit/journal-notebook.png', alt: 'Journal Entry Notebook' },
      { src: '/assets/portfolio/images/gallery/innerOrbit/privacy.png', alt: 'Privacy Policy Page' },
      { src: '/assets/portfolio/images/gallery/innerOrbit/terms.png', alt: 'Terms of Service' },
    ]
  }
];

const Gallery: React.FC = () => {
  const [sectionIndices, setSectionIndices] = useState(gallerySections.map(() => 0));

  // Popup state
  const [popupSection, setPopupSection] = useState<number | null>(null);
  const [popupIndex, setPopupIndex] = useState<number>(0);

  const handleSlide = (sectionIdx: number, direction: 'next' | 'prev', total: number) => {
    setSectionIndices((prev) =>
      prev.map((current, i) =>
        i === sectionIdx
          ? direction === 'next'
            ? Math.min(current + 1, total - 3)
            : Math.max(0, current - 1)
          : current
      )
    );
  };

  const openPopUp = (sectionIdx: number, imageIdx: number) => {
    setPopupSection(sectionIdx);
    setPopupIndex(imageIdx);
  };

  const closePopUp = () => {
    setPopupSection(null);
  };

  const handlePopUpNext = () => {
    if (popupSection !== null) {
      const images = gallerySections[popupSection].images;
      setPopupIndex((prev) => Math.min(prev + 1, images.length - 1));
    }
  };

  const handlePopUpPrev = () => {
    setPopupIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <>
      <h1 className={styles.heading}>Gallery</h1>
      <p className={styles.subheading}>A visual overview of all projects in my portfolio.</p>

      {gallerySections.map((section, sectionIdx) => {
        const index = sectionIndices[sectionIdx];
        const offset = `-${(100 / 3) * index}%`;

        return (
          <section key={sectionIdx} className={styles.projectSection}>
            <h2 className={styles.projectTitle}>{section.title}</h2>
            <div className={styles.galleryControls}>
              <button
                onClick={() => handleSlide(sectionIdx, 'prev', section.images.length)}
                disabled={index === 0}
                className={styles.navButton}
              >
                ←
              </button>

              <div className={styles.carouselWindow}>
                <div
                  className={styles.carouselTrack}
                  style={{ transform: `translateX(${offset})` }}
                >
                  {section.images.map((img, i) => (
                    <div key={i} className={styles.carouselItem}>
                      <div className={styles.imageCard}>
                        <img
                          src={img.src}
                          alt={img.alt}
                          className={styles.image}
                          onClick={() => openPopUp(sectionIdx, i)}
                          style={{ cursor: 'pointer' }}
                        />
                        <p className={styles.caption}>{img.alt}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => handleSlide(sectionIdx, 'next', section.images.length)}
                disabled={index + 3 >= section.images.length}
                className={styles.navButton}
              >
                →
              </button>
            </div>
          </section>
        );
      })}

      {popupSection !== null && (
        <GalleryPopUp
          images={gallerySections[popupSection].images}
          currentIndex={popupIndex}
          onClose={closePopUp}
          onNext={handlePopUpNext}
          onPrev={handlePopUpPrev}
        />
      )}
    </>
  );
};

export default Gallery;

