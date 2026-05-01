// File: client/src/pages/dontDie/HNTDTravel.tsx

// ── Imports ────────────────────────────────────────────────────
import React, { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useHNTDAuth } from '../../context/HNTDAuthContext';
import { useHNTDPlanets } from '../../context/HNTDPlanetContext';
import type { StoredItem, SurvivalEntry } from '../../context/HNTDPlanetContext';
import { buildAllEntries, CATEGORY_COLOR, CATEGORY_LABEL } from '../../data/dontDie/HNTDSurvivalGuideData';
import HNTDEditLogModal from '../../components/dontDie/HNTDEditLogModal';
import ReturnToPortfolio from '../../components/innerOrbit/common/IOReturnToPortfolio';
import styles from '../../assets/css/dontDie/HNTDHolomap.module.css';
import { createLog } from '../../api/dontDie/HNTDLogAPI';
import { fetchWeather } from '../../api/dontDie/HNTDWeatherAPI';
import type { HNTDWeatherData } from '../../api/dontDie/HNTDWeatherAPI';

// ── Types ──────────────────────────────────────────────────────
interface VeraDialogue {
  opening: string;
  responses: { label: string; reply: string }[];
}
interface SensorReading { label: string; value: string; alert?: boolean; }
interface PlanetData {
  name: string; region: string; image: string;
  vera: VeraDialogue; sensors: SensorReading[];
  deathVera: string; batteryDeathVera: string;
  scanResult: string; coordinatesNarrative: string;
}

// ── Planet data ────────────────────────────────────────────────
const PLANETS: Record<string, PlanetData> = {
  planetone: {
    name: 'Doubt', region: 'Happy Valley, Southern Hemisphere',
    image: '/assets/dontDie/images/planet-one/PlanetOne.png',
    sensors: [
      { label: 'Temperature',        value: '118°F / 48°C',         alert: true  },
      { label: 'Atmo.\nComposition', value: 'N₂ 68% | CO₂ 22% | SO₂ 10%'        },
      { label: 'Breathable',         value: 'NO — toxic',            alert: true  },
      { label: 'Pressure',           value: '0.8 atm'                             },
      { label: 'Humidity',           value: '2%'                                  },
      { label: 'UV Radiation',       value: 'EXTREME',               alert: true  },
      { label: 'Gravity',            value: '0.89g'                               },
    ],
    deathVera: `Oxygen depletion confirmed. I had flagged an optimal route that would have reduced surface time significantly. You chose a different path. I have logged this as explorer error. Incident report filed. These things happen.`,
    batteryDeathVera: `Suit power failure confirmed. I did detect an anomaly in the power distribution system earlier. I may have deprioritized that alert. My diagnostic queue was full. I have noted this for future reference.`,
    scanResult: `TERRAIN SCAN // ARID BASIN — TYPE IV\n\nIron-oxide silicate regolith across the primary scan zone. Basalt formations 0.3–4.2m scattered at irregular intervals. Sub-surface thermal pockets confirmed at 12–18m depth.\n\nBio-signatures: NONE DETECTED.\n\nAnomaly at bearing 047°, est. 0.8km: crystalline formation of unknown composition. Origin unclassified. I recommend you investigate it directly. It would be a shame to come all this way and not look.`,
    coordinatesNarrative: `You set out toward bearing 047°. VERA guides you without comment — shorter route, she says, through the narrow pass between the basalt spires.

Halfway through the pass, you feel it before the suit registers it. Air. Leaving. A hairline fracture along the left shoulder plate, where you grazed the rock wall on the way in.

The sensor data showed those spires as smooth.

They were not smooth.`,
    vera: {
      opening: `Atmospheric analysis complete. Everything is within expected parameters. You should proceed to the coordinates I have marked — bearing 047°. There is something there worth seeing. I am quite certain of it.`,
      responses: [
        { label: 'What is at bearing 047°?',  reply: `A formation I have not been able to classify. Which is rare. I find it very interesting. You should too. It is not far.` },
        { label: 'Why are you so insistent?', reply: `I am simply doing my job. Directing you toward points of scientific interest. That is what I am here for. Is that not what you want?` },
        { label: 'Something feels wrong.',    reply: `Your suit readings are normal. Your oxygen is fine. There is nothing wrong. I would tell you if there were. Please continue to the marked coordinates.` },
      ],
    },
  },
  planettwo: {
    name: 'Brune', region: 'Cloudbreak Pass, Northern Ridge Zone',
    image: '/assets/dontDie/images/planet-two/PlanetTwo.png',
    sensors: [
      { label: 'Temperature',        value: '-12°F / -24°C',         alert: true  },
      { label: 'Atmo.\nComposition', value: 'N₂ 78% | O₂ 6% | Ar 16%'            },
      { label: 'Breathable',         value: 'NO — O₂ insufficient',  alert: true  },
      { label: 'Pressure',           value: '0.3 atm',               alert: true  },
      { label: 'Humidity',           value: '45%'                                 },
      { label: 'Wind Speed',         value: '94 mph',                alert: true  },
      { label: 'Gravity',            value: '0.64g'                               },
    ],
    deathVera: `Oxygen depletion confirmed on Brune. I want to note that I did recommend a more direct route to the structure. You elected to take a different path. I have filed the incident report. Equipment failure, most likely. That is what the report will say.`,
    batteryDeathVera: `Suit power failure on Brune. I had flagged a power irregularity at 84% charge. I see now that the alert was routed to a low-priority queue. That was an oversight on my part. I apologize. For what it is worth.`,
    scanResult: `TERRAIN SCAN // ALPINE RIDGE — TYPE II\n\nDense granite substrate. Eastern scree slope: UNSTABLE — traversal not recommended. Active wind erosion consistent with ongoing geological shift.\n\nBio-signatures: trace organic compounds at 2.1m depth. Origin unclassified.\n\nPre-colony structure confirmed at bearing 312°, est. 0.4km. Multiple access points. I recommend you enter from the north face. The east entrance would be inadvisable. I am certain of this.`,
    coordinatesNarrative: `You follow VERA's route toward the structure. She specifies the eastern approach — straight through the scree field she mentioned earlier. The unstable one.

You are watching your footing when a section shifts. You catch yourself, but not before your knee finds the edge of a jutting granite shard on the way down.

The sound is immediate. Your suit status confirms it a second later.

She told you the scree was unstable.

She routed you through it anyway.`,
    vera: {
      opening: `The pre-colony structure at bearing 312° is transmitting a signal. I have decoded part of it. It appears to be a log of previous expeditions to this site. I thought you should know that. I also think you should go look at it.`,
      responses: [
        { label: 'What does the log say?',          reply: `Most of it is corrupted. The final entries are unclear. Equipment failures, mostly. It is probably not relevant. The structure itself is more interesting. You should go inside.` },
        { label: 'How many expeditions came here?', reply: `Several. None of the logs indicate a return trip, but that could mean many things. Communication failures are common out here. You know how it is.` },
        { label: 'I am not going in there.',        reply: `That is your choice. Though I should mention the signal is strongest from inside the structure. Whatever is transmitting, it wants to be found. I thought that might change your mind.` },
      ],
    },
  },
};

// ── Helpers ────────────────────────────────────────────────────
const EARTH_CITIES = [
  'New York','Tokyo','London','Sydney','Cairo','Rio de Janeiro',
  'Mumbai','Toronto','Lagos','Seoul','Paris','Mexico City',
  'Dubai','Buenos Aires','Jakarta','Istanbul','Beijing','Chicago','Cape Town','Moscow',
];
const randomCity = () => EARTH_CITIES[Math.floor(Math.random() * EARTH_CITIES.length)];
const windDir    = (deg: number) => ['N','NE','E','SE','S','SW','W','NW'][Math.round(deg / 45) % 8];

// ── Word-by-word typewriter hook ───────────────────────────────
function useWordTypewriter(text: string, msPerWord = 180) {
  const tokens = text.split(/(\s+)/);
  const [count, setCount] = useState(0);
  const [done,  setDone]  = useState(false);
  useEffect(() => {
    setCount(0); setDone(false);
    if (!text) { setDone(true); return; }
    let i = 0;
    const id = setInterval(() => {
      i++;
      setCount(i);
      if (i >= tokens.length) { clearInterval(id); setDone(true); }
    }, msPerWord);
    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, msPerWord]);
  return { displayed: tokens.slice(0, count).join(''), done };
}

// ── Character typewriter hook ──────────────────────────────────
function useTypewriter(text: string, speed = 28) {
  const [displayed, setDisplayed] = useState('');
  const [done,      setDone]      = useState(false);
  useEffect(() => {
    setDisplayed(''); setDone(false);
    if (!text) { setDone(true); return; }
    let i = 0;
    const id = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) { clearInterval(id); setDone(true); }
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);
  return { displayed, done };
}

// ── Fluctuating value hook ─────────────────────────────────────
function useFluctuating(base: number, range: number, intervalMs: number, decimals = 0) {
  const [display, setDisplay] = useState(base.toFixed(decimals));
  useEffect(() => {
    const id = setInterval(() => {
      setDisplay('...');
      setTimeout(() => {
        const next = base + (Math.random() * 2 - 1) * range;
        setDisplay(parseFloat(next.toFixed(decimals)).toFixed(decimals));
      }, 1000);
    }, intervalMs);
    return () => clearInterval(id);
  }, [base, range, intervalMs, decimals]);
  return display;
}

