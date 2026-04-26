// File: client/src/pages/dontDie/HNTDTravel.tsx

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useHNTDAuth } from '../../context/HNTDAuthContext';
import { useHNTDPlanets } from '../../context/HNTDPlanetContext';
import HNTDEditLogModal from '../../components/dontDie/HNTDEditLogModal';
import ReturnToPortfolio from '../../components/innerOrbit/common/ReturnToPortfolio';
import styles from '../../assets/css/dontDie/HNTDHolomap.module.css';
import { createLog } from '../../api/dontDie/HNTDLogAPI';
import { fetchWeather } from '../../api/dontDie/HNTDWeatherAPI';
import type { HNTDWeatherData } from '../../api/dontDie/HNTDWeatherAPI';
import { fetchTips, createTip, voteTip, deleteTip } from '../../api/dontDie/HNTDSurvivalAPI';
import type { HNTDTip } from '../../api/dontDie/HNTDSurvivalAPI';

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

// ── Typewriter hook ────────────────────────────────────────────
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
const BioDataPanel: React.FC<{ hidden: boolean; elevated: boolean }> = ({ hidden, elevated }) => {
  const heartRate = useFluctuating(elevated ? 126 : 73, elevated ? 10 : 5, elevated ? 2000 : 9000);
  const coreTemp  = useFluctuating(98.5, 0.3, 13000, 1);
  const hrAlert   = elevated || heartRate === '...';
  return (
    <div className={`${styles.bioPanel} ${hidden ? styles.bioPanelHidden : ''}`}>
      <span className={hrAlert ? styles.bioDots : ''}>HR: {heartRate} BPM</span>
      <span>SpO2: 99%</span>
      <span className={coreTemp === '...' ? styles.bioDots : ''}>Temp: {coreTemp}°F</span>
    </div>
  );
};

// ── Battery Display ────────────────────────────────────────────
const BatteryDisplay: React.FC<{ battery: number; hidden: boolean }> = ({ battery, hidden }) => {
  const color  = battery > 60 ? '#00ffe1' : battery > 20 ? '#ffdd00' : '#ff4d4d';
  const blocks = Math.round(battery / 10);
  const bar    = '█'.repeat(blocks) + '░'.repeat(10 - blocks);
  return (
    <p className={`${styles.batteryDisplay} ${battery <= 20 ? styles.oxygenAlert : ''} ${hidden ? styles.bioPanelHidden : ''}`}
      style={{ color }}>
      [{bar}] {battery}%
    </p>
  );
};

