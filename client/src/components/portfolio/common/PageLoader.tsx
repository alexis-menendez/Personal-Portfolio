// File: client/src/components/portfolio/common/PageLoader.tsx

import React from 'react';
import Lottie from 'lottie-react';
import animationData from '../../../assets/animations/portfolio/NightLoadingAnimation.json'; 
import styles from '../../../assets/css/portfolio/common/PageLoader.module.css';

const PageLoader: React.FC = () => {
  return (
    <div className={styles.loaderOverlay}>
      <Lottie animationData={animationData} loop autoplay />
    </div>
  );
};

export default PageLoader;
