// File: client/src/pages/portfolio/UnderConstruction.tsx

import React from 'react';
import styles from '../../assets/css/portfolio/pageStyles/UnderConstruction.module.css';

const UnderConstruction: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.moon}>
        <p className={styles.eyebrow}>Alex Menendez</p>
        <h1 className={styles.title}>Something New</h1>
        <p className={styles.subtitle}>is on the way</p>
        <p className={styles.message}>
          This site is currently being redesigned,<br />
          check back soon.
        </p>
      </div>
    </div>
  );
};

export default UnderConstruction;
