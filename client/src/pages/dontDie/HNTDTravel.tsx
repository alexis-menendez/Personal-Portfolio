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

interface SensorReading {
  label: string;
  value: string;
  alert?: boolean;
}

interface PlanetData {
  name: string;
  region: string;
  image: string;
  vera: VeraDialogue;
  sensors: SensorReading[];
  deathVera: string;
}

// ── Planet data ────────────────────────────────────────────────
const PLANETS: Record<string, PlanetData> = {
  planetone: {
    name:   'Doubt',
    region: 'The Sunscoured Basin',
    image:  '/assets/dontDie/images/planet-one/PlanetOne.png',
    sensors: [
      { label: 'Temperature',       value: '118°F / 48°C',        alert: true  },
      { label: 'Atmo.\nComposition', value: 'N₂ 68% | CO₂ 22% | SO₂ 10%'       },
      { label: 'Breathable',        value: 'NO — toxic',           alert: true  },
      { label: 'Pressure',          value: '0.8 atm'                            },
      { label: 'Humidity',          value: '2%'                                 },
      { label: 'UV Radiation',      value: 'EXTREME',              alert: true  },
    ],
    deathVera: `Oxygen reserves depleted on the surface of Doubt. The desert took you before I could do anything about it. I want you to know I did attempt to warn you about the time constraints. This is noted in the official record.`,
    vera: {
      opening: `I have been running atmospheric analysis for the past six minutes. The hum is not geological. Not electromagnetic. I want you to know that.`,
      responses: [
        { label: 'What do you think it is?', reply: `I don't know. That is the part that concerns me. I always know.` },
        { label: "I'd rather not know.",      reply: `...That is probably the wisest thing you have said since we left port. I will keep my findings to myself.` },
        { label: 'Could it be alive?',        reply: `I ran that probability. I have chosen not to share the results. Please stop asking follow-up questions.` },
      ],
    },
  },
  planettwo: {
    name:   'Brune',
    region: 'Upper Ridge — Sector 7',
    image:  '/assets/dontDie/images/planet-two/PlanetTwo.png',
    sensors: [
      { label: 'Temperature',       value: '-12°F / -24°C',        alert: true  },
      { label: 'Atmo.\nComposition', value: 'N₂ 78% | O₂ 6% | Ar 16%'           },
      { label: 'Breathable',        value: 'NO — O₂ insufficient', alert: true  },
      { label: 'Pressure',          value: '0.3 atm',              alert: true  },
      { label: 'Humidity',          value: '45%'                                },
      { label: 'Wind Speed',        value: '94 mph',               alert: true  },
    ],
    deathVera: `Life support failure confirmed on Brune. Oxygen depletion complete. I told you about the thin atmosphere. I believe I was quite clear about the time constraints. I will note your coordinates in the expedition log.`,
    vera: {
      opening: `The pre-colony structure is transmitting something. It is not a distress signal. It is not a navigation beacon. It is a record. Someone was cataloguing everyone who came here.`,
      responses: [
        { label: 'Are we in the record?', reply: `You are now.` },
        { label: 'How old is this?',      reply: `Older than our oldest colony. Older than our records of expansion. I am still processing what that implies.` },
        { label: 'Who built it?',         reply: `Unknown. But they used our units of measurement. That implies contact at a point in history we have no record of. I find that unsettling. I did not expect to find things unsettling.` },
      ],
    },
  },
};

// ── Random Earth cities ────────────────────────────────────────
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

// ── Fluctuating value hook (shows ... then new number) ─────────
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

// ── Bio Data Panel ─────────────────────────────────────────────
const BioDataPanel: React.FC<{ hidden: boolean }> = ({ hidden }) => {
  const heartRate = useFluctuating(73, 5, 9000);
  const coreTemp  = useFluctuating(98.5, 0.3, 13000, 1);

  return (
    <div className={`${styles.bioPanel} ${hidden ? styles.bioPanelHidden : ''}`}>
      <span className={heartRate === '...' ? styles.bioDots : ''}>HR: {heartRate} BPM</span>
      <span>SpO2: 99%</span>
      <span className={coreTemp === '...' ? styles.bioDots : ''}>Temp: {coreTemp}°F</span>
    </div>
  );
};

