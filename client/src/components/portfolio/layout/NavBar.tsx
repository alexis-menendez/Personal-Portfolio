// File: client/src/components/portfolio/layout/NavBar.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../../assets/css/portfolio/layout/NavBar.module.css';

const NavBar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <Link to="/">About</Link>
      <Link to="/projects">Projects</Link>
      <Link to="/contact">Contact</Link>
    </nav>
  );
};

export default NavBar;

