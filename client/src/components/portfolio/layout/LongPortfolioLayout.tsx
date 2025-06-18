// File: client/src/components/portfolio/layout/LongPortfolioLayout.tsx

import React, { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import styles from '../../../assets/css/portfolio/layout/PortfolioLayout.module.css'; 
import StarBackground from '../common/StarBackground';
import ShootingStar from '../common/ShootingStar';
import NavBar from './NavBar';
import FooterWhite from './FooterWhite';

interface LongPortfolioLayoutProps {
  children?: ReactNode;
}

const LongPortfolioLayout: React.FC<LongPortfolioLayoutProps> = ({ children }) => {
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

export default LongPortfolioLayout;
