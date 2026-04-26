// File: client/src/components/dontDie/HNTDPlanetCard.tsx

import React, { useState } from 'react';
import styles from '../../assets/css/dontDie/HNTDHolomap.module.css';

const PLANETS: Record<string, { name: string; image: string; vera: string; description: string }> = {
  planetone: {
    name: 'Doubt',
    image: '/assets/dontDie/images/planet-one/PlanetOne.png',
    vera: `VERA: "Doubt. Even the name is a warning. But you'll go anyway. You always do."`,
    description: `A harsh desert world scarred by ancient winds and unrelenting heat. Though its terrain is unforgiving and its atmosphere thick with static, travelers speak in hushed awe of its sunsets — where as many as six moons cast shifting colors across the dunes, painting the sky in violet fire.`,
  },
  planettwo: {
    name: 'Brune',
    image: '/assets/dontDie/images/planet-two/PlanetTwo.png',
    vera: `VERA: "Brune. Atmospheric toxicity is... manageable. Probably. I am 62% confident you will be fine."`,
    description: `A mountainous planet where jagged peaks pierce through dense cloud cover like ancient sentinels. Its thin atmosphere and shifting weather make traversal perilous — but the view from the summit, above the clouds, is said to stir something primal in the soul.`,
  },
  planethree: {
    name: 'Ocean 12B',
    image: '/assets/dontDie/images/planet-three/PlanetThree.png',
    vera: `VERA: "I... do not recommend this. I am registering something in the signal. Something that should not be there. Please. Do not go."`,
    description: `No data exists for Ocean 12B save its name. It was not listed in any star charts, and our scanners failed to detect it upon initial entry into the sector. When it finally registered, the results were baffling: an unbroken bioluminescent ocean with no landmass, no atmospheric anomalies, and no signs of civilization.

And yet — there is wreckage. A ship long thought lost drifts in the current, half-submerged and broken open like a shell. Its distress beacon still transmits, pulsing weakly through the static:

"We thought it was... beautiful. It called to us in the water. We... we answered. We came. They're still here."`,
  },
};

interface Props {
  planetKey: string;
  onTravel: () => void;
  onClose: () => void;
}

const HNTDPlanetCard: React.FC<Props> = ({ planetKey, onTravel, onClose }) => {
  const [showVideo, setShowVideo] = useState(false);
  const planet = PLANETS[planetKey];
  if (!planet) return null;

  return (
    <div className={styles.cardOverlay}>
      <div className={styles.card}>
        <button className={styles.closeBtn} onClick={onClose}>×</button>
        <h2 className={styles.cardTitle}>{planet.name}</h2>
        <p className={styles.veraLine}>{planet.vera}</p>
        <img src={planet.image} alt={planet.name} className={styles.planetImage} />
        {planet.description.split('\n\n').map((para, i) => (
          <p key={i} className={styles.cardText}>{para}</p>
        ))}

        {planetKey === 'planethree' && (
          <>
            <p className={styles.cardText}><em>A recording accompanied the distress beacon.</em></p>
            <button className={styles.travelBtn} onClick={() => setShowVideo(v => !v)}>
              {showVideo ? 'Hide Recording' : 'Play Recording'}
            </button>
            {showVideo && (
              <video
                className={styles.videoPlayer}
                src="/assets/dontDie/videos/distress-recording.mp4"
                controls
                autoPlay
              />
            )}
          </>
        )}

        <div className={styles.btnGroup}>
          <button className={styles.travelBtn} onClick={onTravel}>
            Travel to Planet
          </button>
        </div>
      </div>
    </div>
  );
};

export default HNTDPlanetCard;