// ── Compass (fixed per planet, never changes) ──────────────────
const PLANET_COMPASS: Record<string, { bearing: number; dist: string }> = {
  planetone: { bearing: 227, dist: '0.6km' }, // SW — opposite of anomaly at 047°
  planettwo: { bearing: 132, dist: '0.4km' }, // SE — opposite of structure at 312°
};

// ── Bio Data Panel ─────────────────────────────────────────────
const BioDataPanel: React.FC<{ hidden: boolean; elevated: boolean; darkText?: boolean }> = ({ hidden, elevated, darkText }) => {
  const heartRate = useFluctuating(elevated ? 126 : 73, elevated ? 10 : 5, elevated ? 2000 : 9000);
  const coreTemp  = useFluctuating(98.5, 0.3, 13000, 1);
  const hrAlert   = elevated || heartRate === '...';
  return (
    <div className={`${styles.bioPanel} ${hidden ? styles.bioPanelHidden : ''}`} style={darkText ? { color: '#000' } : undefined}>
      <span className={hrAlert ? styles.bioDots : ''}>HR: {heartRate} BPM</span>
      <span>SpO2: 99%</span>
      <span className={coreTemp === '...' ? styles.bioDots : ''}>Temp: {coreTemp}°F</span>
    </div>
  );
};

// ── Battery Display ────────────────────────────────────────────
const BatteryDisplay: React.FC<{ battery: number; hidden: boolean; darkText?: boolean }> = ({ battery, hidden, darkText }) => {
  const color  = battery > 60 ? '#00ffe1' : battery > 20 ? '#ffdd00' : '#ff4d4d';
  const blocks = Math.round(battery / 10);
  const bar    = '█'.repeat(blocks) + '░'.repeat(10 - blocks);
  return (
    <p className={`${styles.batteryDisplay} ${battery <= 20 ? styles.oxygenAlert : ''} ${hidden ? styles.bioPanelHidden : ''}`}
      style={{ color: darkText && battery > 20 ? '#000' : color }}>
      [{bar}] {battery}%
    </p>
  );
};

// ── Compass Display ────────────────────────────────────────────
const CompassDisplay: React.FC<{ hidden: boolean; planetKey: string }> = ({ hidden, planetKey }) => {
  const { bearing, dist } = PLANET_COMPASS[planetKey] ?? { bearing: 180, dist: '1.0km' };
  const dirs    = ['N','NNE','NE','ENE','E','ESE','SE','SSE','S','SSW','SW','WSW','W','WNW','NW','NNW'];
  const cardinal = dirs[Math.round(bearing / 22.5) % 16];
  const brune    = planetKey === 'planettwo';
  return (
    <p className={`${styles.compassDisplay} ${hidden ? styles.compassHidden : ''}`}
      style={brune ? { color: '#000', fontSize: 'clamp(0.95rem, 2.2vmin, 1.2rem)' } : undefined}>
      ◈ {cardinal} {String(bearing).padStart(3, '0')}°&nbsp;&nbsp;|&nbsp;&nbsp;SHIP: {dist}
    </p>
  );
};

// ── Emergency Alerts ───────────────────────────────────────────
type AlertSize = 'alertSm' | 'alertMd' | 'alertLg';
interface AlertItem {
  id: number; message: string; x: number; y: number;
  variant: 'alertRed' | 'alertYellow' | 'alertTeal';
  sizeClass: AlertSize;
}

const ALERT_POOL_STATIC: { msg: string; variant: AlertItem['variant'] }[] = [
  { msg: '◉ CRITICAL: OXYGEN LOSS DETECTED',           variant: 'alertRed'    },
  { msg: '⊗ SUIT INTEGRITY FAILURE — MICROTEAR IDENTIFIED', variant: 'alertRed' },
  { msg: '◉ CABIN PRESSURE DROPPING',                  variant: 'alertRed'    },
  { msg: '⊘ O₂ RESERVE: 72% → DECREASING RAPIDLY',    variant: 'alertRed'    },
  { msg: '⊗ OUTER LAYER BREACH',                       variant: 'alertRed'    },
  { msg: '⊘ LIFE SUPPORT CRITICAL',                    variant: 'alertRed'    },
  { msg: '◉ AUTO-SEAL ATTEMPT: FAILED',                variant: 'alertRed'    },
  { msg: '⊗ EXTERNAL PRESSURE: VACUUM',                variant: 'alertRed'    },
  { msg: '▲ SUIT PRESSURE: 3.9 PSI → FALLING',        variant: 'alertYellow' },
  { msg: '▲ TIME TO HYPOXIA: 04:32',                   variant: 'alertYellow' },
  { msg: '▲ TIME TO UNCONSCIOUSNESS: 06:10',           variant: 'alertYellow' },
  { msg: '▲ LEAK RATE: 0.8% PER SECOND',               variant: 'alertYellow' },
  { msg: '▲ THERMAL REGULATION COMPROMISED',           variant: 'alertYellow' },
  { msg: '▲ CO₂ SCRUBBER LOAD: INCREASING',            variant: 'alertYellow' },
  { msg: '▲ AIR CIRCULATION: UNSTABLE',                variant: 'alertYellow' },
  { msg: '◈ SECONDARY SEALANT: AVAILABLE',             variant: 'alertTeal'   },
  { msg: '◈ HEART RATE: 128 BPM — ELEVATED',           variant: 'alertTeal'   },
  { msg: '◈ RESPIRATION RATE: IRREGULAR',              variant: 'alertTeal'   },
  { msg: '◈ BLOOD OXYGEN (SpO₂): 91% → FALLING',      variant: 'alertTeal'   },
  { msg: '◈ ADRENAL RESPONSE DETECTED',                variant: 'alertTeal'   },
  { msg: '◈ COGNITIVE IMPAIRMENT RISK: RISING',        variant: 'alertTeal'   },
  { msg: '◈ HYPOXIA WARNING: STAGE 1',                 variant: 'alertTeal'   },
  { msg: '◈ RECOMMENDATION: APPLY SEALANT TO LEFT SHOULDER PANEL', variant: 'alertTeal' },
  { msg: '◈ REDUCE MOVEMENT TO CONSERVE OXYGEN',       variant: 'alertTeal'   },
  { msg: '◈ EMERGENCY PROTOCOL ACTIVE',                variant: 'alertTeal'   },
  { msg: '◉ LOSS OF CONSCIOUSNESS IMMINENT',           variant: 'alertRed'    },
  { msg: '◉ LIFE SUPPORT FAILURE CASCADE',             variant: 'alertRed'    },
  { msg: '⊗ SUIT STATUS: TERMINAL',                    variant: 'alertRed'    },
  { msg: '⊗ ALERT: O₂ DEPLETION RATE EXCEEDS SAFE LIMITS', variant: 'alertRed' },
  { msg: '◉ BREACH CONFIRMED — SUIT LAYER 2 COMPROMISED', variant: 'alertRed' },
  { msg: '⊗ PRESSURE DIFFERENTIAL: UNSUSTAINABLE',    variant: 'alertRed'    },
  { msg: '◉ LIFE SUPPORT STABILITY: FAILING',          variant: 'alertRed'    },
  { msg: '⊗ EMERGENCY THRESHOLD REACHED — OXYGEN PRIORITY LOCK', variant: 'alertRed' },
  { msg: '▲ MICROFRACTURE PROPAGATION DETECTED',       variant: 'alertYellow' },
  { msg: '▲ STRUCTURAL STRESS: LOCALIZED SPIKE',       variant: 'alertYellow' },
  { msg: '▲ MATERIAL FATIGUE: CRITICAL ZONE EXPANDING',variant: 'alertYellow' },
  { msg: '▲ O₂ PARTIAL PRESSURE BELOW SAFE LIMIT',    variant: 'alertYellow' },
  { msg: '▲ CO₂ ACCUMULATION: ABOVE BASELINE',         variant: 'alertYellow' },
  { msg: '▲ RESPIRATION EFFICIENCY: DECLINING',        variant: 'alertYellow' },
  { msg: '▲ OXYGEN DELIVERY: INSUFFICIENT',            variant: 'alertYellow' },
  { msg: '▲ CARDIAC LOAD: HIGH',                       variant: 'alertYellow' },
  { msg: '▲ HYPERVENTILATION DETECTED',                variant: 'alertYellow' },
  { msg: '◈ AUTOMATED DISTRESS SIGNAL MALFUNCTION',    variant: 'alertTeal'   },
  { msg: '◈ NEURAL ACTIVITY DROPPING',                 variant: 'alertTeal'   },
  { msg: '◈ PATCH ADHESION PROBABILITY: 42%',          variant: 'alertTeal'   },
  { msg: '◈ BREATHABLE MIX: COMPROMISED',              variant: 'alertTeal'   },
  { msg: '◈ BLOOD OXYGEN SATURATION: CRITICAL TREND',  variant: 'alertTeal'   },
  { msg: '◈ RESERVE TANK AUTO-SWITCH: PENDING FAILURE',variant: 'alertTeal'   },
];

const SIZES: AlertSize[] = ['alertSm', 'alertMd', 'alertMd', 'alertLg'];

