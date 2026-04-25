// File: client/src/components/portfolio/layout/RetroLayout.tsx

import React, { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

// Layout structure
import NavBar from './NavBar';
import Footer from './Footer';

// Background elements
import SunsetGradient from '../common/SunsetGradient';
import Clouds from '../common/Clouds';
import SunsetMask from '../common/SunsetMask';
import TransparentStars from '../common/TransparentStars';
import Arch from '../common/Arch';
// If you decide to add other background components later, you can uncomment these:
// import StarBackground from '../common/StarBackground';

interface RetroLayoutProps {
  children?: ReactNode;
  showNav?: boolean;
  showArch?: boolean;
}

const RetroLayout: React.FC<RetroLayoutProps> = ({ children, showNav = true, showArch = true }) => {
  return (
    <div>
      {/* Background layers */}
      <SunsetGradient />       {/* Layer 7: --z-sunset-gradient */}
      <Clouds />               {/* Layer 6: --z-clouds */}
      <SunsetMask />           {/* Layer 5: --z-sunset-mask */}
      <TransparentStars />     {/* Layer 4: --z-stars (includes shooting stars) */}
      {showArch && <Arch />}   {/* Layer 2: --z-black-arch */}

      {showNav && <NavBar />}

      <main>
        {children}
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default RetroLayout;
