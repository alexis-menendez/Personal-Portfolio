// File: client/src/components/innerOrbit/common/IOReturnToPortfolio.tsx

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ReturnToPortfolio: React.FC = () => {
  const navigate  = useNavigate();
  const location  = useLocation();
  const [hovered, setHovered] = useState(false);

  // Use teal theme for HNTD routes, pink for everything else
  const isTeal = location.pathname.startsWith('/hntd');

  const bg        = isTeal
    ? (hovered ? 'rgba(0, 220, 200, 0.35)'  : 'rgba(0, 200, 180, 0.20)')
    : (hovered ? 'rgba(220, 40, 100, 0.35)' : 'rgba(220, 40, 100, 0.25)');
  const border    = isTeal
    ? 'rgba(0, 255, 225, 0.75)'
    : 'rgba(255, 60, 130, 0.75)';
  const textColor = isTeal
    ? (hovered ? '#00ffe1' : '#00d4c0')
    : (hovered ? '#ffaacc' : '#ff6daa');
  const shadow    = isTeal
    ? (hovered ? '-4px 0 28px rgba(0, 255, 225, 0.45)' : '-2px 0 14px rgba(0, 255, 225, 0.20)')
    : (hovered ? '-4px 0 28px rgba(255, 60, 130, 0.45)' : '-2px 0 14px rgba(255, 60, 130, 0.25)');

  return (
    <button
      onClick={() => navigate('/home')}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'fixed',
        bottom: '3rem',
        right: 0,
        width: hovered ? '240px' : '48px',
        height: '96px',
        borderRadius: hovered ? '48px 0 0 48px' : '96px 0 0 96px',
        zIndex: 9999,
        background: bg,
        border: `1.5px solid ${border}`,
        borderRight: 'none',
        color: textColor,
        fontFamily: "'Inter Tight', sans-serif",
        cursor: 'pointer',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: shadow,
        transition: 'width 0.35s ease, border-radius 0.35s ease, background 0.25s, box-shadow 0.25s, color 0.25s',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        padding: 0,
      }}
    >
      <span style={{ minWidth: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', flexShrink: 0 }}>
        ←
      </span>
      <span style={{
        display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
        opacity: hovered ? 1 : 0,
        transform: hovered ? 'translateX(0)' : 'translateX(10px)',
        transition: 'opacity 0.2s ease 0.1s, transform 0.2s ease 0.1s',
        paddingRight: '1.2rem', lineHeight: 1.35,
      }}>
        <span style={{ fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.06em' }}>Leave Demo</span>
        <span style={{ fontSize: '0.72rem', fontWeight: 400, letterSpacing: '0.04em', opacity: 0.75 }}>Return to Portfolio</span>
      </span>
    </button>
  );
};

export default ReturnToPortfolio;
