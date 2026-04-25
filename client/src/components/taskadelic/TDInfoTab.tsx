// File: client/src/components/taskadelic/TDInfoTab.tsx

import React, { useState } from 'react';

interface Props {
  content: React.ReactNode;
}

const TDInfoTab = ({ content }: Props) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'fixed',
        bottom: 'calc(3rem + 96px + 1rem)',
        right: 0,
        width: hovered ? '280px' : '48px',
        height: hovered ? '200px' : '96px',
        borderRadius: hovered ? '24px 0 0 24px' : '96px 0 0 96px',
        zIndex: 9999,
        background: hovered ? 'rgba(40, 10, 60, 0.92)' : 'rgba(40, 10, 60, 0.75)',
        border: '1.5px solid rgba(191, 52, 117, 0.75)',
        borderRight: 'none',
        color: hovered ? '#F2C2D1' : '#BF3475',
        fontFamily: "'Inter Tight', sans-serif",
        cursor: 'default',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: hovered
          ? '-4px 0 28px rgba(191, 52, 117, 0.35)'
          : '-2px 0 14px rgba(191, 52, 117, 0.15)',
        transition: 'width 0.35s ease, height 0.35s ease, border-radius 0.35s ease, background 0.25s, box-shadow 0.25s, color 0.25s',
        display: 'flex',
        alignItems: hovered ? 'flex-start' : 'center',
        paddingTop: hovered ? '1rem' : '0',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        padding: 0,
      }}
    >
      {/* Icon — always visible */}
      <span style={{
        minWidth: '48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.1rem',
        flexShrink: 0,
        fontWeight: 700,
        fontFamily: 'serif',
      }}>
        ?
      </span>

      {/* Content — slides in on hover */}
      <span style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        opacity: hovered ? 1 : 0,
        transform: hovered ? 'translateX(0)' : 'translateX(10px)',
        transition: 'opacity 0.2s ease 0.1s, transform 0.2s ease 0.1s',
        paddingRight: '1.2rem',
        whiteSpace: 'normal',
        lineHeight: 1.4,
        fontSize: '0.72rem',
        fontWeight: 400,
        letterSpacing: '0.02em',
      }}>
        {content}
      </span>
    </div>
  );
};

export default TDInfoTab;
