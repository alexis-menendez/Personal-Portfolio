// File: client/src/pages/dontDie/HNTDShuttleBreak.tsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHNTDPlanets } from '../../context/HNTDPlanetContext';
import ReturnToPortfolio from '../../components/innerOrbit/common/ReturnToPortfolio';
import styles from '../../assets/css/dontDie/HNTDHolomap.module.css';

const SYSTEMS = [
  { name: 'Life Support',          status: 'CRITICAL',    ok: false },
  { name: 'Propulsion Drive',      status: 'OFFLINE',     ok: false },
  { name: 'Navigation Array',      status: 'OFFLINE',     ok: false },
  { name: 'Communications',        status: 'OFFLINE',     ok: false },
  { name: 'Hull Integrity',        status: 'COMPROMISED', ok: false },
  { name: 'Power Relay A',         status: 'FAILURE',     ok: false },
  { name: 'Power Relay B',         status: 'FAILURE',     ok: false },
  { name: 'Emergency Beacon',      status: 'FAILURE',     ok: false },
  { name: 'Fuel Containment',      status: 'WARNING',     ok: false },
  { name: 'Atmospheric Seal',      status: 'NOMINAL',     ok: true  },
  { name: 'Backup Power Cell',     status: 'NOMINAL',     ok: true  },
  { name: 'Crew Compartment Seal', status: 'NOMINAL',     ok: true  },
];

const HNTDShuttleBreak: React.FC = () => {
  const navigate = useNavigate();
  const { markPlanetVisited } = useHNTDPlanets();
  const [showDiagnostics, setShowDiagnostics] = useState(false);
  const [alarmOn, setAlarmOn] = useState(true);

  useEffect(() => {
    markPlanetVisited('planethree');
    const id = setInterval(() => setAlarmOn(prev => !prev), 600);
    return () => clearInterval(id);
  }, [markPlanetVisited]);

  return (
    <div className={styles.shuttleWrapper}>
      {!showDiagnostics ? (
        <div className={styles.shuttleContent}>
          <p className={styles.shuttleTitle} style={{ color: alarmOn ? '#ff4d4d' : '#cc0000' }}>
            !! ALERT — ALL SYSTEMS FAILURE
          </p>
          <p className={styles.shuttleVera} style={{ whiteSpace: 'pre-line' }}>
            {`You set a course for the final coordinates. The jump felt clean.\n\nThen the ship stopped.\n\nNot slowed. Stopped. Dead in space. Every console went dark for three full seconds before emergency power flickered on.\n\nThe alarms started a moment later.`}
          </p>
          <button className={styles.shuttleBtn} onClick={() => setShowDiagnostics(true)}>
            [ Check Ship Diagnostics ]
          </button>
        </div>
      ) : (
        <div className={styles.shuttleContent} style={{ maxWidth: '640px', maxHeight: '80vh', overflowY: 'auto' }}>
          <p className={styles.shuttleTitle}>// SHIP DIAGNOSTICS — FULL REPORT</p>
          <p style={{ fontFamily: 'Courier New', fontSize: '0.72rem', color: 'rgba(0,255,225,0.5)', marginBottom: '0.75rem' }}>
            VERA: &ldquo;I am running a full diagnostic. Here is what I have.&rdquo;
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            {SYSTEMS.map(sys => (
              <div key={sys.name} style={{
                display: 'flex', justifyContent: 'space-between',
                fontFamily: 'Courier New', fontSize: '0.8rem',
                padding: '0.3rem 0.5rem',
                background: sys.ok ? 'rgba(0,255,200,0.06)' : 'rgba(255,77,77,0.08)',
                borderLeft: `3px solid ${sys.ok ? '#00ffe1' : sys.status === 'WARNING' ? '#ffdd00' : '#ff4d4d'}`,
              }}>
                <span style={{ color: '#00ffe1' }}>{sys.name}</span>
                <span style={{ color: sys.ok ? '#00ffe1' : sys.status === 'WARNING' ? '#ffdd00' : '#ff4d4d', fontWeight: 600 }}>
                  {sys.status}
                </span>
              </div>
            ))}
          </div>
          <p style={{ fontFamily: 'Courier New', fontSize: '0.72rem', color: 'rgba(0,255,225,0.5)', marginTop: '1rem' }}>
            VERA: &ldquo;Life support is running on backup reserves. I do not know how long they will hold.&rdquo;
          </p>
          <button className={styles.shuttleBtn} style={{ marginTop: '1rem' }} onClick={() => navigate('/hntd-holomap')}>
            [ Return to Galaxy Map ]
          </button>
        </div>
      )}
      <ReturnToPortfolio />
    </div>
  );
};

export default HNTDShuttleBreak;
