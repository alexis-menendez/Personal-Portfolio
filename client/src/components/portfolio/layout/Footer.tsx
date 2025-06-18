// File: client/src/components/portfolio/common/Footer.tsx

import React from 'react';
import styles from '../../../assets/css/portfolio/layout/Footer.module.css';
import { useNavigate } from 'react-router-dom';

const Footer: React.FC = () => {
  const navigate = useNavigate();

  const handleEmailClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Try to open the default mail client
    window.location.href = 'mailto:menendez.alex.d@gmail.com';

    // Set a fallback in case mail client fails to open
    setTimeout(() => {
      navigate('/contact');
    }, 1500); // Wait 1.5 seconds before fallback
  };

  return (
    <footer className={styles.footer}>
      <a href="https://github.com/alexis-menendez" className={styles.footerIcon}>🐱</a>
      <a href="https://www.linkedin.com/in/alex-d-menendez/" className={styles.footerIcon}>in</a>
      <a href="#" onClick={handleEmailClick} className={styles.footerIcon}>✉️</a>
      <span>Alex Menendez 2025</span>
    </footer>
  );
};

export default Footer;

