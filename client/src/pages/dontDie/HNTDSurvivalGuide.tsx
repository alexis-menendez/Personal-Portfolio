// File: client/src/pages/dontDie/HNTDSurvivalGuide.tsx

import React from 'react';
import HNTDNavigation from '../../components/dontDie/HNTDNavigation';
import ReturnToPortfolio from '../../components/innerOrbit/common/ReturnToPortfolio';
import styles from '../../assets/css/dontDie/HNTDConsole.module.css';
import { useHNTDPlanets } from '../../context/HNTDPlanetContext';

interface Entry {
  planet:   string;
  title:    string;
  content:  string;
  author:   string;
  date:     string;
  category: 'flora' | 'fauna' | 'hazard' | 'observation';
}

const BASE_ENTRIES: Entry[] = [
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

const PLANET_ENTRIES: Record<string, Entry[]> = {
  planetone: [
    {
      planet: 'Doubt',
      title: 'Crystalline Spire Formations',
      content: 'The basalt spires near the equatorial basin have razor-edged surfaces despite appearing smooth on long-range scan. Do not brush against them. Suit material shears on contact. Mark paths before entering narrow passages.',
      author: 'Cmdr. R. Vasquez', date: 'Year 4, Cycle 12', category: 'hazard',
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
  ],
  planettwo: [
    {
      planet: 'Brune',
      title: 'Scree Field Traversal',
      content: 'The eastern scree slopes are actively shifting. Three explorers have sustained suit damage attempting to cross. Always route north or south around the field. VERA will suggest the direct path. Do not take it.',
      author: 'Cmdr. E. Solano', date: 'Year 4, Cycle 03', category: 'hazard',
    },
    {
      planet: 'Brune',
      title: 'Trace Organic Compounds',
      content: 'Sub-surface organic compounds detected at 2.1m depth across multiple survey sites. Origin unknown. Composition does not match any catalogued biology. Samples proved uncollectable — equipment malfunction each attempt.',
      author: 'Survey Team 4', date: 'Year 3, Cycle 61', category: 'flora',
    },
    {
      planet: 'Brune',
      title: 'Pre-Colony Transmission',
      content: 'A structure at bearing 312° from the northern ridge has been transmitting a continuous signal for at least 14 years based on signal degradation analysis. The signal is a record of visitors. If you go there, your arrival will be logged.',
      author: 'Signal Analysis, Base Station 3', date: 'Year 2, Cycle 80', category: 'observation',
    },
  ],
};

const CATEGORY_COLOR: Record<Entry['category'], string> = {
  flora:       '#00ffe1',
  fauna:       '#00ffe1',
  hazard:      '#ff4d4d',
  observation: '#ffdd00',
};

const CATEGORY_LABEL: Record<Entry['category'], string> = {
  flora: 'FLORA', fauna: 'FAUNA', hazard: 'HAZARD', observation: 'OBSERVATION',
};

const HNTDSurvivalGuide: React.FC = () => {
  const { hasVisited } = useHNTDPlanets();

  const entries: Entry[] = [
    ...BASE_ENTRIES,
    ...(hasVisited('planetone') ? PLANET_ENTRIES['planetone'] : []),
    ...(hasVisited('planettwo') ? PLANET_ENTRIES['planettwo'] : []),
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

            <p className={styles.dimText} style={{ marginBottom: '0.5rem', fontSize: '0.7rem' }}>
              Field reports compiled from explorer missions. New entries unlock as you explore.
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
                  <p className={styles.logCardSnippet}>{e.content}</p>
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
