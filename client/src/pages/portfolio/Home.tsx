// File: client/src/pages/portfolio/Home.tsx

import React from 'react';
import ShortPortfolioLayout from '../../components/portfolio/layout/ShortPortfolioLayout';
import styles from '../../assets/css/portfolio/pageStyles/Home.module.css';

const Home: React.FC = () => {
  return (
    <ShortPortfolioLayout>
      <div className={styles.textSection}>
        <h1 className={styles.heading}>About me</h1>
        <p className={styles.paragraph}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <button className={styles.resumeButton}>Resume</button>
      </div>
    </ShortPortfolioLayout>
  );
};

export default Home;
