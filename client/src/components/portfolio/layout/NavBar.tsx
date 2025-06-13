// File: client/src/components/portfolio/layout/NavBar.tsx

import React from 'react';
import styles from '../../../assets/css/portfolio/layout/NavBar.module.css';

const NavBar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <a href="#about">About</a>
      <a href="#projects">Projects</a>
      <a href="#contact">Contact</a>
    </nav>
  );
};

export default NavBar;
