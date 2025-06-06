// File: client/src/components/innerOrbit/pageComponents/journal/dev/DevStars.tsx

// React
import React from 'react';

// Subcomponents
import ShootingStar from '../../../common/ShootingStar';

const DevelopStars: React.FC = () => {
  return (
    <div
      style={{
        position: 'relative',
        background: 'black',
        minHeight: '100vh',
        overflow: 'hidden',
      }}
    >
      <ShootingStar frequency={2500} maxStars={6} />
    </div>
  );
};

export default DevelopStars;
