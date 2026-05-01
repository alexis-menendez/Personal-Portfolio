// File: client/src/pages/dontDie/HNTDHolomap.tsx

// ── Imports ────────────────────────────────────────────────────
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHNTDPlanets } from '../../context/HNTDPlanetContext';
import HNTDPlanetCard from '../../components/dontDie/HNTDPlanetCard';
import ReturnToPortfolio from '../../components/innerOrbit/common/ReturnToPortfolio';
import styles from '../../assets/css/dontDie/HNTDHolomap.module.css';

// Coordinates the player finds in the dead explorer's log on Brune
const SECRET_COORDS = 'X4.7-Y2.9-Z0.1';

// ── VERA override dialogue — escalates each time the player ignores her ──
const OVERRIDE_MESSAGES = [
  '',
  `VERA: "I must advise against this. The anomalies surrounding Ocean 12B are unlike anything in my database. I cannot guarantee your safety — or your return."`,
  `VERA: "You are making a mistake. I have run the probability models. None of them end well. Please. Listen to me."`,
  `VERA: "...Fine. I cannot stop you. But I want it on record that I objected. Whatever happens next — this was your choice."`,
];

// ── Gate message — blocks Brune until Doubt is visited ────────
const BRUNE_GATED_MSG = `VERA: "Doubt is much closer, Commander. If we go to Brune now we will have to double back to visit Doubt. I recommend we check Doubt first."`;

// ── Animated sprite frames — each planet has 8 rotation frames ─
const PLANET_FRAMES: Record<string, string[]> = {
  planetone:   Array.from({ length: 8 }, (_, i) => `/assets/dontDie/images/planet-one/planet/PlanOneSpin${i + 1}.png`),
  planettwo:   Array.from({ length: 8 }, (_, i) => `/assets/dontDie/images/planet-two/planet/PlanTwoSpin${i + 1}.png`),
  planethree:  Array.from({ length: 8 }, (_, i) => `/assets/dontDie/images/planet-three/planet/PlanThreeSpin${i + 1}.png`),
};
const FRAME_MS = 600;

const PlanetSprite: React.FC<{ planetKey: string }> = ({ planetKey }) => {
  const frames = PLANET_FRAMES[planetKey] ?? [];
  const [frame, setFrame] = useState(0);
  useEffect(() => {
    if (!frames.length) return;
    const id = setInterval(() => setFrame(f => (f + 1) % frames.length), FRAME_MS);
    return () => clearInterval(id);
  }, [frames.length]);
  if (!frames.length) return null;
  return (
    <img
      src={frames[frame]}
      alt=""
      aria-hidden="true"
      className={styles.planetSprite}
    />
  );
};

// ── Component ──────────────────────────────────────────────────
const HNTDHolomap: React.FC = () => {
  const navigate = useNavigate();
  const { hasVisited, isPlanetThreeUnlocked, markCoordinatesFound, coordinatesFound, doubtVeraComplete, bruneCoordinatesObtained } = useHNTDPlanets();

  // ── Local state ────────────────────────────────────────────────
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);
  const [overrideStage,  setOverrideStage]  = useState(0);
  const [showOverride,   setShowOverride]   = useState(false);
  const [bruneGated,     setBruneGated]     = useState(false);
  const [coordInput,     setCoordInput]     = useState('');
  const [coordError,     setCoordError]     = useState('');
  const [coordSuccess,   setCoordSuccess]   = useState(false);

  // ── Planet click — gates Brune until Doubt is visited ─────────
  const handlePlanetClick = (key: string) => {
    // Gate Brune until Doubt is visited
    if (key === 'planettwo' && !hasVisited('planetone')) {
      setBruneGated(true);
      return;
    }
    setSelectedPlanet(key);
  };

  // ── Travel — Planet Three triggers the VERA override flow ─────
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

  // ── Coordinate entry — validates the secret coords from Brune to unlock Planet Three ──
  const handleCoordSubmit = () => {
    if (coordInput.trim().toUpperCase() === SECRET_COORDS.toUpperCase()) {
      markCoordinatesFound();
      setCoordSuccess(true);
      setCoordError('');
    } else {
      setCoordError('Coordinates not recognised. Check your logs.');
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
      <div className={styles.planetWrapper} style={{ top: '30%', left: '21%' }}>
        <PlanetSprite planetKey="planetone" />
        <button className={styles.planet} onClick={() => handlePlanetClick('planetone')}>
          Doubt{doubtVeraComplete && ' ✓'}
        </button>
      </div>

      {/* Planet Two — Brune */}
      <div className={styles.planetWrapper} style={{ top: '50%', left: '46%' }}>
        <PlanetSprite planetKey="planettwo" />
        <button className={styles.planet} onClick={() => handlePlanetClick('planettwo')}>
          Brune{bruneCoordinatesObtained && ' ✓'}
        </button>
      </div>

      {/* Planet Three — Ocean 12B (hidden until both visited AND coordinates entered) */}
      {isPlanetThreeUnlocked() && (
        <div className={styles.planetWrapper} style={{ top: '70%', left: '76%' }}>
          <PlanetSprite planetKey="planethree" />
          <button className={styles.planet} onClick={() => setSelectedPlanet('planethree')}>
            Ocean 12B{hasVisited('planethree') && ' ✓'}
          </button>
        </div>
      )}

      {/* Coordinate entry — shown after scanner fix (coordinates obtained) but before coords confirmed */}
      {bruneCoordinatesObtained && !coordinatesFound && (
        <div className={styles.coordEntry}>
          <p className={styles.coordLabel}>// ENTER COORDINATES</p>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <input
              className={styles.coordInput}
              placeholder="e.g. X4.7-Y2.9-Z0.1"
              value={coordInput}
              onChange={e => setCoordInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleCoordSubmit()}
            />
            <button className={styles.coordBtn} onClick={handleCoordSubmit}>[ Enter ]</button>
          </div>
          {coordError && <p className={styles.coordError}>{coordError}</p>}
        </div>
      )}

      {coordSuccess && !coordinatesFound && (
        <div className={styles.coordEntry}>
          <p className={styles.coordLabel} style={{ color: '#00ffe1' }}>// COORDINATES CONFIRMED — NEW SECTOR UNLOCKED</p>
        </div>
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

      {/* Brune gated modal */}
      {bruneGated && (
        <div className={styles.overrideModal}>
          <div className={styles.overrideContent}>
            <p className={styles.overrideText}>{BRUNE_GATED_MSG}</p>
            <button onClick={() => setBruneGated(false)}>Understood</button>
          </div>
        </div>
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