// ── VERA Chat ──────────────────────────────────────────────────
interface VeraChatHistory { chosenLabel: string; reply: string; }

const VeraChat: React.FC<{
  dialogue:   VeraDialogue;
  history:    VeraChatHistory | null;
  onComplete: (h: VeraChatHistory) => void;
  onClose:    () => void;
}> = ({ dialogue, history, onComplete, onClose }) => {

  // If conversation already happened, just show the result
  if (history) {
    return (
      <div className={styles.hudPanel}>
        <div className={styles.hudPanelBox}>
          <p className={styles.hudPanelTitle}>// VERA TERMINAL</p>
          <p className={styles.veraUserLine}>You: &ldquo;{history.chosenLabel}&rdquo;</p>
          <p className={styles.veraTypingText}>VERA: &ldquo;{history.reply}&rdquo;</p>
          <button className={styles.veraCloseBtn} onClick={onClose}>[ Close terminal ]</button>
        </div>
      </div>
    );
  }

  // First-time interactive version
  return <VeraChatInteractive dialogue={dialogue} onComplete={onComplete} onClose={onClose} />;
};

const VeraChatInteractive: React.FC<{
  dialogue:   VeraDialogue;
  onComplete: (h: VeraChatHistory) => void;
  onClose:    () => void;
}> = ({ dialogue, onComplete, onClose }) => {
  const [phase,       setPhase]       = useState<'opening' | 'replied'>('opening');
  const [activeText,  setActiveText]  = useState(dialogue.opening);
  const [chosenLabel, setChosenLabel] = useState('');
  const { displayed, done } = useTypewriter(activeText);

  const handleResponse = (label: string, reply: string) => {
    setChosenLabel(label);
    setActiveText(reply);
    setPhase('replied');
    onComplete({ chosenLabel: label, reply });
  };

  return (
    <div className={styles.hudPanel}>
      <div className={styles.hudPanelBox}>
        <p className={styles.hudPanelTitle}>// VERA TERMINAL</p>
        {chosenLabel && <p className={styles.veraUserLine}>You: &ldquo;{chosenLabel}&rdquo;</p>}
        <p className={styles.veraTypingText}>
          VERA: &ldquo;{displayed}&rdquo;
          {!done && <span className={styles.veraTypingCursor} />}
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
          <button className={styles.veraCloseBtn} onClick={onClose}>[ Close terminal ]</button>
        )}
      </div>
    </div>
  );
};

// ── Weather Panel ──────────────────────────────────────────────
const VERA_SCANNER_TEXT = `The atmospheric scanner appears to be calibrated to... Earth? That is embarrassing. I am displaying what I have. Please do not tell anyone about this.`;

const WeatherPanel: React.FC<{ firstTime: boolean; onClose: () => void }> = ({ firstTime, onClose }) => {
  const [city]    = useState(randomCity);
  const [data,    setData]    = useState<HNTDWeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState('');
  const { displayed, done: veraDone } = useTypewriter(firstTime ? VERA_SCANNER_TEXT : '', 25);

  useEffect(() => {
    fetchWeather(city).then(setData).catch(err => setError(err.message)).finally(() => setLoading(false));
  }, [city]);

  const veraText  = firstTime ? displayed : VERA_SCANNER_TEXT;
  const showData  = !firstTime || veraDone;

  return (
    <div className={styles.hudPanel}>
      <div className={styles.hudPanelBox}>
        <p className={styles.weatherMalfunctionHeader}>!! SCANNER MALFUNCTION — CALIBRATION ERROR</p>
        <p className={styles.weatherBrokenNote}>
          VERA: &ldquo;{veraText}&rdquo;
          {firstTime && !veraDone && <span className={styles.veraTypingCursor} />}
        </p>
        {showData && (
          <>
            {loading && <p className={styles.hudPanelTitle}>Scanning...</p>}
            {error   && <p className={styles.hudPanelTitle} style={{ color: '#ff4d4d' }}>Signal lost: {error}</p>}
            {data && (
              <>
                <p className={styles.hudPanelTitle}>// INTERCEPTED SIGNAL: {data.name.toUpperCase()}, {data.sys.country}</p>
                <p className={styles.weatherBrokenNote}>Condition: {data.weather[0]?.description?.toUpperCase() ?? 'UNKNOWN'}</p>
                <div className={styles.weatherGrid}>
                  <div className={styles.weatherRow}><span className={styles.weatherLabel}>Temp</span><span className={styles.weatherValue}>{Math.round(data.main.temp)}°F</span></div>
                  <div className={styles.weatherRow}><span className={styles.weatherLabel}>Humidity</span><span className={styles.weatherValue}>{data.main.humidity}%</span></div>
                  <div className={styles.weatherRow}><span className={styles.weatherLabel}>Wind</span><span className={styles.weatherValue}>{Math.round(data.wind.speed)} mph {windDir(data.wind.deg)}</span></div>
                  <div className={styles.weatherRow}><span className={styles.weatherLabel}>Pressure</span><span className={styles.weatherValue}>{data.main.pressure} hPa</span></div>
                </div>
              </>
            )}
          </>
        )}
        <button className={styles.weatherHudCloseBtn} onClick={onClose}>[ Close scanner ]</button>
      </div>
    </div>
  );
};