// ── Compass Display ────────────────────────────────────────────
const CompassDisplay: React.FC<{ hidden: boolean; planetKey: string }> = ({ hidden, planetKey }) => {
  const { bearing, dist } = PLANET_COMPASS[planetKey] ?? { bearing: 180, dist: '1.0km' };
  const dirs    = ['N','NNE','NE','ENE','E','ESE','SE','SSE','S','SSW','SW','WSW','W','WNW','NW','NNW'];
  const cardinal = dirs[Math.round(bearing / 22.5) % 16];
  return (
    <p className={`${styles.compassDisplay} ${hidden ? styles.compassHidden : ''}`}>
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

const ALERT_POOL: { msg: string; variant: AlertItem['variant'] }[] = [
  { msg: '◉ OXYGEN LEAK DETECTED',       variant: 'alertRed'    },
  { msg: '⊗ SUIT SEAL COMPROMISED',      variant: 'alertRed'    },
  { msg: '◉ O2 RESERVE: CRITICAL',       variant: 'alertRed'    },
  { msg: '⊘ LIFE SUPPORT CRITICAL',      variant: 'alertRed'    },
  { msg: '⊗ OUTER LAYER BREACH',         variant: 'alertRed'    },
  { msg: '▲ PRESSURE DROPPING',          variant: 'alertYellow' },
  { msg: '▲ HULL INTEGRITY: 34%',        variant: 'alertYellow' },
  { msg: '◈ SUIT TEMP: RISING',          variant: 'alertYellow' },
  { msg: '⊘ ATMOSPHERIC EXPOSURE',       variant: 'alertTeal'   },
  { msg: '◈ EMERGENCY PROTOCOL ACTIVE',  variant: 'alertTeal'   },
];

const SIZES: AlertSize[] = ['alertSm', 'alertMd', 'alertMd', 'alertLg'];

const EmergencyAlerts: React.FC<{ active: boolean }> = ({ active }) => {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const nextId = useRef(0);

  useEffect(() => {
    if (!active) { setAlerts([]); return; }
    const id = setInterval(() => {
      setAlerts(prev => {
        if (prev.length >= 12) return prev; // cap — alerts stay once placed
        const src = ALERT_POOL[Math.floor(Math.random() * ALERT_POOL.length)];
        const item: AlertItem = {
          id:        nextId.current++,
          message:   src.msg,
          variant:   src.variant,
          sizeClass: SIZES[Math.floor(Math.random() * SIZES.length)],
          x: 10 + Math.random() * 72,
          y: 15 + Math.random() * 65,
        };
        return [...prev, item];
      });
    }, 2000);
    return () => clearInterval(id);
  }, [active]);

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
const DISTRESS_NORMAL  = `The distress beacon has encountered an error. I have run a full diagnostic and found no fault on my end. The issue appears to be hardware. I will continue attempting to restore the signal.`;
const DISTRESS_DAMAGED = `I am aware of the breach. The distress beacon is not responding. I have run a diagnostic. The fault does not originate from my systems. Returning to the ship is your only viable option at this time.`;

const DistressPanel: React.FC<{ suitDamaged: boolean; onClose: () => void }> = ({ suitDamaged, onClose }) => {
  const text = suitDamaged ? DISTRESS_DAMAGED : DISTRESS_NORMAL;
  const { displayed, done } = useTypewriter(text, 30);
  return (
    <div className={styles.hudPanel}><div className={styles.hudPanelBox}>
      <p className={styles.weatherMalfunctionHeader}>!! DISTRESS BEACON MALFUNCTION</p>
      <p className={styles.weatherBrokenNote}>Signal not transmitted.</p>
      <p className={styles.weatherBrokenNote}>
        VERA: &ldquo;{displayed}&rdquo;{!done && <span className={styles.veraTypingCursor} />}
      </p>
      {done && <button className={styles.weatherHudCloseBtn} onClick={onClose}>[ Acknowledge ]</button>}
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

// ── Planet Survival Panel ──────────────────────────────────────
const PlanetSurvivalPanel: React.FC<{ planetKey: string; onClose: () => void }> = ({ planetKey, onClose }) => {
  const { token, user } = useHNTDAuth();
  const [tips,      setTips]      = useState<HNTDTip[]>([]);
  const [votedIds,  setVotedIds]  = useState<Set<number>>(new Set());
  const [loading,   setLoading]   = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => { fetchTips(planetKey).then(setTips).finally(() => setLoading(false)); }, [planetKey]);
  const handleSaveTip = async (title: string, content: string) => {
    if (!token) return;
    const created = await createTip(token, title, content, planetKey);
    setTips(prev => [created, ...prev]);
  };
  const handleVote = async (id: number) => {
    if (!token) return;
    const { upvotes, voted } = await voteTip(token, id);
    setTips(prev => prev.map(t => t.id === id ? { ...t, upvotes } : t));
    setVotedIds(prev => { const n = new Set(prev); voted ? n.add(id) : n.delete(id); return n; });
  };
  const handleDelete = async (id: number) => {
    if (!token) return;
    await deleteTip(token, id);
    setTips(prev => prev.filter(t => t.id !== id));
  };
  const fmt = (iso: string) => new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  return (
    <div className={styles.hudPanel}><div className={styles.hudPanelBox}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p className={styles.hudPanelTitle}>// PLANET SURVIVAL GUIDE</p>
        <button style={{ background: 'none', border: 'none', color: 'rgba(0,255,225,0.5)', fontFamily: 'Courier New', fontSize: '0.75rem', cursor: 'pointer' }} onClick={() => setModalOpen(true)}>+ Add Tip</button>
      </div>
      {loading && <p className={styles.hudPanelTitle}>Loading field data...</p>}
      {!loading && tips.length === 0 && <p className={styles.weatherBrokenNote}>No survival tips for this planet yet. Be the first.</p>}
      {tips.map(tip => (
        <div key={tip.id} className={styles.tipCard}>
          <div className={styles.tipVote}>
            <button className={`${styles.tipVoteBtn} ${votedIds.has(tip.id) ? styles.tipVoteBtnActive : ''}`} onClick={() => handleVote(tip.id)}>▲</button>
            <span className={styles.tipVoteCount}>{tip.upvotes}</span>
          </div>
          <div className={styles.tipBody}>
            <p className={styles.tipTitle}>{tip.title}</p>
            <p className={styles.tipContent}>{tip.content}</p>
            <p className={styles.tipMeta}>{tip.username} · {fmt(tip.createdAt)}</p>
          </div>
          {user?.id === tip.userId && <button className={styles.tipDeleteBtn} onClick={() => handleDelete(tip.id)}>[x]</button>}
        </div>
      ))}
      <button className={styles.veraCloseBtn} onClick={onClose}>[ Close ]</button>
    </div>
    {modalOpen && <HNTDEditLogModal log={null} onSave={handleSaveTip} onClose={() => setModalOpen(false)} />}
    </div>
  );
};

// ── HUD button config ──────────────────────────────────────────
type HudButton = { id: string; label: string; top: string; pos: { left: string } | { right: string }; action: string | null };
const HUD_BUTTONS: HudButton[] = [
  { id: 'ship',     label: '↩ Return to Ship',   top: '19.8rem', pos: { left:  '1.5rem' }, action: null       },
  { id: 'log',      label: '✎ Write Log',          top: '23.7rem', pos: { left:  '1.5rem' }, action: 'log'      },
  { id: 'scan',     label: '⊞ Scan Terrain',       top: '27.6rem', pos: { left:  '1.5rem' }, action: 'scan'     },
  { id: 'distress', label: '⊗ Distress Signal',    top: '31.5rem', pos: { left:  '1.5rem' }, action: 'distress' },
  { id: 'weather',  label: '⚠ Weather Scanner',    top: '14rem',   pos: { right: '1.5rem' }, action: 'weather'  },
  { id: 'vera',     label: '⬡ Chat with VERA',     top: '17.9rem', pos: { right: '1.5rem' }, action: 'vera'     },
  { id: 'guide',    label: '⊕ Planet Guide',       top: '21.8rem', pos: { right: '1.5rem' }, action: 'guide'    },
];

// ── Main HUD ───────────────────────────────────────────────────
type Panel = 'log' | 'vera' | 'weather' | 'guide' | 'distress' | 'scan' | null;

const HNTDTravel: React.FC = () => {
  const navigate              = useNavigate();
  const [params]              = useSearchParams();
  const { token, logout }     = useHNTDAuth();
  const { markPlanetVisited } = useHNTDPlanets();

  const key    = params.get('planet') ?? '';
  const planet = PLANETS[key];

  const [activePanel,       setActivePanel]       = useState<Panel>(null);
  const [oxygen,            setOxygen]            = useState(100);
  const [battery,           setBattery]           = useState(98);
  const [isDead,            setIsDead]            = useState(false);
  const [deathCause,        setDeathCause]        = useState<'oxygen' | 'battery' | null>(null);
  const [veraChatHistory,   setVeraChatHistory]   = useState<VeraChatHistory | null>(null);
  const [scannerFirstTime,  setScannerFirstTime]  = useState(false);
  const [scanState,         setScanState]         = useState<'idle' | 'scanning' | 'result'>('idle');
  const [suitDamaged,       setSuitDamaged]       = useState(false);
  const [showNarrative,     setShowNarrative]     = useState(false);
  const scannerSeenRef = useRef(false);

  useEffect(() => {
    if (key && PLANETS[key]) markPlanetVisited(key);
  }, [key, markPlanetVisited]);

  // Normal resource drain
  useEffect(() => {
    const id = setInterval(() => {
      setOxygen(prev  => Math.max(0, prev - 5));
      setBattery(prev => Math.max(0, prev - 5));
    }, 60_000);
    return () => clearInterval(id);
  }, []);

  // Rapid O2 drain — only after narrative is dismissed
  useEffect(() => {
    if (!suitDamaged || showNarrative) return;
    const id = setInterval(() => setOxygen(prev => Math.max(0, prev - 10)), 3_000);
    return () => clearInterval(id);
  }, [suitDamaged, showNarrative]);

  useEffect(() => {
    if (oxygen  <= 0 && !deathCause) { setDeathCause('oxygen');  setIsDead(true); }
  }, [oxygen,  deathCause]);
  useEffect(() => {
    if (battery <= 0 && !deathCause) { setDeathCause('battery'); setIsDead(true); }
  }, [battery, deathCause]);

  const handleSaveLog = useCallback(async (title: string, content: string) => {
    if (!token) return;
    await createLog(token, title, content);
  }, [token]);

  const handleButtonClick = (action: string | null) => {
    if (!action) { navigate('/hntd-holomap'); return; }
    if (action === 'weather') {
      const isFirst = !scannerSeenRef.current;
      scannerSeenRef.current = true;
      setScannerFirstTime(isFirst);
      setActivePanel('weather');
    } else if (action === 'scan') {
      setScanState('scanning');
      setTimeout(() => setScanState('result'), 3500);
    } else {
      setActivePanel(action as Panel);
    }
  };

  const handleProceed = () => {
    setActivePanel(null);
    setSuitDamaged(true);
    setShowNarrative(true);
  };

  const oxygenColor  = oxygen  > 60 ? '#00ffe1' : oxygen > 20 ? '#ff8800' : '#ff4d4d';
  // Hide HUD elements when a panel is open OR narrative is showing; NOT when only alerts are active
  const systemsHidden = activePanel !== null || scanState !== 'idle' || showNarrative;
  // Alerts fire after suit damaged and narrative dismissed
  const alertsActive = suitDamaged && !showNarrative && !isDead;

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
      <p className={styles.hudTopLabel}>// PLANET: {planet.name.toUpperCase()}</p>
      <p className={styles.hudRegionLabel}>{planet.region}</p>
      <div className={styles.sensorPanel}>
        {planet.sensors.map(s => (
          <div key={s.label} className={styles.sensorRow}>
            <span className={styles.sensorLabel}>{s.label}</span>
            <span className={s.alert ? styles.sensorValueAlert : styles.sensorValue}>{s.value}</span>
          </div>
        ))}
      </div>

      {/* Top-right */}
      <BatteryDisplay battery={battery} hidden={false} />
      <p className={`${styles.oxygenDisplay} ${oxygen <= 20 || suitDamaged ? styles.oxygenAlert : ''}`}
        style={{ color: oxygenColor }}>
        Oxygen: {oxygen}%{suitDamaged ? ' ⚠' : ''}
      </p>
      <BioDataPanel hidden={false} elevated={suitDamaged && !showNarrative} />

      {/* Bottom center */}
      <CompassDisplay hidden={systemsHidden} planetKey={key} />

      {/* HUD buttons */}
      {HUD_BUTTONS.map(btn => (
        <button key={btn.id}
          className={[
            styles.archHudBtn,
            systemsHidden ? styles.archHudBtnHidden : '',
            btn.id === 'ship' && alertsActive ? styles.archHudBtnUrgent : '',
          ].join(' ')}
          style={{ top: btn.top, ...btn.pos, transform: 'translateY(-50%)' }}
          onClick={() => handleButtonClick(btn.action)}>
          {btn.label}
        </button>
      ))}

      {/* Emergency alerts */}
      <EmergencyAlerts active={alertsActive} />

      {/* Panels */}
      {activePanel === 'log'      && <HNTDEditLogModal log={null} onSave={handleSaveLog} onClose={() => setActivePanel(null)} transparentOverlay />}
      {activePanel === 'vera'     && (
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
      {activePanel === 'distress' && <DistressPanel suitDamaged={suitDamaged} onClose={() => setActivePanel(null)} />}
      {scanState   === 'result'   && <ScanResultPanel result={planet.scanResult} onClose={() => setScanState('idle')} />}

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

      {/* Death screen */}
      {isDead && (
        <div className={styles.deathScreen}><div className={styles.deathContent}>
          <p className={styles.deathTitle}>YOU DIED</p>
          <p className={styles.deathVera}>VERA: &ldquo;{deathMessage}&rdquo;</p>
          <p className={styles.deathVera} style={{ borderLeft: 'none', paddingLeft: 0, textAlign: 'center', marginTop: '-0.5rem' }}>A new crew member may be assigned.</p>
          <button className={styles.deathRestartBtn} onClick={() => { logout(); navigate('/hntd-home'); }}>[ Initiate New Crew Member ]</button>
        </div></div>
      )}

      <ReturnToPortfolio />
    </div>
  );
};

export default HNTDTravel;
