// File: client/src/components/portfolio/layout/GalleryLayout.tsx

import React, { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import StarBackground from '../common/StarBackground';
import ShootingStar from '../common/ShootingStar';
import NavBar from './NavBar';
import FooterWhite from './FooterWhite';
import styles from '../../../assets/css/portfolio/layout/GalleryLayout.module.css';

interface GalleryLayoutProps {
  children?: ReactNode;
}

const GalleryLayout: React.FC<GalleryLayoutProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.starLayer}>
        <StarBackground />
        <ShootingStar />
      </div>

      <NavBar />

      <main className={styles.main}>
        {children}
        <Outlet />
      </main>

      <FooterWhite />
    </div>
  );
};

export default GalleryLayout;
