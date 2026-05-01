// File: client/src/pages/dontDie/HNTDEpilog.tsx

// ── Imports ────────────────────────────────────────────────────
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReturnToPortfolio from '../../components/innerOrbit/common/ReturnToPortfolio';
import styles from '../../assets/css/dontDie/HNTDHolomap.module.css';

// ── Epilog text — displayed after Ocean 12B strands the explorer ─
const EPILOG_TEXT =
`You spend the next several hours attempting to repair the ship.

Propulsion: unresponsive. Navigation: dark. Communications: no signal.

The emergency beacon fails on every attempt. You try seventeen times.

You sit in the crew compartment, watching the stars through the viewport. They do not move.

Your journey has ended here. For now.`;

// ── Typewriter hook — reveals text character by character ──────
function useTypewriter(text: string, speed = 28) {
  const [idx, setIdx] = useState(0);
  useEffect(() => { setIdx(0); }, [text]);
  useEffect(() => {
    if (idx >= text.length) return;
    const t = setTimeout(() => setIdx(i => i + 1), speed);
    return () => clearTimeout(t);
  }, [idx, text, speed]);
  return { displayed: text.slice(0, idx), done: idx >= text.length };
}

// ── Component ──────────────────────────────────────────────────
const HNTDEpilog: React.FC = () => {
  const navigate = useNavigate();
  const { displayed, done } = useTypewriter(EPILOG_TEXT, 28);

  // ── Render — shows epilog text then a continue button ─────────
  return (
    <div className={styles.shuttleWrapper}>
      <div className={styles.shuttleContent} style={{ maxWidth: '560px' }}>
        <p className={styles.shuttleTitle} style={{ marginBottom: '1.5rem', letterSpacing: '0.2em', opacity: 0.6 }}>
          // END
        </p>
        <p style={{
          fontFamily: 'Courier New', fontSize: 'clamp(0.72rem, 1.5vmin, 0.9rem)',
          color: '#00ffe1', lineHeight: 2, whiteSpace: 'pre-line',
        }}>
          {displayed}
          {!done && <span className={styles.veraTypingCursor} />}
        </p>
        {done && (
          <button className={styles.shuttleBtn} style={{ marginTop: '2rem' }}
            onClick={() => navigate('/hntd-thankyou')}>
            [ Continue ]
          </button>
        )}
      </div>
      <ReturnToPortfolio />
    </div>
  );
};

export default HNTDEpilog;