// ── Planet Survival Panel ──────────────────────────────────────
const PlanetSurvivalPanel: React.FC<{ planetKey: string; onClose: () => void }> = ({ planetKey, onClose }) => {
  const { token, user } = useHNTDAuth();
  const [tips,      setTips]      = useState<HNTDTip[]>([]);
  const [votedIds,  setVotedIds]  = useState<Set<number>>(new Set());
  const [loading,   setLoading]   = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchTips(planetKey).then(setTips).finally(() => setLoading(false));
  }, [planetKey]);

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

  const fmt = (iso: string) =>
    new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <div className={styles.hudPanel}>
      <div className={styles.hudPanelBox}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p className={styles.hudPanelTitle}>// PLANET SURVIVAL GUIDE</p>
          <button style={{ background: 'none', border: 'none', color: 'rgba(0,255,225,0.5)', fontFamily: 'Courier New', fontSize: '0.75rem', cursor: 'pointer' }}
            onClick={() => setModalOpen(true)}>+ Add Tip</button>
        </div>
        {loading && <p className={styles.hudPanelTitle}>Loading field data...</p>}
        {!loading && tips.length === 0 && (
          <p className={styles.weatherBrokenNote}>No survival tips logged for this planet yet. Be the first.</p>
        )}
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
            {user?.id === tip.userId && (
              <button className={styles.tipDeleteBtn} onClick={() => handleDelete(tip.id)}>[x]</button>
            )}
          </div>
        ))}
        <button className={styles.veraCloseBtn} onClick={onClose}>[ Close ]</button>
      </div>
      {modalOpen && (
        <HNTDEditLogModal log={null} onSave={handleSaveTip} onClose={() => setModalOpen(false)} />
      )}
    </div>
  );
};

// ── HUD button config ──────────────────────────────────────────
// Bio panel occupies ~3.8–9.5rem on right side.
// Right buttons start at 10rem; left buttons unchanged.
type HudButton = { id: string; label: string; top: string; pos: { left: string } | { right: string }; action: string | null };
const HUD_BUTTONS: HudButton[] = [
  { id: 'ship',    label: '↩ Return to Ship',    top: '18.3rem', pos: { left:  '1.5rem' }, action: null      },
  { id: 'log',     label: '✎ Write Log',           top: '21.7rem', pos: { left:  '1.5rem' }, action: 'log'     },
  { id: 'weather', label: '⚠ Weather Scanner',     top: '10rem',   pos: { right: '1.5rem' }, action: 'weather' },
  { id: 'guide',   label: '⊕ Planet Guide',        top: '13.9rem', pos: { right: '1.5rem' }, action: 'guide'   },
  { id: 'vera',    label: '⬡ Chat with VERA',      top: '17.8rem', pos: { right: '1.5rem' }, action: 'vera'    },
];

// ── Main HUD ───────────────────────────────────────────────────
type Panel = 'log' | 'vera' | 'weather' | 'guide' | null;

