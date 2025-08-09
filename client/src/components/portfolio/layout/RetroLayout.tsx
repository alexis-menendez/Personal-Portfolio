// File: client/src/components/portfolio/layout/RetroLayout.tsx

import React, { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

// Intentionally no CSS imports yet.
// This layout is a placeholder so App.tsx can import it without build errors.

import NavBar from './NavBar';
import Footer from './Footer';
// If you decide to add background components later, you can uncomment these:
// import StarBackground from '../common/StarBackground';
// import ShootingStar from '../common/ShootingStar';

interface RetroLayoutProps {
  children?: ReactNode;
}

const RetroLayout: React.FC<RetroLayoutProps> = ({ children }) => {
  return (
    <div>
      {/* Optional background layer (add when ready)
      <div>
        <StarBackground />
        <ShootingStar />
      </div>
      */}

      <NavBar />

      <main>
        {children}
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default RetroLayout;
