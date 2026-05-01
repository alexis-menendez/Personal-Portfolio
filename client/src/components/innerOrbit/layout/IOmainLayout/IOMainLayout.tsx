// File: client/src/components/innerOrbit/layout/IOmainLayout/IOMainLayout.tsx

// React
import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

// Subcomponents
import StarBackground from '../../common/IOStarBackground';
import IOMainLayoutBackground from './IOMainLayoutBackground';
import NavBar from '../nav/IONavBar';
import Footer from '../nav/IOFooter';
import ReturnToPortfolio from '../../common/IOReturnToPortfolio';

// Styles
import styles from '../../../../assets/css/innerOrbit/layout/IOMainLayoutBackground.module.css';

const IOMainLayout: React.FC = () => {
  useEffect(() => {
    document.documentElement.setAttribute('data-scrollbar', 'innerOrbit');
    return () => document.documentElement.removeAttribute('data-scrollbar');
  }, []);

  return (
    <div className="w-full min-h-screen text-white relative overflow-hidden" style={{ backgroundColor: 'transparent' }}>

      <StarBackground />
      <IOMainLayoutBackground />

      <ReturnToPortfolio />
      <div className="relative z-10 flex flex-col items-center min-h-screen">
        <div className={styles['gradient-overlay']}>
          <NavBar />
          <main className="w-full">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default IOMainLayout;
