// File: client/src/pages/portfolio/Home.tsx

import React from 'react';
import styles from '../../assets/css/portfolio/pageStyles/Home.module.css';

const Home: React.FC = () => {
  return (
      <div className={styles.textSection}>
        <h1 className={styles.heading}>About me</h1>
        <p className={styles.paragraph}>
          I’m a full-stack developer with a soft spot for beautiful design, playful interfaces, and creative problem solving. 
          When I’m not coding, you’ll probably find me dancing, painting, or scultping something weird and wonderful. 
          I believe in human-centered design, late-night brainstorms, and making the web a little more magical.
        </p>
        <button className={styles.resumeButton}>Resume</button>
      </div>
  );
};

export default Home;
