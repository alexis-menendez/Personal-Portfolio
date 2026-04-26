// File: Client/src/components/portfolio/layout/PsychedelicLayout.tsx

import React, { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import styles from '../../../assets/css/portfolio/layout/PortfolioLayout.module.css'; 
import StarBackground from '../common/StarBackground';
import ShootingStar from '../common/ShootingStar';
import NavBar from './NavBar';
import Footer from './Footer';

interface PsychedelicLayoutProps {
  children?: ReactNode;
}

const PsychedelicLayout: React.FC<PsychedelicLayoutProps> = ({ children }) => {
  return (
    <div className={styles.containerPsychedelic}>
      <div className={styles.starLayer}>
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

export default PsychedelicLayout;
