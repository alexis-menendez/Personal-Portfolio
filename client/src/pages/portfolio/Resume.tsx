// File: client/src/pages/portfolio/Resume.tsx

import React from 'react';
import styles from '../../assets/css/portfolio/pageStyles/Resume.module.css';

const Resume: React.FC = () => {
  return (
    <div className={styles.textSection}>
      <h1 className={styles.heading}>Resume</h1>
      <p className={styles.paragraph}>
        {/* Replace this with real resume content */}
        Experienced full-stack developer with a passion for building thoughtful, responsive, and creative applications. Skilled in JavaScript, TypeScript, React, Node.js, and MongoDB.
      </p>
    </div>
  );
};

export default Resume;
