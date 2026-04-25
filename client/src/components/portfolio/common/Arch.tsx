// File: client/src/components/portfolio/common/Arch.tsx

import React, { useId } from 'react';
import styles from '../../../assets/css/portfolio/common/Arch.module.css';

type ArchProps = {
  /** Width of the transparent arch opening (percentage of viewport width) */
  widthPct?: number;
  /** Height of the transparent arch opening (percentage of viewport height) */
  heightPct?: number;
  /** Vertical offset of the arch opening from the top (percentage of viewport height) */
  topOffsetPct?: number;
  /** Optional: control gradient strength from midnight blue to black (0–1) */
  blueOpacity?: number;
  /** When true, renders the arch in the foreground (positive z-index) so content scrolls behind it */
  foreground?: boolean;
};

/**
 * Arch overlay (Layer 2)
 * - Sits on z-index: var(--z-black-arch)
 * - Transparent arch-shaped center, dark gradient outside
 * - Pointer-events disabled so it won't block interaction
 */
const Arch: React.FC<ArchProps> = ({
  widthPct = 42,
  heightPct = 72,
  topOffsetPct = 12,
  blueOpacity = 0.92,
  foreground = false,
}) => {
  const uid = useId();
  const gradId = `arch-bg-${uid}`;
  const maskId = `arch-cutout-${uid}`;

  // vertical positioning
  const top = Math.max(0, Math.min(90, topOffsetPct));

  const w = widthPct;

  // keep your original height logic
  const hAvailable = 100 - top;
  const buffer = 2; // extend a little past the bottom
  const h = hAvailable + buffer;

  // Arch geometry
  const r = w / 2;
  const left = (100 - w) / 2;
  const right = left + w;
  const topY = top + r;
  const bottomY = top + h;

  // Path for the opening shape (hole)
  const archPath = `M ${left} ${bottomY} V ${topY} A ${r} ${r} 0 0 1 ${right} ${topY} V ${bottomY} Z`;

  return (
    <div
      className={styles.archOverlay}
      style={foreground ? { zIndex: 2 } : undefined}
      aria-hidden="true"
    >
      <svg
        className={styles.svg}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        role="img"
      >
        <defs>
          {/* Midnight → black background gradient */}
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(10,16,48,1)" stopOpacity={blueOpacity} />
            <stop offset="55%" stopColor="rgba(6,10,28,1)" stopOpacity={1} />
            <stop offset="100%" stopColor="rgba(0,0,0,1)" stopOpacity={1} />
          </linearGradient>

          {/* Mask: white = keep (show gradient), black = hole (transparent) */}
          <mask id={maskId} maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse">
            <rect x="0" y="0" width="100" height="100" fill="white" />
            <path d={archPath} fill="black" />
          </mask>
        </defs>

        {/* Full-viewport rect with gradient, masked so the arch center is transparent */}
        <rect
          x="0"
          y="0"
          width="100"
          height="100"
          fill={`url(#${gradId})`}
          mask={`url(#${maskId})`}
        />
      </svg>
    </div>
  );
};

export default Arch;
