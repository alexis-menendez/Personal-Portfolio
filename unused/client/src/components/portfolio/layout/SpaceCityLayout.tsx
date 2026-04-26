// File: client/src/components/portfolio/layout/SpaceCityLayout.tsx

import React, { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';
import StarBackground from '../common/StarBackground';
import ShootingStar from '../common/ShootingStar';
import styles from '../../../assets/css/portfolio/layout/SpaceCityLayout.module.css';

interface SpaceCityLayoutProps {
  children?: ReactNode;
}

const SpaceCityLayout: React.FC<SpaceCityLayoutProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      {/* Twinkling + shooting stars */}
      <div className={styles.stars}>
        <StarBackground />
        <ShootingStar />
      </div>

      <NavBar />

      <main className={styles.main}>
        {children}
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default SpaceCityLayout;
