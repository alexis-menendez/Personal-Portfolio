// File: client/src/pages/dontDie/HNTDWeatherScanner.tsx

import React, { useState } from 'react';
import HNTDNavigation from '../../components/dontDie/HNTDNavigation';
import ReturnToPortfolio from '../../components/innerOrbit/common/ReturnToPortfolio';
import styles from '../../assets/css/dontDie/HNTDConsole.module.css';
import { fetchWeather } from '../../api/dontDie/HNTDWeatherAPI';
import type { HNTDWeatherData } from '../../api/dontDie/HNTDWeatherAPI';

const windDirection = (deg: number): string => {
  const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return dirs[Math.round(deg / 45) % 8];
};

const veraComment = (data: HNTDWeatherData): string => {
  const temp = data.main.temp;
  const cond = data.weather[0]?.main?.toLowerCase() ?? '';
  if (cond.includes('thunder')) return 'VERA recommends not standing outside. Or do. VERA is an AI, not your mother.';
  if (cond.includes('snow'))    return 'Surface is covered in frozen precipitation. Traction modules advised.';
  if (cond.includes('rain'))    return 'Moisture saturation elevated. Your hair will not survive this.';
  if (cond.includes('fog') || cond.includes('mist')) return 'Visibility compromised. VERA cannot be held responsible for what you walk into.';
  if (temp > 95)  return 'Thermal readings critical. Hydration protocols: mandatory.';
  if (temp > 80)  return 'Surface temperature elevated. VERA suggests leaving the leather jacket at home.';
  if (temp < 20)  return 'Extreme cold detected. Organic crew members advised to layer aggressively.';
  if (temp < 40)  return 'Temperature suboptimal for biological life forms. Coat required. No debate.';
  if (cond.includes('clear')) return 'Atmospheric conditions nominal. Proceed without concern. Enjoy it while it lasts.';
  return 'Conditions within acceptable parameters. VERA is mildly impressed the planet is still here.';
};

const HNTDWeatherScanner: React.FC = () => {
  const [city,    setCity]    = useState('');
  const [data,    setData]    = useState<HNTDWeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');

  const handleScan = async () => {
    if (!city.trim()) return;
    setLoading(true);
    setError('');
    setData(null);
    try {
      const result = await fetchWeather(city.trim());
      setData(result);
    } catch (err: any) {
      setError(err.message ?? 'Scan failed');
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleScan();
  };

  return (
    <div className={styles.consoleBackground}>
      <div className={styles.consoleScreen}>
        <div className={styles.consoleContent}>

          <div className={styles.navColumn}>
            <HNTDNavigation />
          </div>

          <div className={styles.weatherPageContent}>
            <p className={styles.logsTitle} style={{ marginBottom: '0.6rem', flexShrink: 0 }}>
              // ATMOSPHERIC SCANNER
            </p>

            <div className={styles.weatherSearchRow}>
              <input
                className={styles.weatherSearchInput}
                placeholder="Enter planet sector (city)..."
                value={city}
                onChange={e => setCity(e.target.value)}
                onKeyDown={handleKey}
              />
              <button
                className={styles.weatherScanBtn}
                onClick={handleScan}
                disabled={loading || !city.trim()}
              >
                {loading ? 'Scanning...' : '[ Scan ]'}
              </button>
            </div>

            {error && <p className={styles.weatherError}>VERA: "{error}"</p>}

            {!data && !error && !loading && (
              <p className={styles.weatherIdle}>
                Atmospheric scanner online.<br />
                Enter a sector designation to begin.<br />
                <span style={{ fontSize: '0.65rem', opacity: 0.6 }}>
                  (VERA accepts Earth city names. Do not ask about other planets.)
                </span>
              </p>
            )}

            {data && (
              <div className={styles.weatherCard}>
                <p className={styles.weatherLocation}>
                  {data.name}, {data.sys.country}
                </p>
                <p className={styles.weatherCondition}>
                  // {data.weather[0]?.description?.toUpperCase()}
                </p>

                <div className={styles.weatherGrid}>
                  <div className={styles.weatherRow}>
                    <span className={styles.weatherLabel}>Surface Temp</span>
                    <span className={styles.weatherValue}>{Math.round(data.main.temp)}°F</span>
                  </div>
                  <div className={styles.weatherRow}>
                    <span className={styles.weatherLabel}>Feels Like</span>
                    <span className={styles.weatherValue}>{Math.round(data.main.feels_like)}°F</span>
                  </div>
                  <div className={styles.weatherRow}>
                    <span className={styles.weatherLabel}>Moisture Saturation</span>
                    <span className={styles.weatherValue}>{data.main.humidity}%</span>
                  </div>
                  <div className={styles.weatherRow}>
                    <span className={styles.weatherLabel}>Atmo. Pressure</span>
                    <span className={styles.weatherValue}>{data.main.pressure} hPa</span>
                  </div>
                  <div className={styles.weatherRow}>
                    <span className={styles.weatherLabel}>Wind Turbulence</span>
                    <span className={styles.weatherValue}>
                      {Math.round(data.wind.speed)} mph {windDirection(data.wind.deg)}
                    </span>
                  </div>
                  <div className={styles.weatherRow}>
                    <span className={styles.weatherLabel}>Cloud Cover</span>
                    <span className={styles.weatherValue}>{data.clouds.all}%</span>
                  </div>
                  <div className={styles.weatherRow}>
                    <span className={styles.weatherLabel}>Visibility</span>
                    <span className={styles.weatherValue}>
                      {data.visibility ? `${(data.visibility / 1000).toFixed(1)} km` : 'N/A'}
                    </span>
                  </div>
                  <div className={styles.weatherRow}>
                    <span className={styles.weatherLabel}>Thermal Range</span>
                    <span className={styles.weatherValue}>
                      {Math.round(data.main.temp_min)}° / {Math.round(data.main.temp_max)}°F
                    </span>
                  </div>
                </div>

                <p className={styles.weatherVeraLine}>
                  VERA: "{veraComment(data)}"
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
      <ReturnToPortfolio />
    </div>
  );
};

export default HNTDWeatherScanner;
