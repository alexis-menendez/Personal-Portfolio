// File: client/src/components/portfolio/common/Footer.tsx

import React from 'react';
import styles from '../../../assets/css/portfolio/layout/Footer.module.css';
import { useNavigate } from 'react-router-dom';

const Footer: React.FC = () => {
  const navigate = useNavigate();

  const handleEmailClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    window.location.href = 'mailto:menendez.alex.d@gmail.com';
    setTimeout(() => {
      navigate('/contact');
    }, 1500);
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.iconRow}>
        <a href="#" onClick={handleEmailClick} className={styles.footerIcon}>
          <img src="/assets/portfolio/icons/footer/EmailFooter.svg" alt="Email" className={styles.iconImage} />
        </a>
        <a href="https://github.com/alexis-menendez" className={styles.footerIcon} target="_blank" rel="noopener noreferrer">
          <img src="/assets/portfolio/icons/footer/GitFooter.svg" alt="GitHub" className={styles.iconImage} />
        </a>
        <a href="https://www.linkedin.com/in/alex-d-menendez/" className={styles.footerIcon} target="_blank" rel="noopener noreferrer">
          <img src="/assets/portfolio/icons/footer/LinkedinFooter.svg" alt="LinkedIn" className={styles.iconImage} />
        </a>
      </div>
      <div className={styles.footerLine}></div>
      <span className={styles.footerText}>Alex Menendez 2025</span>
    </footer>
  );
};

export default Footer;

