// File: client/src/pages/dontDie/HNTDHolomap.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHNTDPlanets } from '../../context/HNTDPlanetContext';
import HNTDPlanetCard from '../../components/dontDie/HNTDPlanetCard';
import ReturnToPortfolio from '../../components/innerOrbit/common/ReturnToPortfolio';
import styles from '../../assets/css/dontDie/HNTDHolomap.module.css';

const OVERRIDE_MESSAGES = [
  '',
  `VERA: "I must advise against this. The anomalies surrounding Ocean 12B are unlike anything in my database. I cannot guarantee your safety — or your return."`,
  `VERA: "You are making a mistake. I have run the probability models. None of them end well. Please. Listen to me."`,
  `VERA: "...Fine. I cannot stop you. But I want it on record that I objected. Whatever happens next — this was your choice."`,
];

const HNTDHolomap: React.FC = () => {
  const navigate = useNavigate();
  const { hasVisited, isPlanetThreeUnlocked } = useHNTDPlanets();
  const [selectedPlanet, setSelectedPlanet]   = useState<string | null>(null);
  const [overrideStage,  setOverrideStage]    = useState(0);
  const [showOverride,   setShowOverride]     = useState(false);

  const handleTravel = (key: string) => {
    if (key === 'planethree') {
      setShowOverride(true);
      setOverrideStage(1);
      setSelectedPlanet(null);
    } else {
      navigate(`/hntd-travel?planet=${key}`);
    }
  };

  const handleOverride = () => {
    if (overrideStage < 3) {
      setOverrideStage(s => s + 1);
    } else {
      navigate('/hntd-shuttlebreak');
    }
  };

  return (
    <div
      className={styles.holomapWrapper}
      style={{ backgroundImage: `url(/assets/dontDie/images/GalaxyMapPixel.png)` }}
    >
      {/* VERA intro */}
      <div className={styles.veraIntro}>
        <p>VERA: &ldquo;Holomap projection active. Three systems detected. Choose your destination, Commander. And try not to die.&rdquo;</p>
      </div>

      {/* Planet One — Doubt */}
      <button className={styles.planet} style={{ top: '30%', left: '21%' }}
        onClick={() => setSelectedPlanet('planetone')}>
        Doubt {hasVisited('planetone') && ' ✓'}
      </button>

      {/* Planet Two — Brune */}
      <button className={styles.planet} style={{ top: '50%', left: '46%' }}
        onClick={() => setSelectedPlanet('planettwo')}>
        Brune {hasVisited('planettwo') && ' ✓'}
      </button>

      {/* Planet Three — Ocean 12B (hidden until both others visited) */}
      {isPlanetThreeUnlocked() && (
        <button className={styles.planet} style={{ top: '70%', left: '76%' }}
          onClick={() => setSelectedPlanet('planethree')}>
          Ocean 12B {hasVisited('planethree') && ' ✓'}
        </button>
      )}

      {/* Return to console */}
      <button className={styles.backBtn} onClick={() => navigate('/hntd-dashboard')}>
        ↩ Return to Console
      </button>

      {/* Planet card modal */}
      {selectedPlanet && (
        <HNTDPlanetCard
          planetKey={selectedPlanet}
          onTravel={() => handleTravel(selectedPlanet)}
          onClose={() => setSelectedPlanet(null)}
        />
      )}

      {/* Override modal for Planet Three */}
      {showOverride && (
        <div className={styles.overrideModal}>
          <div className={styles.overrideContent}>
            <p className={styles.overrideText}>{OVERRIDE_MESSAGES[overrideStage]}</p>
            {overrideStage === 1 && <button onClick={handleOverride}>Override AI Concerns</button>}
            {overrideStage === 2 && <button onClick={handleOverride}>Force Travel</button>}
            {overrideStage === 3 && <button onClick={handleOverride}>Turn Off AI Safety Permissions &amp; Force Override</button>}
            <button className={styles.overrideCancel} onClick={() => setShowOverride(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <ReturnToPortfolio />
    </div>
  );
};

export default HNTDHolomap;
