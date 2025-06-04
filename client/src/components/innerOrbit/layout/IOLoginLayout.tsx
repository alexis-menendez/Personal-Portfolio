// File: client/src/components/innerOrbit/layout/LoginLayout.tsx

import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from '../../../../assets/css/innerOrbit/common/CosmicBackground.module.css';
import StarBackground from '../common/StarBackground';

const IOLoginLayout: React.FC = () => {
  return (
    <>
      {/* IOLogin Layout */}
      <div className={`w-full min-h-screen ${styles['cosmic-background']} relative overflow-y-auto`}>
        <StarBackground />
        <main className="relative z-10 w-full h-auto min-h-0 px-4 py-6 text-white overflow-y-auto">
          <Outlet />
          <div className="mt-10 text-3xl font-bold text-center text-pink-500"></div>
        </main>
      </div>
    </>
  );
};

export default IOLoginLayout;
