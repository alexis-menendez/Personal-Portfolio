// File: client/src/components/portfolio/common/PageLoader.tsx

import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import styles from '../../../assets/css/portfolio/common/PageLoader.module.css';

const PageLoader: React.FC = () => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch('/assets/portfolio/animations/NightLoadingAnimation.json')
      .then((res) => res.json())
      .then(setAnimationData)
      .catch((err) => console.error('Failed to load animation:', err));
  }, []);

  return (
    <div className={styles.loaderOverlay}>
      {animationData && <Lottie animationData={animationData} loop autoplay />}
    </div>
  );
};

export default PageLoader;
