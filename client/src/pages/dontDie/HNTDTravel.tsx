// File: client/src/pages/dontDie/HNTDTravel.tsx

import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useHNTDAuth } from '../../context/HNTDAuthContext';
import { useHNTDPlanets } from '../../context/HNTDPlanetContext';
import HNTDEditLogModal from '../../components/dontDie/HNTDEditLogModal';
import ReturnToPortfolio from '../../components/innerOrbit/common/ReturnToPortfolio';
import styles from '../../assets/css/dontDie/HNTDHolomap.module.css';
import { createLog } from '../../api/dontDie/HNTDLogAPI';
import { fetchWeather } from '../../api/dontDie/HNTDWeatherAPI';
import type { HNTDWeatherData } from '../../api/dontDie/HNTDWeatherAPI';

// ── Planet data ────────────────────────────────────────────────
interface VeraDialogue {
  opening: string;
  responses: { label: string; reply: string }[];
}

interface PlanetData {
  name: string;
  image: string;
  vera: VeraDialogue;
}

const PLANETS: Record<string, PlanetData> = {
  planetone: {
    name: 'Doubt',
    image: '/assets/dontDie/images/planet-one/PlanetOne.png',
    vera: {
      opening: `I have been running atmospheric analysis for the past six minutes. The hum is not geological. Not electromagnetic. I want you to know that.`,
      responses: [
        { label: 'What do you think it is?',  reply: `I don't know. That is the part that concerns me. I always know.` },
        { label: "I'd rather not know.",       reply: `...That is probably the wisest thing you have said since we left port. I will keep my findings to myself.` },
        { label: 'Could it be alive?',         reply: `I ran that probability. I have chosen not to share the results. Please stop asking follow-up questions.` },
      ],
    },
  },
  planettwo: {
    name: 'Brune',
    image: '/assets/dontDie/images/planet-two/PlanetTwo.png',
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

// ── Random Earth cities for broken scanner ─────────────────────
const EARTH_CITIES = [
  'New York', 'Tokyo', 'London', 'Sydney', 'Cairo',
  'Rio de Janeiro', 'Mumbai', 'Toronto', 'Lagos', 'Seoul',
  'Paris', 'Mexico City', 'Dubai', 'Buenos Aires', 'Jakarta',
  'Istanbul', 'Beijing', 'Chicago', 'Cape Town', 'Moscow',
];
const randomCity = () => EARTH_CITIES[Math.floor(Math.random() * EARTH_CITIES.length)];
const windDir = (deg: number) => ['N','NE','E','SE','S','SW','W','NW'][Math.round(deg / 45) % 8];

// ── Typewriter hook ────────────────────────────────────────────
function useTypewriter(text: string, speed = 28) {
  const [displayed, setDisplayed] = useState('');
  const [done,      setDone]      = useState(false);
  useEffect(() => {
    setDisplayed(''); setDone(false);
    if (!text) return;
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

// ── Arch button positions ──────────────────────────────────────
// mid-radius = 62.5vmin, center at (50vw, 100vh)
// left: calc(50vw + cos(θ) * 62.5vmin)
// top:  calc(100vh - sin(θ) * 62.5vmin)
const toCalc = (angleDeg: number): React.CSSProperties => {
  const r = 62.5;
  const rad = (angleDeg * Math.PI) / 180;
  const c = Math.cos(rad);
  const s = Math.sin(rad);
  const xSign = c >= 0 ? '+' : '-';
  const ySign = '+'; // top always uses minus from 100vh, so we flip sign via string
  return {
    position: 'absolute',
    left:      `calc(50vw ${xSign} ${Math.abs(c * r).toFixed(2)}vmin)`,
    top:       `calc(100vh - ${(s * r).toFixed(2)}vmin)`,
    transform: 'translate(-50%, -50%)',
  };
};

// ── VERA Chat ──────────────────────────────────────────────────
const VeraChat: React.FC<{ dialogue: VeraDialogue; onClose: () => void }> = ({ dialogue, onClose }) => {
  const [phase,       setPhase]       = useState<'opening' | 'replied'>('opening');
  const [activeText,  setActiveText]  = useState(dialogue.opening);
  const [chosenLabel, setChosenLabel] = useState('');
  const { displayed, done } = useTypewriter(activeText);

  const handleResponse = (label: string, reply: string) => {
    setChosenLabel(label);
    setActiveText(reply);
    setPhase('replied');
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
const WeatherPanel: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [city]    = useState(randomCity);
  const [data,    setData]    = useState<HNTDWeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState('');

  useEffect(() => {
    fetchWeather(city)
      .then(setData)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [city]);

  return (
    <div className={styles.hudPanel}>
      <div className={styles.hudPanelBox}>
        <p className={styles.weatherMalfunctionHeader}>!! SCANNER MALFUNCTION — CALIBRATION ERROR</p>
        <p className={styles.weatherBrokenNote}>
          VERA: &ldquo;The atmospheric scanner appears to be calibrated to... Earth? That is embarrassing.
          I am displaying what I have. Please do not tell anyone about this.&rdquo;
        </p>
        {loading && <p className={styles.hudPanelTitle}>Scanning...</p>}
        {error   && <p className={styles.hudPanelTitle} style={{ color: '#ff4d4d' }}>Signal lost: {error}</p>}
        {data && (
          <>
            <p className={styles.hudPanelTitle}>// INTERCEPTED SIGNAL: {data.name.toUpperCase()}, {data.sys.country}</p>
            <p className={styles.weatherBrokenNote}>Condition: {data.weather[0]?.description?.toUpperCase() ?? 'UNKNOWN'}</p>
            <div className={styles.weatherGrid}>
              <div className={styles.weatherRow}>
                <span className={styles.weatherLabel}>Temp</span>
                <span className={styles.weatherValue}>{Math.round(data.main.temp)}°F</span>
              </div>
              <div className={styles.weatherRow}>
                <span className={styles.weatherLabel}>Humidity</span>
                <span className={styles.weatherValue}>{data.main.humidity}%</span>
              </div>
              <div className={styles.weatherRow}>
                <span className={styles.weatherLabel}>Wind</span>
                <span className={styles.weatherValue}>{Math.round(data.wind.speed)} mph {windDir(data.wind.deg)}</span>
              </div>
              <div className={styles.weatherRow}>
                <span className={styles.weatherLabel}>Pressure</span>
                <span className={styles.weatherValue}>{data.main.pressure} hPa</span>
              </div>
            </div>
          </>
        )}
        <button className={styles.weatherHudCloseBtn} onClick={onClose}>[ Close scanner ]</button>
      </div>
    </div>
  );
};

// ── Main HUD ───────────────────────────────────────────────────
type Panel = 'log' | 'vera' | 'weather' | null;

const HNTDTravel: React.FC = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { token } = useHNTDAuth();
  const { markPlanetVisited } = useHNTDPlanets();

  const key    = params.get('planet') ?? '';
  const planet = PLANETS[key];
  const [activePanel, setActivePanel] = useState<Panel>(null);

  useEffect(() => {
    if (key && PLANETS[key]) markPlanetVisited(key);
  }, [key, markPlanetVisited]);

  const handleSaveLog = useCallback(async (title: string, content: string) => {
    if (!token) return;
    await createLog(token, title, content);
  }, [token]);

  const panelOpen = activePanel !== null;

  if (!planet) {
    return (
      <div className={styles.shuttleWrapper}>
        <div className={styles.shuttleContent}>
          <p className={styles.shuttleTitle}>// UNKNOWN SECTOR</p>
          <p className={styles.shuttleVera}>
            VERA: &ldquo;I have no data on this location. That is either very exciting or very bad. Historically, it has been the latter.&rdquo;
          </p>
          <button className={styles.shuttleBtn} onClick={() => navigate('/hntd-holomap')}>Return to Galaxy Map</button>
        </div>
        <ReturnToPortfolio />
      </div>
    );
  }

  return (
    <div className={styles.hudWrapper}>
      {/* Background — undimmed on landing, dims when a panel opens */}
      <div
        className={`${styles.hudBg} ${panelOpen ? styles.hudBgDimmed : ''}`}
        style={{ backgroundImage: `url(${planet.image})` }}
      />

      {/* Sector label — always visible */}
      <p className={styles.hudTopLabel}>// SURFACE: {planet.name.toUpperCase()}</p>

      {/* Arch ring — fades when a panel is open */}
      <div className={`${styles.archRing} ${panelOpen ? styles.archRingHidden : ''}`} />

      {/* HUD buttons positioned along the arch mid-radius */}
      <button
        className={`${styles.archHudBtn} ${panelOpen ? styles.archHudBtnHidden : ''}`}
        style={toCalc(145)}
        onClick={() => navigate('/hntd-holomap')}
      >
        ↩ Return to Ship
      </button>

      <button
        className={`${styles.archHudBtn} ${panelOpen ? styles.archHudBtnHidden : ''}`}
        style={toCalc(115)}
        onClick={() => setActivePanel('log')}
      >
        ✎ Write Log
      </button>

      <button
        className={`${styles.archHudBtn} ${panelOpen ? styles.archHudBtnHidden : ''}`}
        style={toCalc(65)}
        onClick={() => setActivePanel('vera')}
      >
        ⬡ Chat VERA
      </button>

      <button
        className={`${styles.archHudBtn} ${panelOpen ? styles.archHudBtnHidden : ''}`}
        style={toCalc(35)}
        onClick={() => setActivePanel('weather')}
      >
        ⚠ Scanner
      </button>

      {/* Panels */}
      {activePanel === 'log' && (
        <HNTDEditLogModal log={null} onSave={handleSaveLog} onClose={() => setActivePanel(null)} />
      )}
      {activePanel === 'vera' && (
        <VeraChat dialogue={planet.vera} onClose={() => setActivePanel(null)} />
      )}
      {activePanel === 'weather' && (
        <WeatherPanel onClose={() => setActivePanel(null)} />
      )}

      <ReturnToPortfolio />
    </div>
  );
};

export default HNTDTravel;