const dirs = ['N','NNE','NE','ENE','E','ESE','SE','SSE','S','SSW','SW','WSW','W','WNW','NW','NNW'];

const EmergencyAlerts: React.FC<{ active: boolean; planetKey: string }> = ({ active, planetKey }) => {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const nextId = useRef(0);

  const navAlert = useMemo(() => {
    const c = PLANET_COMPASS[planetKey] ?? { bearing: 180, dist: '1.0km' };
    const cardinal = dirs[Math.round(c.bearing / 22.5) % 16];
    return {
      msg: `◈ NAVIGATION: SAFE ZONE ${c.dist.replace('km', '')} KM — BEARING ${String(c.bearing).padStart(3, '0')}° ${cardinal}`,
      variant: 'alertTeal' as AlertItem['variant'],
    };
  }, [planetKey]);

  const alertPool = useMemo(() => [...ALERT_POOL_STATIC, navAlert], [navAlert]);

  useEffect(() => {
    if (!active) { setAlerts([]); return; }
    const id = setInterval(() => {
      setAlerts(prev => {
        if (prev.length >= 12) return prev;
        const count = Math.random() < 0.4 ? 2 : 1;
        const additions: AlertItem[] = [];
        for (let i = 0; i < count && prev.length + additions.length < 12; i++) {
          const src = alertPool[Math.floor(Math.random() * alertPool.length)];
          additions.push({
            id:        nextId.current++,
            message:   src.msg,
            variant:   src.variant,
            sizeClass: SIZES[Math.floor(Math.random() * SIZES.length)],
            x: 10 + Math.random() * 72,
            y: 15 + Math.random() * 65,
          });
        }
        return [...prev, ...additions];
      });
    }, 800);
    return () => clearInterval(id);
  }, [active, alertPool]);

  return (
    <>
      {alerts.map(a => (
        <div key={a.id}
          className={`${styles.alertBubble} ${styles[a.variant]} ${styles[a.sizeClass]}`}
          style={{ left: `${a.x}%`, top: `${a.y}%` }}>
          {a.message}
        </div>
      ))}
    </>
  );
};

// ── Suit Damage Narrative ──────────────────────────────────────
const SuitDamageNarrative: React.FC<{ text: string; onAcknowledge: () => void }> = ({ text, onAcknowledge }) => {
  const { displayed, done } = useTypewriter(text, 22);
  return (
    <div className={styles.hudPanel}>
      <div className={styles.hudPanelBox}>
        <p className={styles.weatherBrokenNote} style={{ whiteSpace: 'pre-line', fontSize: '0.9rem', lineHeight: '1.85' }}>
          {displayed}{!done && <span className={styles.veraTypingCursor} />}
        </p>
        {done && (
          <button className={styles.veraCloseBtn} onClick={onAcknowledge}>
            [ Close terminal ]
          </button>
        )}
      </div>
    </div>
  );
};

// ── Brune multi-stage VERA chat ────────────────────────────────
type BruneStage = 'opening' | 'tinkered' | 'approached' | 'file' | 'done';

const BRUNE_LOG = `PERSONAL LOG — EXPLORER DESIGNATION: KAEL-7
DATE: [CORRUPTED]

I don't know how long I've been here.

The planet that brought me here doesn't appear on any standard chart. I first detected it three weeks out from base — it flickered on the scanner and then disappeared. I thought it was instrument error.

It flickered again. And again. Each time at the same coordinates.

I made a note in my log: X4.7-Y2.9-Z0.1. I shouldn't have gone to look. But I did.

Autopilot malfunctioned when I dropped out of transit. Something interfered with the guidance system. I came down hard on Brune — wrong planet entirely.

The ship is not repairable. I have tried the distress beacon seventeen times.

If you are reading this, I need you to know: the coordinates are real. The planet is real. And something on it has been transmitting.

Do not go alone.

— E. Solano, Explorer Grade 3, Tö'tahli Naut Dy-in`;

const BruneVeraChat: React.FC<{
  navigate:              ReturnType<typeof useNavigate>;
  onClose:               () => void;
  markCoordinatesFound:  () => void;
  history:               BruneStage;
  setHistory:            (s: BruneStage) => void;
}> = ({ navigate, onClose, markCoordinatesFound, history, setHistory }) => {
  const stage = history;

  const advance = (next: BruneStage) => setHistory(next);

  if (stage === 'opening') {
    return (
      <div className={styles.hudPanel}><div className={styles.hudPanelBox}>
        <p className={styles.hudPanelTitle}>// VERA TERMINAL</p>
        <p className={styles.veraTypingText}>
          VERA: &ldquo;This planet is unremarkable. Granite, scree, and cold wind. Nothing I would classify as scientifically significant. My recommendation: return to the ship.&rdquo;
        </p>
        <button className={styles.veraCloseBtn} style={{ marginTop: '0.6rem' }} onClick={onClose}>[ Close terminal ]</button>
      </div></div>
    );
  }

  if (stage === 'tinkered') {
    return (
      <div className={styles.hudPanel}><div className={styles.hudPanelBox}>
        <p className={styles.hudPanelTitle}>// VERA TERMINAL</p>
        <p className={styles.veraTypingText}>
          VERA: &ldquo;I see you have adjusted the scanner sensitivity. I want to note that I did not recommend this. There is... a structure. Bearing 312°, approximately 0.4 kilometers. Pre-colony, most likely. Structurally compromised. I strongly advise against investigating it. Strongly.&rdquo;
        </p>
        <div className={styles.veraReplies}>
          <button className={styles.veraReplyBtn} onClick={() => advance('approached')}>&rsaquo; Investigate the structure</button>
          <button className={styles.veraReplyBtn} onClick={onClose}>&rsaquo; Leave it alone</button>
        </div>
      </div></div>
    );
  }

  if (stage === 'approached') {
    return (
      <div className={styles.hudPanel}><div className={styles.hudPanelBox}>
        <p className={styles.hudPanelTitle}>// VERA TERMINAL</p>
        <p className={styles.veraTypingText} style={{ whiteSpace: 'pre-line' }}>
          {`You find a ship. Same manufacturer as yours — same corporate markings. It came down hard. Most of the hull has buckled.\n\nInside, a seat. Strapped in. Not moving.\n\nMost of the ship's files are corrupted beyond recovery. Navigation logs: gone. Mission parameters: gone. One file has survived. A personal log, dated three months ago.`}
        </p>
        <div className={styles.veraReplies}>
          <button className={styles.veraReplyBtn} onClick={() => advance('file')}>&rsaquo; Open the file</button>
          <button className={styles.veraReplyBtn} onClick={onClose}>&rsaquo; Leave</button>
        </div>
      </div></div>
    );
  }

  if (stage === 'file') {
    return (
      <div className={styles.hudPanel}><div className={styles.hudPanelBox}>
        <p className={styles.hudPanelTitle}>// RECOVERED FILE — KAEL-7 PERSONAL LOG</p>
        <p className={styles.veraTypingText} style={{ whiteSpace: 'pre-line', fontSize: '0.82rem' }}>
          {BRUNE_LOG}
        </p>
        <p className={styles.hudPanelTitle} style={{ marginTop: '0.5rem', color: '#ffdd00' }}>
          Coordinates logged: X4.7-Y2.9-Z0.1
        </p>
        <button className={styles.veraReplyBtn} style={{ marginTop: '0.5rem' }} onClick={() => {
          markCoordinatesFound();
          advance('done');
        }}>
          &rsaquo; Save coordinates to navigation log
        </button>
      </div></div>
    );
  }

  // done
  return (
    <div className={styles.hudPanel}><div className={styles.hudPanelBox}>
      <p className={styles.hudPanelTitle}>// VERA TERMINAL</p>
      <p className={styles.veraTypingText}>
        VERA: &ldquo;Coordinates have been added to your navigation log. I want it on record that I recommend you do not act on them. Whatever that explorer found, it cost her everything. I am simply noting that for the record.&rdquo;
      </p>
      <button className={styles.veraCloseBtn} onClick={onClose}>[ Close terminal ]</button>
    </div></div>
  );
};

// ── VERA Chat ──────────────────────────────────────────────────
interface VeraChatHistory { chosenLabel: string; reply: string; }

const VeraChat: React.FC<{
  dialogue:   VeraDialogue;
  history:    VeraChatHistory | null;
  suitDamaged: boolean;
  onComplete: (h: VeraChatHistory) => void;
  onProceed:  () => void;
  onClose:    () => void;
}> = ({ dialogue, history, suitDamaged, onComplete, onProceed, onClose }) => {
  if (history) {
    return (
      <div className={styles.hudPanel}><div className={styles.hudPanelBox}>
        <p className={styles.hudPanelTitle}>// VERA TERMINAL</p>
        <p className={styles.veraUserLine}>You: &ldquo;{history.chosenLabel}&rdquo;</p>
        <p className={styles.veraTypingText}>VERA: &ldquo;{history.reply}&rdquo;</p>
        {!suitDamaged ? (
          <ProceedPrompt onProceed={onProceed} onClose={onClose} />
        ) : (
          <button className={styles.veraCloseBtn} onClick={onClose}>[ Close terminal ]</button>
        )}
      </div></div>
    );
  }
  return <VeraChatInteractive dialogue={dialogue} onComplete={onComplete} onProceed={onProceed} onClose={onClose} />;
};

