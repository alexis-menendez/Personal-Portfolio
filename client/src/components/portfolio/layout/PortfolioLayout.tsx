import React from 'react';
import { Outlet } from 'react-router-dom';

const PortfolioLayout: React.FC = () => {
  return (
    <div>
      {/* TODO: Add Portfolio Navbar */}
      <main>
        <Outlet />
      </main>
      {/* TODO: Add Portfolio Footer */}
    </div>
  );
};

export default PortfolioLayout;
