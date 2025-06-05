// File: client/src/components/innerOrbit/layout/IOmainLayout/IOMainLayout.tsx

import React from 'react';
import { Outlet } from 'react-router-dom';

// Components
import StarBackground from '../../common/StarBackground';
import IOMainLayoutBackground from './IOMainLayoutBackground';
import NavBar from '../nav/IONavBar';
import Footer from '../nav/IOFooter';

// Styles
import styles from '../../../../../assets/css/innerOrbit/layout/IOMainLayoutBackground.module.css';

const IOMainLayout: React.FC = () => {
  return (
    <div className="w-full min-h-screen text-white relative overflow-hidden" style={{ backgroundColor: 'transparent' }}>

      <StarBackground />
      <IOMainLayoutBackground />

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
