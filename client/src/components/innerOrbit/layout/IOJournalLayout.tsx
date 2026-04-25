// File: client/src/components/innerOrbit/layout/JournalLayout.tsx

// React
import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

// Subcomponents
import StarBackground from '../common/StarBackground';
import NavBar from './nav/IONavBar';
import ReturnToPortfolio from '../common/ReturnToPortfolio';

const IOJournalLayout: React.FC = () => {
  useEffect(() => {
    document.documentElement.setAttribute('data-scrollbar', 'innerOrbit');
    return () => document.documentElement.removeAttribute('data-scrollbar');
  }, []);

  return (
    <>
      <div
        className="w-full min-h-screen text-white relative overflow-hidden"
        style={{ backgroundColor: 'transparent' }}
      >
        <StarBackground />
        <ReturnToPortfolio />

        <div className="relative z-10 flex flex-col items-center min-h-screen">
          {/* Leave NavBar untouched to use full width */}
          <NavBar />

          {/* Only pad the main content */}
          <main className="w-full pt-12 pl-6 md:pl-12 lg:pl-20 xl:pl-32 2xl:pl-40">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default IOJournalLayout;
