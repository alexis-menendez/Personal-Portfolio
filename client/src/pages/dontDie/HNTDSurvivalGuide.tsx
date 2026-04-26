// File: client/src/pages/dontDie/HNTDSurvivalGuide.tsx

import React from 'react';
import HNTDNavigation from '../../components/dontDie/HNTDNavigation';
import ReturnToPortfolio from '../../components/innerOrbit/common/ReturnToPortfolio';
import styles from '../../assets/css/dontDie/HNTDConsole.module.css';
import { useHNTDPlanets } from '../../context/HNTDPlanetContext';
import type { SurvivalEntry } from '../../context/HNTDPlanetContext';

const CATEGORY_COLOR: Record<SurvivalEntry['category'], string> = {
  flora:       '#00ffe1',
  fauna:       '#00ffe1',
  hazard:      '#ff4d4d',
  observation: '#ffdd00',
};

const CATEGORY_LABEL: Record<SurvivalEntry['category'], string> = {
  flora: 'FLORA', fauna: 'FAUNA', hazard: 'HAZARD', observation: 'OBSERVATION',
};

// ── Static entries — always visible ───────────────────────────
const BASE_ENTRIES: SurvivalEntry[] = [
  {
    planet: 'General',
    title: 'Suit Integrity Under High UV',
    content: 'Prolonged exposure to Type-IV UV radiation causes micro-fractures in standard suit composites over 72 hours. Seal integrity drops approximately 3% per day. Rotate suits if mission length exceeds two days.',
    author: 'Cmdr. T. Osei', date: 'Year 3, Cycle 44', category: 'hazard',
  },
  {
    planet: 'General',
    title: 'Emergency Oxygen Calculation',
    content: 'At standard exertion levels, one standard O2 canister lasts approximately 90 minutes. Factor in 20% reserve margin. Never leave the ship with less than 150% of estimated mission time.',
    author: 'Safety Division, Sector 9', date: 'Year 1, Cycle 01', category: 'observation',
  },
];

// ── Planet entries — unlock on visit ──────────────────────────
const DOUBT_GENERAL: SurvivalEntry[] = [
  {
    planet: 'Doubt',
    title: 'Surface Conditions — Arid Basin',
    content: 'The equatorial basin on Doubt is composed primarily of iron-oxide silicate regolith. Visibility is adequate during daylight but degrades in low-light conditions due to particulate suspension. Temperature regulation is stable within standard suit parameters. The terrain reads as navigable on long-range scan. Do not assume that means it is safe.',
    author: 'Survey Division, Sector 9', date: 'Year 3, Cycle 02', category: 'observation',
  },
  {
    planet: 'Doubt',
    title: 'Sub-Surface Thermal Pockets',
    content: 'Ground temperature spikes of 200°F+ have been recorded at 12–18m depth. Do not use ground-penetrating equipment without thermal shielding. Two explorers lost equipment to unexpected venting events near the southern ridge.',
    author: 'Survey Team 7', date: 'Year 3, Cycle 28', category: 'hazard',
  },
  {
    planet: 'Doubt',
    title: 'The Hum',
    content: 'Multiple explorers have reported a low-frequency vibration with no identifiable source. VERA\'s instruments consistently fail to classify it. It is not geological. It is not electromagnetic. No explorer has identified its origin. Recommend logging any observations.',
    author: 'Anonymous', date: 'Year 2, Cycle 55', category: 'observation',
  },
];

// ── Doubt entries — only if explorer followed VERA's coordinates
const DOUBT_COORDS_ENTRIES: SurvivalEntry[] = [
  {
    planet: 'Doubt',
    title: 'Navigating Crystalline Terrain',
    content: 'The crystalline formations near the anomaly at bearing 047° do not register on standard surface scan. They appear as open terrain until you are within 3 meters. Suit material shears on contact. Mark every traversable path before proceeding. If your path narrows, do not continue — back out. The company does not cover suit replacement costs incurred during unsanctioned terrain deviation.',
    author: 'Cmdr. T. Osei', date: 'Year 3, Cycle 46', category: 'hazard',
  },
  {
    planet: 'Doubt',
    title: 'Emergency Suit Repair — Approved Field Protocol',
    content: 'In the event of a detected micro-tear or breach, explorers are advised to:\n\n1. Remain calm.\n2. Locate the Standard-Issue Emergency Patch Kit in left thigh compartment.\n3. Apply sealant patch to breach site using the approved applicator.\n4. Allow 45 seconds for bonding.\n5. Confirm re-seal via HUD pressure readout.\n\nNote: Explorers assume full responsibility for any suit integrity failures resulting from unauthorized terrain contact. See Explorer Conduct Agreement, Section 14-C. The company is not liable for patch kit contents, applicator performance, or outcomes.\n\nIf patch kit is empty, return to ship immediately.',
    author: 'Corporate Safety & Compliance, Sector 9', date: 'Year 1, Cycle 01', category: 'hazard',
  },
];