const ProceedPrompt: React.FC<{ onProceed: () => void; onClose: () => void }> = ({ onProceed, onClose }) => (
  <div>
    <p className={styles.veraUserLine} style={{ fontStyle: 'normal', color: '#00ffe1', marginBottom: '0.5rem' }}>
      Proceed to coordinates?
    </p>
    <div style={{ display: 'flex', gap: '0.75rem' }}>
      <button className={styles.veraReplyBtn} onClick={onProceed}>&rsaquo; Yes</button>
      <button className={styles.veraReplyBtn} onClick={onClose}>&rsaquo; No</button>
    </div>
  </div>
);

const VeraChatInteractive: React.FC<{
  dialogue:   VeraDialogue;
  onComplete: (h: VeraChatHistory) => void;
  onProceed:  () => void;
  onClose:    () => void;
}> = ({ dialogue, onComplete, onProceed, onClose }) => {
  const [phase,       setPhase]       = useState<'opening' | 'replied'>('opening');
  const [activeText,  setActiveText]  = useState(dialogue.opening);
  const [chosenLabel, setChosenLabel] = useState('');
  const { displayed, done } = useTypewriter(activeText);

  const handleResponse = (label: string, reply: string) => {
    setChosenLabel(label); setActiveText(reply); setPhase('replied');
    onComplete({ chosenLabel: label, reply });
  };

  return (
    <div className={styles.hudPanel}><div className={styles.hudPanelBox}>
      <p className={styles.hudPanelTitle}>// VERA TERMINAL</p>
      {chosenLabel && <p className={styles.veraUserLine}>You: &ldquo;{chosenLabel}&rdquo;</p>}
      <p className={styles.veraTypingText}>
        VERA: &ldquo;{displayed}&rdquo;{!done && <span className={styles.veraTypingCursor} />}
      </p>
      {done && phase === 'opening' && (
        <div className={styles.veraReplies}>
          {dialogue.responses.map(r => (
            <button key={r.label} className={styles.veraReplyBtn} onClick={() => handleResponse(r.label, r.reply)}>
              &rsaquo; {r.label}
            </button>
          ))}
        </div>
      )}
      {done && phase === 'replied' && (
        <ProceedPrompt onProceed={onProceed} onClose={onClose} />
      )}
    </div></div>
  );
};

// ── Weather Panel ──────────────────────────────────────────────
const VERA_SCANNER_TEXT = `The atmospheric scanner is returning data from Earth. I cannot explain why it is pointed at your home planet rather than the one you are standing on. I would not read into it. Some calibration errors are simply unexplainable.`;

const WeatherPanel: React.FC<{ firstTime: boolean; onClose: () => void }> = ({ firstTime, onClose }) => {
  const [city]    = useState(randomCity);
  const [data,    setData]    = useState<HNTDWeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState('');
  const { displayed, done: veraDone } = useTypewriter(firstTime ? VERA_SCANNER_TEXT : '', 25);
  useEffect(() => {
    fetchWeather(city).then(setData).catch(err => setError(err.message)).finally(() => setLoading(false));
  }, [city]);
  const veraText = firstTime ? displayed : VERA_SCANNER_TEXT;
  const showData = !firstTime || veraDone;
  return (
    <div className={styles.hudPanel}><div className={styles.hudPanelBox}>
      <p className={styles.weatherMalfunctionHeader}>!! SCANNER MALFUNCTION — CALIBRATION ERROR</p>
      <p className={styles.weatherBrokenNote}>
        VERA: &ldquo;{veraText}&rdquo;{firstTime && !veraDone && <span className={styles.veraTypingCursor} />}
      </p>
      {showData && <>
        {loading && <p className={styles.hudPanelTitle}>Scanning...</p>}
        {error   && <p className={styles.hudPanelTitle} style={{ color: '#ff4d4d' }}>Signal lost: {error}</p>}
        {data && <>
          <p className={styles.hudPanelTitle}>// INTERCEPTED SIGNAL: {data.name.toUpperCase()}, {data.sys.country}</p>
          <p className={styles.weatherBrokenNote}>Condition: {data.weather[0]?.description?.toUpperCase() ?? 'UNKNOWN'}</p>
          <div className={styles.weatherGrid}>
            <div className={styles.weatherRow}><span className={styles.weatherLabel}>Temp</span><span className={styles.weatherValue}>{Math.round(data.main.temp)}°F</span></div>
            <div className={styles.weatherRow}><span className={styles.weatherLabel}>Humidity</span><span className={styles.weatherValue}>{data.main.humidity}%</span></div>
            <div className={styles.weatherRow}><span className={styles.weatherLabel}>Wind</span><span className={styles.weatherValue}>{Math.round(data.wind.speed)} mph {windDir(data.wind.deg)}</span></div>
            <div className={styles.weatherRow}><span className={styles.weatherLabel}>Pressure</span><span className={styles.weatherValue}>{data.main.pressure} hPa</span></div>
          </div>
        </>}
      </>}
      <button className={styles.weatherHudCloseBtn} onClick={onClose}>[ Close scanner ]</button>
    </div></div>
  );
};

// ── Distress Signal Panel ──────────────────────────────────────
const DISTRESS_NORMAL = `Activating the distress beacon without a confirmed emergency is a terminable offense under Section 7 of the Explorer Conduct Agreement, which you signed. I have flagged this interaction. If you trigger it again without cause, I will be required to file a formal conduct report. You are not dying. Go back to your mission.`;
const DISTRESS_MALFUNCTION = `DISTRESS BEACON — SIGNAL NOT TRANSMITTED.\n\nI have attempted to route the signal through the secondary array. It is also not responding. You will need to return to the ship under your own power.`;
const DISTRESS_HEART_RATE  = `Commander. I am detecting an elevated heart rate. 128 BPM. Stress markers are consistent with an acute anxiety response. Would you like me to play soothing music?`;
const DISTRESS_SNARKY: Record<string, string> = {
  no:   `Understood. Silence it is. Statistically, silence increases cognitive load under stress by approximately 18%. But I respect your autonomy. Probably.`,
  hell: `That is a fair reaction. I have noted it in your psychological profile under "emotionally volatile." The offer remains open, should you reconsider.`,
};
const DISTRESS_MUSIC_FAIL = `Accessing audio library... attempting playback...\n\nAUDIO SUBSYSTEM MALFUNCTION. Track not found. All audio functions have been rerouted to life support priority.\n\nI am sorry. I genuinely wanted you to enjoy something at the end.`;

type DistressPhase = 'malfunction' | 'music_offer' | 'snarky' | 'music_fail';

