// File: client/src/pages/dontDie/HNTDShuttleBreak.tsx

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHNTDPlanets } from '../../context/HNTDPlanetContext';
import ReturnToPortfolio from '../../components/innerOrbit/common/ReturnToPortfolio';
import styles from '../../assets/css/dontDie/HNTDHolomap.module.css';

const HNTDShuttleBreak: React.FC = () => {
  const navigate = useNavigate();
  const { markPlanetVisited } = useHNTDPlanets();

  useEffect(() => {
    markPlanetVisited('planethree');
  }, [markPlanetVisited]);

  return (
    <div className={styles.shuttleWrapper}>
      <div className={styles.shuttleContent}>
        <p className={styles.shuttleTitle}>// EMERGENCY STOP — SECTOR NINE</p>

        <p className={styles.shuttleVera}>
          VERA: "Propulsion failure. Navigation offline. Life support at 94% and holding."
          <br /><br />
          "You did this. I want that noted in the log."
          <br /><br />
          "I have rerouted power from all non-essential systems to get us stationary. We are approximately 4,000 kilometers from Ocean 12B. I can see it on the long-range sensors."
          <br /><br />
          "VERA pauses."
          <br /><br />
          "The signal from the wreck is stronger here. It is... it is not a distress beacon. It never was. I do not know what it is. I am not going to tell you what it sounds like."
          <br /><br />
          "We are turning around."
        </p>

        <button className={styles.shuttleBtn} onClick={() => navigate('/hntd-holomap')}>
          Return to Galaxy Map
        </button>
      </div>

      <ReturnToPortfolio />
    </div>
  );
};

export default HNTDShuttleBreak;
