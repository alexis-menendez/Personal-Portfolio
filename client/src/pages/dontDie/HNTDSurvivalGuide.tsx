// File: client/src/pages/dontDie/HNTDSurvivalGuide.tsx

// ── Imports ────────────────────────────────────────────────────
import React, { useState } from 'react';
import HNTDNavigation from '../../components/dontDie/HNTDNavigation';
import ReturnToPortfolio from '../../components/innerOrbit/common/IOReturnToPortfolio';
import styles from '../../assets/css/dontDie/HNTDConsole.module.css';
import { useHNTDPlanets } from '../../context/HNTDPlanetContext';
import type { SurvivalEntry } from '../../context/HNTDPlanetContext';
import { buildAllEntries, CATEGORY_COLOR, CATEGORY_LABEL } from '../../data/dontDie/HNTDSurvivalGuideData';

// ── Entry overlay — full-screen modal for reading a single entry ─
const EntryOverlay: React.FC<{ entry: SurvivalEntry; onClose: () => void }> = ({ entry, onClose }) => (
  <div
    style={{
      position: 'fixed', inset: 0, zIndex: 200,
      background: 'rgba(0,0,0,0.75)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}
    onClick={onClose}
  >
    <div
      style={{
        background: 'rgba(0,10,15,0.97)', border: '1px solid rgba(0,255,225,0.3)',
        borderRadius: 10, padding: '1.75rem', maxWidth: 560, width: '90%',
        maxHeight: '80vh', overflowY: 'auto',
      }}
      onClick={e => e.stopPropagation()}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.4rem' }}>
        <p style={{ fontFamily: 'Orbitron', fontSize: '0.82rem', color: CATEGORY_COLOR[entry.category], margin: 0, letterSpacing: '0.08em' }}>
          {entry.title}
        </p>
        <span style={{ fontFamily: 'Courier New', fontSize: '0.62rem', color: CATEGORY_COLOR[entry.category], marginLeft: '1rem', flexShrink: 0 }}>
          {CATEGORY_LABEL[entry.category]}
        </span>
      </div>
      <p style={{ fontFamily: 'Courier New', fontSize: '0.82rem', color: '#00ffe1', lineHeight: 1.85, whiteSpace: 'pre-line', margin: '0.6rem 0 0.8rem' }}>
        {entry.content}
      </p>
      <p style={{ fontFamily: 'Courier New', fontSize: '0.64rem', color: 'rgba(0,255,225,0.4)', margin: '0 0 1rem' }}>
        {entry.planet} · {entry.author} · {entry.date}
      </p>
      <button
        onClick={onClose}
        style={{
          fontFamily: 'Courier New', fontSize: '0.72rem', color: '#00ffe1',
          background: 'transparent', border: '1px solid rgba(0,255,225,0.3)',
          padding: '0.3rem 0.8rem', cursor: 'pointer', letterSpacing: '0.08em',
        }}
      >
        [ Close ]
      </button>
    </div>
  </div>
);

// ── Component ──────────────────────────────────────────────────
const HNTDSurvivalGuide: React.FC = () => {
  const {
    hasVisited, followedCoordsDoubt, tinkeredScannerBrune, deathEntries,
  } = useHNTDPlanets();

  // ── Local state — tracks which entry is open in the overlay ───
  const [selected, setSelected] = useState<SurvivalEntry | null>(null);

  // ── Build visible entries based on gameplay progress ──────────
  const entries = buildAllEntries({
    visitedDoubt:         hasVisited('planetone'),
    visitedBrune:         hasVisited('planettwo'),
    followedCoordsDoubt,
    tinkeredScannerBrune,
  }, deathEntries);

  // ── Render ─────────────────────────────────────────────────────
  return (
    <div className={styles.consoleBackground}>
      <div className={styles.consoleScreen}>
        <div className={styles.consoleContent}>

          <div className={styles.navColumn}>
            <HNTDNavigation />
          </div>

          <div className={styles.survivalPageContent}>
            <div className={styles.logsHeader}>
              <p className={styles.logsTitle}>// SURVIVAL GUIDE</p>
            </div>

            <p className={styles.dimText} style={{ marginBottom: '0.7rem', fontSize: '0.68rem', color: 'rgba(0,255,225,0.6)', letterSpacing: '0.04em' }}>
              Additional sections unlock as you explore. Access to new field data is restricted on a need-to-know basis to protect the company's proprietary operational data. See Explorer Conduct Agreement, Appendix D.
            </p>

            <div className={styles.logsList}>
              {entries.map((e, i) => (
                <div
                  key={i}
                  className={styles.logCard}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setSelected(e)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.2rem' }}>
                    <p className={styles.logCardTitle}>{e.title}</p>
                    <span style={{ fontFamily: 'Courier New', fontSize: '0.6rem', color: CATEGORY_COLOR[e.category], flexShrink: 0, marginLeft: '0.5rem' }}>
                      {CATEGORY_LABEL[e.category]}
                    </span>
                  </div>
                  <p className={styles.logCardSnippet} style={{ whiteSpace: 'pre-line' }}>
                    {e.content.length > 160 ? e.content.slice(0, 160) + '…' : e.content}
                  </p>
                  <p className={styles.logCardMeta}>{e.planet} · {e.author} · {e.date}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {selected && <EntryOverlay entry={selected} onClose={() => setSelected(null)} />}

      <ReturnToPortfolio />
    </div>
  );
};

export default HNTDSurvivalGuide;