const BRUNE_GENERAL: SurvivalEntry[] = [
  {
    planet: 'Brune',
    title: 'Surface Conditions — Alpine Ridge',
    content: 'Brune\'s alpine environment is topographically complex. Granite substrate is stable in most areas but the eastern scree slope is actively eroding. Wind conditions cause ongoing particulate displacement. Temperature remains within standard suit range but fluctuates sharply in shaded rock formations. Explorers should remain aware that Brune\'s recorded history of pre-colony activity has not been fully accounted for.',
    author: 'Survey Division, Sector 9', date: 'Year 3, Cycle 60', category: 'observation',
  },
  {
    planet: 'Brune',
    title: 'Scree Field Traversal',
    content: 'The eastern scree slopes are actively shifting. Three explorers have sustained suit damage attempting to cross. Always route north or south around the field. VERA will suggest the direct path. Do not take it.',
    author: 'Cmdr. E. Solano', date: 'Year 4, Cycle 03', category: 'hazard',
  },
  {
    planet: 'Brune',
    title: 'Pre-Colony Transmission',
    content: 'A structure at bearing 312° from the northern ridge has been transmitting a continuous signal for at least 14 years based on signal degradation analysis. The signal is a record of visitors. If you go there, your arrival will be logged.',
    author: 'Signal Analysis, Base Station 3', date: 'Year 2, Cycle 80', category: 'observation',
  },
];

// ── Brune entry — only if explorer tinkered with the scanner
const BRUNE_TINKER_ENTRIES: SurvivalEntry[] = [
  {
    planet: 'Brune',
    title: 'Discovery of Company Property — Field Protocol',
    content: 'If an explorer discovers a crashed or abandoned vessel bearing company identification, the following applies:\n\n1. Do not touch, move, or access any company asset without explicit authorization.\n2. Log the discovery immediately via ship terminal.\n3. Do not remove any materials, data, or personal effects from the site.\n4. Note the bearing and distance from your current position.\n5. Vacate the area.\n\nThe company retains full ownership of all assets including decommissioned or lost equipment. Unauthorized interaction with company property is a terminable and prosecutable offense.\n\nNote: Personal effects left by prior explorers are also considered company property. See Asset Policy 7.1.',
    author: 'Corporate Legal & Asset Recovery, Sector 9', date: 'Year 2, Cycle 15', category: 'observation',
  },
  {
    planet: 'Brune',
    title: 'Trace Organic Compounds',
    content: 'Sub-surface organic compounds detected at 2.1m depth across multiple survey sites. Origin unknown. Composition does not match any catalogued biology. Samples proved uncollectable — equipment malfunction each attempt.',
    author: 'Survey Team 4', date: 'Year 3, Cycle 61', category: 'flora',
  },
];

const HNTDSurvivalGuide: React.FC = () => {
  const { hasVisited, followedCoordsDoubt, tinkeredScannerBrune, deathEntries } = useHNTDPlanets();

  const entries: SurvivalEntry[] = [
    ...BASE_ENTRIES,
    ...deathEntries,
    ...(hasVisited('planetone') ? DOUBT_GENERAL    : []),
    ...(followedCoordsDoubt     ? DOUBT_COORDS_ENTRIES : []),
    ...(hasVisited('planettwo') ? BRUNE_GENERAL    : []),
    ...(tinkeredScannerBrune    ? BRUNE_TINKER_ENTRIES : []),
  ];

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
                <div key={i} className={styles.logCard}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.2rem' }}>
                    <p className={styles.logCardTitle}>{e.title}</p>
                    <span style={{ fontFamily: 'Courier New', fontSize: '0.6rem', color: CATEGORY_COLOR[e.category], flexShrink: 0, marginLeft: '0.5rem' }}>
                      {CATEGORY_LABEL[e.category]}
                    </span>
                  </div>
                  <p className={styles.logCardSnippet} style={{ whiteSpace: 'pre-line' }}>{e.content}</p>
                  <p className={styles.logCardMeta}>{e.planet} · {e.author} · {e.date}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
      <ReturnToPortfolio />
    </div>
  );
};

export default HNTDSurvivalGuide;