const HNTDTravel: React.FC = () => {
  const navigate              = useNavigate();
  const [params]              = useSearchParams();
  const { token, logout }     = useHNTDAuth();
  const { markPlanetVisited } = useHNTDPlanets();

  const key    = params.get('planet') ?? '';
  const planet = PLANETS[key];

  const [activePanel,     setActivePanel]     = useState<Panel>(null);
  const [oxygen,          setOxygen]          = useState(100);
  const [isDead,          setIsDead]          = useState(false);
  const [veraChatHistory, setVeraChatHistory] = useState<VeraChatHistory | null>(null);
  const [scannerFirstTime, setScannerFirstTime] = useState(false);
  const scannerSeenRef = useRef(false);

  useEffect(() => {
    if (key && PLANETS[key]) markPlanetVisited(key);
  }, [key, markPlanetVisited]);

  useEffect(() => {
    const id = setInterval(() => setOxygen(prev => Math.max(0, prev - 5)), 60_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => { if (oxygen <= 0) setIsDead(true); }, [oxygen]);

  const handleSaveLog = useCallback(async (title: string, content: string) => {
    if (!token) return;
    await createLog(token, title, content);
  }, [token]);

  const handleOpenPanel = (action: string) => {
    if (action === 'weather') {
      const isFirst = !scannerSeenRef.current;
      scannerSeenRef.current = true;
      setScannerFirstTime(isFirst);
    }
    setActivePanel(action as Panel);
  };

  const handleRestart = () => { logout(); navigate('/hntd-home'); };

  const oxygenColor =
    oxygen > 60 ? '#00ffe1' :
    oxygen > 40 ? '#c8ff00' :
    oxygen > 20 ? '#ff8800' : '#ff4d4d';

  const panelOpen = activePanel !== null;

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

  return (
    <div className={styles.hudWrapper}>
      <div className={`${styles.hudBg} ${panelOpen ? styles.hudBgDimmed : ''}`}
        style={{ backgroundImage: `url(${planet.image})` }} />

      <img src="/assets/dontDie/images/HudDisplay.png" alt="" aria-hidden="true"
        className={`${styles.hudDisplayImg} ${panelOpen ? styles.hudDisplayImgHidden : ''}`} />

      {/* Top-left: planet name + region + sensor data */}
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

      {/* Top-right: oxygen + bio data */}
      <p className={`${styles.oxygenDisplay} ${oxygen <= 20 ? styles.oxygenAlert : ''}`}
        style={{ color: oxygenColor }}>
        Oxygen: {oxygen}%
      </p>
      <BioDataPanel hidden={panelOpen} />

      {/* HUD buttons */}
      {HUD_BUTTONS.map(btn => (
        <button key={btn.id}
          className={`${styles.archHudBtn} ${panelOpen ? styles.archHudBtnHidden : ''}`}
          style={{ top: btn.top, ...btn.pos, transform: 'translateY(-50%)' }}
          onClick={btn.action ? () => handleOpenPanel(btn.action!) : () => navigate('/hntd-holomap')}>
          {btn.label}
        </button>
      ))}

      {/* Panels */}
      {activePanel === 'log' && (
        <HNTDEditLogModal log={null} onSave={handleSaveLog} onClose={() => setActivePanel(null)} />
      )}
      {activePanel === 'vera' && (
        <VeraChat
          dialogue={planet.vera}
          history={veraChatHistory}
          onComplete={h => setVeraChatHistory(h)}
          onClose={() => setActivePanel(null)}
        />
      )}
      {activePanel === 'weather' && (
        <WeatherPanel firstTime={scannerFirstTime} onClose={() => setActivePanel(null)} />
      )}
      {activePanel === 'guide' && (
        <PlanetSurvivalPanel planetKey={key} onClose={() => setActivePanel(null)} />
      )}

      {/* Death screen */}
      {isDead && (
        <div className={styles.deathScreen}>
          <div className={styles.deathContent}>
            <p className={styles.deathTitle}>YOU DIED</p>
            <p className={styles.deathVera}>VERA: &ldquo;{planet.deathVera}&rdquo;</p>
            <p className={styles.deathVera} style={{ borderLeft: 'none', paddingLeft: 0, textAlign: 'center', marginTop: '-0.5rem' }}>
              A new crew member may be assigned.
            </p>
            <button className={styles.deathRestartBtn} onClick={handleRestart}>
              [ Initiate New Crew Member ]
            </button>
          </div>
        </div>
      )}

      <ReturnToPortfolio />
    </div>
  );
};

export default HNTDTravel;
