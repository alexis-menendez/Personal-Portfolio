// File: client/src/components/portfolio/layout/PortfolioLayout.tsx

import React from 'react';
import { Outlet } from 'react-router-dom';

const PortfolioLayout: React.FC = () => {
  console.log('✅ PortfolioLayout rendered');

  return (
    <div
      className="w-full min-h-screen text-white relative overflow-hidden"
      style={{ backgroundColor: 'black' }}
    >
      <div className="relative z-10 flex flex-col items-center min-h-screen">
        {/* TODO: Add Portfolio Navbar */}
        <main className="w-full p-4">
          <Outlet />
        </main>
        {/* TODO: Add Portfolio Footer */}
      </div>
    </div>
  );
};

export default PortfolioLayout;