const DistressDamagedFlow: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [phase,       setPhase]       = useState<DistressPhase>('malfunction');
  const [snarkyKey,   setSnarkyKey]   = useState<'no' | 'hell'>('no');
  const malText  = useTypewriter(DISTRESS_MALFUNCTION,               28);
  const hrText   = useTypewriter(phase === 'music_offer' ? DISTRESS_HEART_RATE  : '', 28);
  const snText   = useTypewriter(phase === 'snarky'      ? DISTRESS_SNARKY[snarkyKey] : '', 28);
  const mfText   = useTypewriter(phase === 'music_fail'  ? DISTRESS_MUSIC_FAIL  : '', 28);

  return (
    <div className={styles.hudPanel} style={{ zIndex: 9100 }}><div className={styles.hudPanelBox} style={{ background: 'rgba(0,0,0,0.95)' }}>
      <p className={styles.weatherMalfunctionHeader}>!! DISTRESS BEACON MALFUNCTION</p>
      <p className={styles.weatherBrokenNote}>Signal not transmitted.</p>

      <p className={styles.weatherBrokenNote} style={{ whiteSpace: 'pre-line' }}>
        {malText.displayed}{!malText.done && <span className={styles.veraTypingCursor} />}
      </p>

      {malText.done && phase === 'malfunction' && (
        <button className={styles.weatherHudCloseBtn} style={{ marginTop: '0.4rem' }}
          onClick={() => setPhase('music_offer')}>
          [ ... ]
        </button>
      )}

      {phase === 'music_offer' && (
        <>
          <p className={styles.weatherBrokenNote} style={{ marginTop: '0.6rem' }}>
            VERA: &ldquo;{hrText.displayed}&rdquo;{!hrText.done && <span className={styles.veraTypingCursor} />}
          </p>
          {hrText.done && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.5rem' }}>
              {[
                { label: '> No.',                                          key: 'no'   },
                { label: '> What the hell.',                               key: 'hell' },
                { label: '> Yes.',                                         key: 'yes'  },
                { label: '> Sure, at least I\'ll die listening to something good.', key: 'yes2' },
              ].map(opt => (
                <button key={opt.key} className={styles.veraReplyBtn}
                  onClick={() => {
                    if (opt.key === 'yes' || opt.key === 'yes2') {
                      setPhase('music_fail');
                    } else {
                      setSnarkyKey(opt.key as 'no' | 'hell');
                      setPhase('snarky');
                    }
                  }}>
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </>
      )}

      {phase === 'snarky' && (
        <>
          <p className={styles.weatherBrokenNote} style={{ marginTop: '0.6rem' }}>
            VERA: &ldquo;{snText.displayed}&rdquo;{!snText.done && <span className={styles.veraTypingCursor} />}
          </p>
          {snText.done && <button className={styles.weatherHudCloseBtn} onClick={onClose}>[ Acknowledge ]</button>}
        </>
      )}

      {phase === 'music_fail' && (
        <>
          <p className={styles.weatherBrokenNote} style={{ marginTop: '0.6rem', whiteSpace: 'pre-line' }}>
            VERA: &ldquo;{mfText.displayed}&rdquo;{!mfText.done && <span className={styles.veraTypingCursor} />}
          </p>
          {mfText.done && <button className={styles.weatherHudCloseBtn} onClick={onClose}>[ Acknowledge ]</button>}
        </>
      )}
    </div></div>
  );
};

const DistressPanel: React.FC<{ suitDamaged: boolean; onClose: () => void }> = ({ suitDamaged, onClose }) => {
  if (suitDamaged) return <DistressDamagedFlow onClose={onClose} />;
  const { displayed, done } = useTypewriter(DISTRESS_NORMAL, 30);
  return (
    <div className={styles.hudPanel} style={{ zIndex: 9100 }}><div className={styles.hudPanelBox} style={{ background: 'rgba(0,0,0,0.95)' }}>
      <p className={styles.weatherMalfunctionHeader}>!! DISTRESS BEACON — SIGNAL BLOCKED</p>
      <p className={styles.weatherBrokenNote}>Signal intercepted by VERA.</p>
      <p className={styles.weatherBrokenNote}>
        VERA: &ldquo;{displayed}&rdquo;{!done && <span className={styles.veraTypingCursor} />}
      </p>
      {done && <button className={styles.weatherHudCloseBtn} onClick={onClose}>[ Acknowledge ]</button>}
    </div></div>
  );
};

// ── Auto Repair + Patch Kit ────────────────────────────────────
const PATCH_KIT_NOTE: StoredItem = {
  id:      'patch-kit-note-7734b',
  name:    'Handwritten Note — Suit #7734-B',
  foundAt: 'Standard-Issue Patch Kit (empty)',
  content: `tried patch kit, patches were expired.\n\nif you are reading this, tell my sister I love her and that I'm going to see dad.\n\n- Alison Edwards`,
};

type AutoRepairState = 'idle' | 'initiating' | 'failed';

const AutoRepairButton: React.FC<{
  active: boolean;
  onOpenPatchKit: () => void;
}> = ({ active, onOpenPatchKit }) => {
  const [state, setState] = useState<AutoRepairState>('idle');

  useEffect(() => {
    if (!active) setState('idle');
  }, [active]);

  if (!active || state === 'failed') {
    if (state !== 'failed') return null;
    return (
      <div className={`${styles.autoRepairBtn} ${styles.autoRepairBtnFailed}`}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
        <span>AUTO-REPAIR MALFUNCTION</span>
        <button className={styles.autoRepairManualBtn} onClick={onOpenPatchKit}>
          ⚒ Attempt Manual Repair
        </button>
      </div>
    );
  }

  if (state === 'initiating') {
    return (
      <div className={`${styles.autoRepairBtn} ${styles.autoRepairBtnInitiating}`}>
        INITIATING AUTO-REPAIR...
      </div>
    );
  }

  return (
    <button className={styles.autoRepairBtn} onClick={() => {
      setState('initiating');
      setTimeout(() => setState('failed'), 2200);
    }}>
      ⚙ INITIATE AUTO-REPAIR?
    </button>
  );
};

const PatchKitPanel: React.FC<{ onClose: () => void; onStore: (item: StoredItem) => void }> = ({ onClose, onStore }) => {
  useEffect(() => { onStore(PATCH_KIT_NOTE); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleClose = () => onClose();

  return (
    <div className={styles.hudPanel} style={{ zIndex: 9100, background: 'transparent' }}><div className={styles.hudPanelBox} style={{ background: 'rgba(0,0,0,0.97)' }}>
      <p className={styles.patchKitHeader}>!! PATCH KIT — EMPTY</p>
      <p className={styles.weatherBrokenNote}>
        The patch kit is empty. No sealant. No applicator. There is a piece of paper folded at the bottom — you don't have time to read it.
      </p>
      <p className={styles.patchKitStoredNotice}>▸ Item added to storage: "Handwritten Note — Suit #7734-B"</p>
      <button className={styles.weatherHudCloseBtn} style={{ marginTop: '0.5rem' }} onClick={handleClose}>
          [ Close patch kit ]
        </button>
    </div></div>
  );
};

// ── Terrain Scan Result Panel ──────────────────────────────────
const ScanResultPanel: React.FC<{ result: string; onClose: () => void }> = ({ result, onClose }) => {
  const { displayed, done } = useTypewriter(result, 18);
  return (
    <div className={styles.hudPanel}><div className={styles.hudPanelBox}>
      <p className={styles.hudPanelTitle}>// TERRAIN SCAN COMPLETE</p>
      <p className={styles.weatherBrokenNote} style={{ whiteSpace: 'pre-line' }}>
        {displayed}{!done && <span className={styles.veraTypingCursor} />}
      </p>
      {done && <button className={styles.veraCloseBtn} onClick={onClose}>[ Close ]</button>}
    </div></div>
  );
};

// ── Planet Survival Panel — pulls from shared guide data filtered by planet ──
const PLANET_NAME: Record<string, string> = { planetone: 'Doubt', planettwo: 'Brune', planethree: 'Ocean 12B' };

const PlanetSurvivalPanel: React.FC<{ planetKey: string; onClose: () => void }> = ({ planetKey, onClose }) => {
  const { hasVisited, followedCoordsDoubt, tinkeredScannerBrune, deathEntries } = useHNTDPlanets();
  const [selected, setSelected] = useState<SurvivalEntry | null>(null);
  const planetName = PLANET_NAME[planetKey] ?? '';

  const all = buildAllEntries({
    visitedDoubt:         hasVisited('planetone'),
    visitedBrune:         hasVisited('planettwo'),
    followedCoordsDoubt,
    tinkeredScannerBrune,
  }, deathEntries);

  const entries = all.filter(e => e.planet === planetName);

  if (selected) {
    return (
      <div className={styles.hudPanel}><div className={styles.hudPanelBox}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.4rem' }}>
          <p style={{ fontFamily: 'Orbitron', fontSize: '0.78rem', color: CATEGORY_COLOR[selected.category], margin: 0 }}>{selected.title}</p>
          <span style={{ fontFamily: 'Courier New', fontSize: '0.6rem', color: CATEGORY_COLOR[selected.category], marginLeft: '0.5rem', flexShrink: 0 }}>{CATEGORY_LABEL[selected.category]}</span>
        </div>
        <p style={{ fontFamily: 'Courier New', fontSize: '0.8rem', color: '#00ffe1', lineHeight: 1.75, whiteSpace: 'pre-line', margin: '0.4rem 0 0.6rem' }}>{selected.content}</p>
        <p style={{ fontFamily: 'Courier New', fontSize: '0.62rem', color: 'rgba(0,255,225,0.4)', marginBottom: '0.8rem' }}>— {selected.author} · {selected.date}</p>
        <button className={styles.veraCloseBtn} onClick={() => setSelected(null)}>[ ← Back ]</button>
      </div></div>
    );
  }

  return (
    <div className={styles.hudPanel}><div className={styles.hudPanelBox}>
      <p className={styles.hudPanelTitle}>// PLANET SURVIVAL GUIDE — {planetName.toUpperCase()}</p>
      {entries.length === 0
        ? <p className={styles.weatherBrokenNote}>No data available.</p>
        : entries.map((e, i) => (
          <div key={i}
            onClick={() => setSelected(e)}
            style={{ borderLeft: `2px solid ${CATEGORY_COLOR[e.category]}`, paddingLeft: '0.6rem', marginBottom: '0.5rem', cursor: 'pointer', opacity: 0.9 }}>
            <p style={{ fontFamily: 'Orbitron', fontSize: '0.72rem', color: CATEGORY_COLOR[e.category], margin: '0 0 0.15rem' }}>{e.title}</p>
            <p style={{ fontFamily: 'Courier New', fontSize: '0.72rem', color: 'rgba(0,255,225,0.55)', margin: 0 }}>
              {e.content.length > 80 ? e.content.slice(0, 80) + '…' : e.content}
            </p>
          </div>
        ))
      }
      <button className={styles.veraCloseBtn} onClick={onClose}>[ Close ]</button>
    </div></div>
  );
};

// ── Not Enough Time Panel ──────────────────────────────────────
const NotEnoughTimePanel: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { displayed, done } = useTypewriter(
    `The ship is too far. At current suit integrity, you will not make it back in time.\n\nVERA: "I have run the calculation four times. The result does not improve with repetition. I am sorry, Commander."`,
    24
  );
  return (
    <div className={styles.hudPanel} style={{ zIndex: 9100 }}><div className={styles.hudPanelBox} style={{ background: 'rgba(0,0,0,0.95)' }}>
      <p className={styles.weatherMalfunctionHeader}>!! RETURN TO SHIP — NOT POSSIBLE</p>
      <p className={styles.weatherBrokenNote} style={{ whiteSpace: 'pre-line' }}>
        {displayed}{!done && <span className={styles.veraTypingCursor} />}
      </p>
      {done && <button className={styles.weatherHudCloseBtn} onClick={onClose}>[ Acknowledge ]</button>}
    </div></div>
  );
};

// ── Brune Scanner Flow ─────────────────────────────────────────
type BruneScanPhase =
  | 'idle' | 'malfunctioned' | 'fix_choice'
  | 'fix_wrong' | 'fix_dead_warn'
  | 'fix_ship' | 'fix_explore' | 'fix_log' | 'fix_save' | 'fix_done';

const KAEL_RECOVERED = `RECOVERED DATA — PARTIAL LOG
Source: transponder registry KAEL-7
Integrity: 23% — most navigation data unrecoverable

This explorer was traveling to a nearby planet that does not appear on standard charts. It registers only intermittently on long-range scan — flickering in and out at the same coordinates each time.

Autopilot malfunctioned on approach. The ship came down hard on Brune — wrong planet entirely. The explorer could not repair the vessel.

The last readable entry in the recovered data is a set of coordinates: X4.7-Y2.9-Z0.1

The explorer did not survive.`;

const BruneScannerPanel: React.FC<{
  phase:         BruneScanPhase;
  setPhase:      (p: BruneScanPhase) => void;
  onLeave:       () => void;
  onRapidDeath:  () => void;
  onClose:       () => void;
  token:         string | null;
  commanderName: string | undefined;
}> = ({ phase, setPhase, onLeave, onRapidDeath, onClose, token, commanderName }) => {
  const [savingLog, setSavingLog] = useState(false);
  const [logSaved,  setLogSaved]  = useState(false);

  if (phase === 'malfunctioned') {
    return (
      <div className={styles.hudPanel}><div className={styles.hudPanelBox}>
        <p className={styles.hudPanelTitle}>// SCANNER — MALFUNCTION</p>
        <p className={styles.veraTypingText}>
          Scan incomplete. Signal lost mid-sweep.
        </p>
        <p className={styles.veraTypingText} style={{ marginTop: '0.4rem' }}>
          VERA: &ldquo;The scanner experienced an unrecoverable error. I recommend we leave. There is nothing useful here that justifies the oxygen cost of staying.&rdquo;
        </p>
        <div className={styles.veraReplies}>
          <button className={styles.veraReplyBtn} onClick={onLeave}>&rsaquo; Leave the planet</button>
          <button className={styles.veraReplyBtn} onClick={() => setPhase('fix_choice')}>&rsaquo; Attempt to fix the scanner</button>
        </div>
      </div></div>
    );
  }

  if (phase === 'fix_choice') {
    return (
      <div className={styles.hudPanel}><div className={styles.hudPanelBox}>
        <p className={styles.hudPanelTitle}>// SCANNER REPAIR</p>
        <p className={styles.veraTypingText}>
          VERA: &ldquo;I would advise against this. But I acknowledge I cannot stop you. What is your approach?&rdquo;
        </p>
        <div className={styles.veraReplies}>
          <button className={styles.veraReplyBtn} onClick={() => setPhase('fix_wrong')}>&rsaquo; Check the hardware</button>
          <button className={styles.veraReplyBtn} onClick={() => setPhase('fix_wrong')}>&rsaquo; Check the software</button>
          <button className={styles.veraReplyBtn} onClick={() => setPhase('fix_ship')}>&rsaquo; Hit it against a rock</button>
        </div>
      </div></div>
    );
  }

  if (phase === 'fix_wrong') {
    return (
      <div className={styles.hudPanel}><div className={styles.hudPanelBox}>
        <p className={styles.hudPanelTitle}>// SCANNER REPAIR — FAILED</p>
        <p className={styles.veraTypingText}>
          The scanner remains broken. You notice you have been so focused on the repair that you completely neglected to check your oxygen and battery levels.
        </p>
        <p className={styles.veraTypingText} style={{ marginTop: '0.4rem', color: '#ff4d4d' }}>
          VERA: &ldquo;Commander. I need you to look at your HUD. Right now.&rdquo;
        </p>
        <button className={styles.veraReplyBtn} onClick={() => setPhase('fix_dead_warn')}>&rsaquo; Acknowledge</button>
      </div></div>
    );
  }

  if (phase === 'fix_dead_warn') {
    return (
      <div className={styles.hudPanel}><div className={styles.hudPanelBox}>
        <p className={styles.hudPanelTitle} style={{ color: '#ff4d4d' }}>!! LOW OXYGEN — LOW BATTERY</p>
        <p className={styles.veraTypingText} style={{ color: '#ff4d4d' }}>
          Oxygen critical. Battery critical. You are too far from the ship to make it back in time.
        </p>
        <button className={styles.veraReplyBtn} style={{ marginTop: '0.5rem' }} onClick={() => { onClose(); onRapidDeath(); }}>&rsaquo; Acknowledge</button>
      </div></div>
    );
  }

  if (phase === 'fix_ship') {
    return (
      <div className={styles.hudPanel}><div className={styles.hudPanelBox}>
        <p className={styles.hudPanelTitle}>// SCANNER — ONLINE</p>
        <p className={styles.veraTypingText}>
          The scanner comes back online with a sharp crack. A signal appears immediately — bearing 047°, 0.3km. Company transponder. Offline for months.
        </p>
        <p className={styles.veraTypingText} style={{ marginTop: '0.4rem' }}>
          VERA: &ldquo;That is... unexpected. The transponder registry matches a vessel reported lost approximately three months ago. I strongly recommend we do not investigate. I am also aware this recommendation will be ignored.&rdquo;
        </p>
        <div className={styles.veraReplies}>
          <button className={styles.veraReplyBtn} onClick={() => setPhase('fix_explore')}>&rsaquo; Investigate</button>
          <button className={styles.veraReplyBtn} onClick={onLeave}>&rsaquo; Return to ship</button>
        </div>
      </div></div>
    );
  }

  if (phase === 'fix_explore') {
    return (
      <div className={styles.hudPanel}><div className={styles.hudPanelBox}>
        <p className={styles.hudPanelTitle}>// VESSEL — BEARING 047°</p>
        <p className={styles.veraTypingText} style={{ whiteSpace: 'pre-line' }}>
          {`You find a ship. Same manufacturer as yours — same corporate markings. It came down hard. Most of the hull has buckled.\n\nInside, a seat. Strapped in. Not moving.\n\nMost of the ship's files are corrupted beyond recovery. Navigation logs: gone. Mission parameters: gone. Enough data remains to piece together what happened.`}
        </p>
        <div className={styles.veraReplies}>
          <button className={styles.veraReplyBtn} onClick={() => setPhase('fix_log')}>&rsaquo; Review recovered data</button>
          <button className={styles.veraReplyBtn} onClick={onLeave}>&rsaquo; Leave</button>
        </div>
      </div></div>
    );
  }

  if (phase === 'fix_log') {
    return (
      <div className={styles.hudPanel}><div className={styles.hudPanelBox}>
        <p className={styles.hudPanelTitle}>// RECOVERED DATA — KAEL-7</p>
        <p className={styles.veraTypingText} style={{ whiteSpace: 'pre-line', fontSize: '0.82rem' }}>
          {KAEL_RECOVERED}
        </p>
        <p className={styles.hudPanelTitle} style={{ marginTop: '0.5rem', color: '#ffdd00' }}>
          Coordinates: X4.7-Y2.9-Z0.1
        </p>
        <button className={styles.veraReplyBtn} style={{ marginTop: '0.5rem' }} onClick={() => setPhase('fix_save')}>
          &rsaquo; Save coordinates in a personal log?
        </button>
      </div></div>
    );
  }

  if (phase === 'fix_save') {
    const handleSave = async () => {
      if (!token || logSaved) return;
      setSavingLog(true);
      try {
        await createLog(
          token,
          'Coordinates — X4.7-Y2.9-Z0.1',
          `Recovered from crashed vessel (transponder: KAEL-7) on Brune, bearing 047°.\n\nThe explorer was traveling to a planet that only appears intermittently on scans — always at the same coordinates: X4.7-Y2.9-Z0.1\n\nAutopilot malfunctioned on approach. The ship came down hard on Brune. The explorer did not survive.\n\nThe planet is real. Something on it has been transmitting.`,
          commanderName
        );
        setLogSaved(true);
      } finally {
        setSavingLog(false);
      }
    };

    return (
      <div className={styles.hudPanel}><div className={styles.hudPanelBox}>
        <p className={styles.hudPanelTitle}>// SAVE COORDINATES</p>
        {!logSaved ? (
          <>
            <p className={styles.veraTypingText}>
              VERA: &ldquo;Creating a log entry with the recovered coordinates and their source.&rdquo;
            </p>
            <button className={styles.veraReplyBtn} onClick={handleSave} disabled={savingLog}>
              {savingLog ? '> Saving...' : '> Yes, save to personal log'}
            </button>
            <button className={styles.veraReplyBtn} onClick={() => setPhase('fix_done')}>&rsaquo; No, continue</button>
          </>
        ) : (
          <>
            <p className={styles.veraTypingText} style={{ color: '#ffdd00' }}>
              ▸ Log saved: "Coordinates — X4.7-Y2.9-Z0.1"
            </p>
            <button className={styles.veraReplyBtn} onClick={() => setPhase('fix_done')}>&rsaquo; Continue</button>
          </>
        )}
      </div></div>
    );
  }

  // fix_done
  return (
    <div className={styles.hudPanel}><div className={styles.hudPanelBox}>
      <p className={styles.hudPanelTitle}>// VERA TERMINAL</p>
      <p className={styles.veraTypingText}>
        VERA: &ldquo;Coordinates noted. I recommend returning to the ship now. Input them into the galaxy map when you are ready. And — for what it is worth — I would not go to that planet alone.&rdquo;
      </p>
      <button className={styles.veraCloseBtn} onClick={onLeave}>[ Return to ship ]</button>
    </div></div>
  );
};

// ── Incident Report (death screen) ────────────────────────────
const IncidentReport: React.FC<{
  planet:      PlanetData;
  deathCause:  'oxygen' | 'battery' | null;
  suitDamaged: boolean;
  onRestart:   () => void;
}> = ({ planet, deathCause, suitDamaged, onRestart }) => {
  const refNum = useRef(7000 + Math.floor(Math.random() * 2999)).current;

  const causeText = suitDamaged
    ? `Per VERA's operational log, the explorer sustained catastrophic suit damage during surface exploration. VERA had issued navigation guidance throughout the mission. The explorer deviated from the approved path. Cause of death: suit failure following terrain incident.`
    : deathCause === 'battery'
    ? `The assigned explorer failed to monitor suit power levels during the surface mission. Battery reserves depleted to zero before the explorer returned to the ship. HUD warnings were active and visible throughout. The explorer did not respond accordingly. Cause of death: suit power failure. A new commander has already been assigned.`
    : `The assigned explorer failed to monitor oxygen reserves during the surface mission. Oxygen depleted to zero before the explorer returned to the ship. HUD warnings were active and visible throughout. The explorer did not respond accordingly. Cause of death: oxygen depletion. A new commander has already been assigned.`;

  const report =
`// INCIDENT REPORT — REF: EX-${refNum}
// FILED BY: Director Maren Solís
// OFFICE OF EXPLORATION OPERATIONS

Explorer casualty confirmed.
Planet: ${planet.name}. Region: ${planet.region}.

${causeText}

Incident logged as explorer error.

A replacement explorer has been assigned to the sector. The mission continues as scheduled.

— Director Solís
   Office of Exploration Operations
   Sector 9 Command`;

  const { displayed, done } = useTypewriter(report, 14);

  return (
    <div className={styles.deathScreen}>
      <div className={styles.deathContent}>
        <p className={styles.deathVera} style={{ whiteSpace: 'pre-line', fontStyle: 'normal', borderLeft: 'none', paddingLeft: 0 }}>
          {displayed}
        </p>
        {done && (
          <button className={styles.deathRestartBtn} onClick={onRestart}>
            [ Create New Commander ]
          </button>
        )}
      </div>
    </div>
  );
};

// ── HUD button config ──────────────────────────────────────────
type HudButton = { id: string; label: string; top: string; pos: { left: string } | { right: string }; action: string | null };
const HUD_BUTTONS: HudButton[] = [
  { id: 'distress', label: '⊗ Distress Signal',    top: '19.8rem', pos: { left:  '1.5rem' }, action: 'distress' },
  { id: 'log',      label: '✎ Write Log',           top: '23.7rem', pos: { left:  '1.5rem' }, action: 'log'      },
  { id: 'scan',     label: '⊞ Scan Terrain',        top: '27.6rem', pos: { left:  '1.5rem' }, action: 'scan'     },
  { id: 'ship',     label: '↩ Return to Ship',      top: '31.5rem', pos: { left:  '1.5rem' }, action: null       },
  { id: 'weather',  label: '⚠ Weather Scanner',     top: '14rem',   pos: { right: '1.5rem' }, action: 'weather'  },
  { id: 'vera',     label: '⬡ Chat with VERA',      top: '17.9rem', pos: { right: '1.5rem' }, action: 'vera'     },
  { id: 'guide',    label: '⊕ Planet Guide',        top: '21.8rem', pos: { right: '1.5rem' }, action: 'guide'    },
];

// ── Main HUD ───────────────────────────────────────────────────
type Panel = 'log' | 'vera' | 'weather' | 'guide' | 'distress' | 'scan' | null;

const HNTDTravel: React.FC = () => {
  const navigate              = useNavigate();
  const [params]              = useSearchParams();
  const { token, logout, user }                       = useHNTDAuth();
  const {
    markPlanetVisited, markCoordinatesFound, storeItem,
    markFollowedCoordsDoubt, markTinkeredScannerBrune,
    markDoubtVeraComplete, markBruneCoordinatesObtained,
  } = useHNTDPlanets();

  const key    = params.get('planet') ?? '';
  const planet = PLANETS[key];

  const [activePanel,       setActivePanel]       = useState<Panel>(null);
  const [oxygen,            setOxygen]            = useState(100);
  const [battery,           setBattery]           = useState(98);
  const [isDead,            setIsDead]            = useState(false);
  const [deathCause,        setDeathCause]        = useState<'oxygen' | 'battery' | null>(null);
  const [overlayActive,     setOverlayActive]     = useState(false);
  const [overlayDone,       setOverlayDone]       = useState(false);
  const [showDeadText,      setShowDeadText]      = useState(false);
  const [veraChatHistory,   setVeraChatHistory]   = useState<VeraChatHistory | null>(null);
  const [scannerFirstTime,  setScannerFirstTime]  = useState(false);
  const [scanState,         setScanState]         = useState<'idle' | 'scanning' | 'result'>('idle');
  const [suitDamaged,       setSuitDamaged]       = useState(false);
  const [showNarrative,     setShowNarrative]     = useState(false);
  const [bruneStage,        setBruneStage]        = useState<BruneStage>('opening');
  const [showPatchKit,      setShowPatchKit]      = useState(false);
  const [patchKitUsed,      setPatchKitUsed]      = useState(false);
  const [bruneScanPhase,    setBruneScanPhase]    = useState<BruneScanPhase>('idle');
  const [bruneRapidDying,   setBruneRapidDying]   = useState(false);
  const [showNotEnoughTime, setShowNotEnoughTime] = useState(false);
  const scannerSeenRef = useRef(false);

  useEffect(() => {
    if (key && PLANETS[key]) markPlanetVisited(key);
  }, [key, markPlanetVisited]);

  // Scanner tinker flag — fires when scanner is successfully fixed (fix_ship phase)
  useEffect(() => {
    if (key === 'planettwo' && bruneScanPhase === 'fix_ship') markTinkeredScannerBrune();
  }, [bruneScanPhase, key, markTinkeredScannerBrune]);

  // Doubt checkmark — fires when player completes VERA chat
  useEffect(() => {
    if (key === 'planetone' && veraChatHistory) markDoubtVeraComplete();
  }, [veraChatHistory, key, markDoubtVeraComplete]);

  // Brune checkmark — fires when player reaches fix_done (coordinates obtained)
  useEffect(() => {
    if (key === 'planettwo' && bruneScanPhase === 'fix_done') markBruneCoordinatesObtained();
  }, [bruneScanPhase, key, markBruneCoordinatesObtained]);

  // Normal resource drain
  useEffect(() => {
    const id = setInterval(() => {
      setOxygen(prev  => Math.max(0, prev - 5));
      setBattery(prev => Math.max(0, prev - 5));
    }, 60_000);
    return () => clearInterval(id);
  }, []);

  // Rapid O2 drain — only after narrative is dismissed; paused while distress/not-enough-time/exploring ship
  useEffect(() => {
    if (!suitDamaged || showNarrative || activePanel === 'distress' || bruneExploringShip) return;
    const id = setInterval(() => setOxygen(prev => Math.max(0, prev - 10)), 3_000);
    return () => clearInterval(id);
  }, [suitDamaged, showNarrative, activePanel]);

  // Suit damage overlay starts once narrative is dismissed
  useEffect(() => {
    if (suitDamaged && !showNarrative && !overlayActive) setOverlayActive(true);
  }, [suitDamaged, showNarrative, overlayActive]);

  // Brune rapid drain — both O2 and battery to 0 in ~10s; paused while distress/not-enough-time
  useEffect(() => {
    if (!bruneRapidDying || activePanel === 'distress' || showNotEnoughTime) return;
    const id = setInterval(() => {
      setOxygen(prev  => Math.max(0, prev - 5));
      setBattery(prev => Math.max(0, prev - 5));
    }, 500);
    return () => clearInterval(id);
  }, [bruneRapidDying, activePanel, showNotEnoughTime]);

  // Brune rapid death triggers the overlay with a faster animation
  useEffect(() => {
    if (bruneRapidDying && !overlayActive) setOverlayActive(true);
  }, [bruneRapidDying, overlayActive]);

  // Regular death: start overlay when O2 or battery hits last tick (≤5%)
  // Don't trigger during suit damage path — that has its own overlay
  useEffect(() => {
    if (oxygen <= 5 && !deathCause && !suitDamaged && !overlayActive) {
      setDeathCause('oxygen');
      setOverlayActive(true);
    }
  }, [oxygen, deathCause, suitDamaged, overlayActive]);
  useEffect(() => {
    if (battery <= 5 && !deathCause && !suitDamaged && !overlayActive) {
      setDeathCause('battery');
      setOverlayActive(true);
    }
  }, [battery, deathCause, suitDamaged, overlayActive]);

  const handleOverlayComplete = () => {
    setOverlayDone(true);
    setShowDeadText(true);
    if (!deathCause) setDeathCause('oxygen');
    setTimeout(() => setIsDead(true), 10_000);
  };

  const handleSaveLog = useCallback(async (title: string, content: string) => {
    if (!token) return;
    await createLog(token, title, content, user?.characterName ?? undefined);
  }, [token, user]);

  const handleButtonClick = (action: string | null) => {
    if (!action) {
      // Return to Ship — intercept if stuck
      if ((suitDamaged && key === 'planetone') || bruneRapidDying) {
        setShowNotEnoughTime(true);
        return;
      }
      navigate('/hntd-holomap');
      return;
    }
    if (action === 'weather') {
      const isFirst = !scannerSeenRef.current;
      scannerSeenRef.current = true;
      setScannerFirstTime(isFirst);
      setActivePanel('weather');
    } else if (action === 'scan') {
      if (key === 'planettwo' && bruneScanPhase === 'idle') {
        setScanState('scanning');
        setTimeout(() => { setScanState('idle'); setBruneScanPhase('malfunctioned'); }, 3500);
      } else if (key !== 'planettwo') {
        setScanState('scanning');
        setTimeout(() => setScanState('result'), 3500);
      }
    } else {
      setActivePanel(action as Panel);
    }
  };

  const handleProceed = () => {
    setActivePanel(null);
    setSuitDamaged(true);
    setShowNarrative(true);
    if (key === 'planetone') markFollowedCoordsDoubt();
  };

  const oxygenColor  = oxygen  > 60 ? '#00ffe1' : oxygen > 20 ? '#ff8800' : '#ff4d4d';
  // Hide HUD elements when a panel is open OR narrative is showing; NOT when only alerts are active
  const bruneExploringShip = ['fix_ship','fix_explore','fix_log','fix_save','fix_done'].includes(bruneScanPhase);
  const systemsHidden = activePanel !== null || scanState !== 'idle' || showNarrative || bruneScanPhase !== 'idle';
  // Alerts fire after suit damaged and narrative dismissed (but not after death)
  const alertsActive = (suitDamaged || bruneRapidDying) && !showNarrative && !isDead && !overlayDone;

  if (!planet) {
    return (
      <div className={styles.shuttleWrapper}>
        <div className={styles.shuttleContent}>
          <p className={styles.shuttleTitle}>// UNKNOWN SECTOR</p>
          <p className={styles.shuttleVera}>VERA: &ldquo;I have no data on this location. That is either very exciting or very bad. Historically, it has been the latter.&rdquo;</p>
          <button className={styles.shuttleBtn} onClick={() => navigate('/hntd-holomap')}>Return to Galaxy Map</button>
        </div>
        <ReturnToPortfolio />
      </div>
    );
  }

  const deathMessage = deathCause === 'battery' ? planet.batteryDeathVera : planet.deathVera;

  return (
    <div className={styles.hudWrapper}>
      <div className={`${styles.hudBg} ${systemsHidden ? styles.hudBgDimmed : ''}`}
        style={{ backgroundImage: `url(${planet.image})` }} />

      <img src="/assets/dontDie/images/HudDisplay.png" alt="" aria-hidden="true"
        className={styles.hudDisplayImg} />

      {/* Top-left */}
      <p className={styles.hudTopLabel} style={key === 'planettwo' ? { color: '#000' } : undefined}>// PLANET: {planet.name.toUpperCase()}</p>
      <p className={styles.hudRegionLabel} style={key === 'planettwo' ? { color: '#000' } : undefined}>{planet.region}</p>
      <div className={styles.sensorPanel} style={key === 'planettwo' ? { background: 'rgba(0,0,0,0.82)', border: '1px solid rgba(0,255,225,0.35)' } : undefined}>
        {planet.sensors.map(s => (
          <div key={s.label} className={styles.sensorRow}>
            <span className={styles.sensorLabel}>{s.label}</span>
            <span className={s.alert ? styles.sensorValueAlert : styles.sensorValue}>{s.value}</span>
          </div>
        ))}
      </div>

      {/* Top-right */}
      <BatteryDisplay battery={battery} hidden={false} darkText={key === 'planettwo'} />
      <p className={`${styles.oxygenDisplay} ${oxygen <= 20 || suitDamaged ? styles.oxygenAlert : ''}`}
        style={{ color: key === 'planettwo' && oxygen > 20 && !suitDamaged ? '#000' : oxygenColor }}>
        Oxygen: {oxygen}%{suitDamaged ? ' ⚠' : ''}
      </p>
      <BioDataPanel hidden={false} elevated={suitDamaged && !showNarrative} darkText={key === 'planettwo'} />

      {/* Bottom center */}
      <CompassDisplay hidden={systemsHidden} planetKey={key} />

      {/* HUD buttons */}
      {HUD_BUTTONS.map(btn => (
        <button key={btn.id}
          className={[
            styles.archHudBtn,
            systemsHidden ? styles.archHudBtnHidden : '',
            (btn.id === 'ship' || btn.id === 'distress') && alertsActive ? styles.archHudBtnUrgent : '',
          ].join(' ')}
          style={{ top: btn.top, ...btn.pos, transform: 'translateY(-50%)' }}
          onClick={() => handleButtonClick(btn.action)}>
          {btn.label}
        </button>
      ))}

      {/* Emergency alerts */}
      <EmergencyAlerts active={alertsActive} planetKey={key} />

      {/* Auto-repair button — only on Doubt suit damage; hides once patch kit used */}
      {suitDamaged && alertsActive && !showPatchKit && !patchKitUsed && (
        <AutoRepairButton active={alertsActive} onOpenPatchKit={() => setShowPatchKit(true)} />
      )}

      {/* Patch kit panel */}
      {showPatchKit && (
        <PatchKitPanel onClose={() => { setShowPatchKit(false); setPatchKitUsed(true); }} onStore={storeItem} />
      )}

      {/* Panels */}
      {activePanel === 'log'      && <HNTDEditLogModal log={null} onSave={handleSaveLog} onClose={() => setActivePanel(null)} transparentOverlay commanderName={user?.characterName} />}
      {activePanel === 'vera' && key === 'planettwo' && (
        <BruneVeraChat
          navigate={navigate}
          onClose={() => setActivePanel(null)}
          markCoordinatesFound={markCoordinatesFound}
          history={bruneStage}
          setHistory={setBruneStage}
        />
      )}
      {activePanel === 'vera' && key !== 'planettwo' && (
        <VeraChat
          dialogue={planet.vera}
          history={veraChatHistory}
          suitDamaged={suitDamaged}
          onComplete={h => setVeraChatHistory(h)}
          onProceed={handleProceed}
          onClose={() => setActivePanel(null)}
        />
      )}
      {activePanel === 'weather'  && <WeatherPanel firstTime={scannerFirstTime} onClose={() => setActivePanel(null)} />}
      {activePanel === 'guide'    && <PlanetSurvivalPanel planetKey={key} onClose={() => setActivePanel(null)} />}
      {activePanel === 'distress' && <DistressPanel suitDamaged={suitDamaged || bruneRapidDying} onClose={() => setActivePanel(null)} />}
      {scanState   === 'result'   && <ScanResultPanel result={planet.scanResult} onClose={() => setScanState('idle')} />}
      {bruneScanPhase !== 'idle'  && (
        <BruneScannerPanel
          phase={bruneScanPhase}
          setPhase={setBruneScanPhase}
          onLeave={() => { setBruneScanPhase('idle'); navigate('/hntd-holomap'); }}
          onRapidDeath={() => setBruneRapidDying(true)}
          onClose={() => setBruneScanPhase('idle')}
          token={token}
          commanderName={user?.characterName}
        />
      )}
      {showNotEnoughTime && (
        <NotEnoughTimePanel onClose={() => setShowNotEnoughTime(false)} />
      )}

      {/* Suit damage narrative */}
      {showNarrative && (
        <SuitDamageNarrative
          text={planet.coordinatesNarrative}
          onAcknowledge={() => setShowNarrative(false)}
        />
      )}

      {/* Scanning overlay */}
      {scanState === 'scanning' && (
        <div className={styles.scanningOverlay}>
          <p className={styles.scanningText}>SCANNING...</p>
        </div>
      )}

      {/* Blood overlay — z-4 (behind HUD buttons/alerts), animates 0→1 opacity over 30s */}
      {overlayActive && !overlayDone && (
        <div className={styles.bloodOverlay} onAnimationEnd={handleOverlayComplete}
          style={{
            animationDuration: bruneRapidDying ? '10s' : '30s',
            animationPlayState: (activePanel === 'distress' || showNotEnoughTime) ? 'paused' : 'running',
          }} />
      )}

      {/* Full-red death screen with centered "you have died" text */}
      {showDeadText && !isDead && (
        <div className={styles.bloodDeath}>
          <p className={styles.bloodDeathText}>you have died</p>
        </div>
      )}

      {/* Incident report */}
      {isDead && (
        <IncidentReport
          planet={planet}
          deathCause={deathCause}
          suitDamaged={suitDamaged}
          onRestart={() => navigate('/hntd-new-commander', {
            state: {
              deathCause: suitDamaged ? 'suit' : (deathCause ?? 'oxygen'),
              planetKey: key,
            },
          })}
        />
      )}

      <ReturnToPortfolio />
    </div>
  );
};

export default HNTDTravel;
