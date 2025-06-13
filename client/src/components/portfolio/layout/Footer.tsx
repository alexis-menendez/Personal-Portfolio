// File: client/src/components/portfolio/common/Footer.tsx

import React from 'react';
import styles from '../../../assets/css/portfolio/layout/Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <a href="https://github.com" className={styles.footerIcon}>🐱</a>
      <a href="https://linkedin.com" className={styles.footerIcon}>in</a>
      <a href="mailto:your@email.com" className={styles.footerIcon}>✉️</a>
      <span>Alex Menendez 2025</span>
    </footer>
  );
};

export default Footer;
