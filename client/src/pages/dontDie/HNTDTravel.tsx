// File: client/src/pages/dontDie/HNTDTravel.tsx

import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useHNTDPlanets } from '../../context/HNTDPlanetContext';
import ReturnToPortfolio from '../../components/innerOrbit/common/ReturnToPortfolio';
import styles from '../../assets/css/dontDie/HNTDHolomap.module.css';

interface PlanetData {
  name: string;
  image: string;
  veraArrival: string;
  log: string[];
}

const PLANET_DATA: Record<string, PlanetData> = {
  planetone: {
    name: 'Doubt',
    image: '/assets/dontDie/images/planet-one/PlanetOne.png',
    veraArrival: `VERA: "Atmospheric entry complete. Surface temperature: 118°F. Sand density: inadvisable. I recommend against removing your helmet. Or touching anything. Or staying."`,
    log: [
      `The winds here are relentless. They carry something with them — a low, constant hum that I cannot identify. Not mechanical. Not biological. VERA says she cannot source it either, which is the first time I have seen her unable to explain something.`,
      `I found the ruins of a previous camp. No bodies. No gear. Just a single journal, its pages bleached and half-erased by the sun. The only words still legible: "It was never real. Keep moving."`,
      `Six moons were visible at dusk. I didn't expect that. The colors they cast — violet, amber, silver — felt almost intentional, like the sky was trying to tell me something. VERA was quiet for almost three minutes. That's never happened before.`,
    ],
  },
  planettwo: {
    name: 'Brune',
    image: '/assets/dontDie/images/planet-two/PlanetTwo.png',
    veraArrival: `VERA: "Atmospheric toxicity at 38%. Well within the margin I would describe as 'probably fine.' Oxygen supplementation recommended. Also: do not lick anything."`,
    log: [
      `The peaks stretch upward past cloud cover. Standing at the base, you cannot see where they end — they simply disappear into grey. The locals (there were locals, once) had a word for it: Brunoveth. Roughly translated: 'The mountains that remember you.'`,
      `I climbed to the first ridge. The cloud layer sits below me now, a solid white sea stretching in every direction. Up here the air is thin but clean. VERA's sensors detected trace signals from a structure deeper in the range. Old. Possibly pre-colony.`,
      `I found the structure. A navigation tower — ancient, its transmitter long dead. Carved into the stone at its base in three different languages, all saying the same thing: "You are not the first. You will not be the last. The mountains remember everyone."`,
    ],
  },
};

const HNTDTravel: React.FC = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { markPlanetVisited } = useHNTDPlanets();

  const key    = params.get('planet') ?? '';
  const planet = PLANET_DATA[key];

  useEffect(() => {
    if (key && PLANET_DATA[key]) {
      markPlanetVisited(key);
    }
  }, [key, markPlanetVisited]);

  if (!planet) {
    return (
      <div className={styles.shuttleWrapper}>
        <div className={styles.shuttleContent}>
          <p className={styles.shuttleTitle}>// UNKNOWN SECTOR</p>
          <p className={styles.shuttleVera}>VERA: "I have no data on this location. That is either very exciting or very bad. Historically, it has been the latter."</p>
          <button className={styles.shuttleBtn} onClick={() => navigate('/hntd-holomap')}>Return to Galaxy Map</button>
        </div>
        <ReturnToPortfolio />
      </div>
    );
  }

  return (
    <div className={styles.travelWrapper}>
      <div className={styles.travelBg} style={{ backgroundImage: `url(${planet.image})` }} />

      <div className={styles.travelContent}>
        <p className={styles.travelPlanetName}>// SURFACE: {planet.name.toUpperCase()}</p>

        <p className={styles.travelVeraLine}>{planet.veraArrival}</p>

        {planet.log.map((entry, i) => (
          <p key={i} className={styles.travelLog}>
            <span style={{ color: 'rgba(0,255,200,0.4)', fontSize: '0.7rem' }}>
              [LOG ENTRY {i + 1}]
            </span>
            <br />
            {entry}
          </p>
        ))}

        <div className={styles.travelBtnRow}>
          <button className={styles.travelNavBtn} onClick={() => navigate('/hntd-holomap')}>
            ↩ Galaxy Map
          </button>
          <button className={styles.travelNavBtn} onClick={() => navigate('/hntd-dashboard')}>
            ↩ Return to Console
          </button>
        </div>
      </div>

      <ReturnToPortfolio />
    </div>
  );
};

export default HNTDTravel;
