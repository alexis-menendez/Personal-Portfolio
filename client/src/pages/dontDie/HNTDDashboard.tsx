// File: client/src/pages/dontDie/HNTDDashboard.tsx

import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useHNTDAuth } from '../../context/HNTDAuthContext';
import ReturnToPortfolio from '../../components/innerOrbit/common/ReturnToPortfolio';
import styles from '../../assets/css/dontDie/HNTDConsole.module.css';

const NAV_LINKS = [
  { to: '/hntd-dashboard', label: 'Command Center' },
];

const VERA_QUOTE = `WELCOME BACK, EXPLORER.

All systems are... mostly operational.
VERA is online. Navigation is stable.
The planets are waiting.

Proceed with caution. Or don't.
VERA makes no guarantees.`;

const HNTDDashboard: React.FC = () => {
  const { user, logout } = useHNTDAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/hntd-home');
  };

  return (
    <div className={styles.consoleBackground}>
      <div className={styles.consoleScreen}>
        <div className={styles.consoleContent}>

          {/* Navigation column */}
          <div className={styles.navColumn}>
            <ul className={styles.navList}>
              {NAV_LINKS.map(link => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink
                    }
                  >
                    ✦ {link.label}
                  </NavLink>
                </li>
              ))}
              <li style={{ marginTop: 'auto' }}>
                <button
                  onClick={handleLogout}
                  className={styles.navLink}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                >
                  ✦ Sign Out
                </button>
              </li>
            </ul>
          </div>

          {/* Page content */}
          <div className={styles.pageContent}>
            <div className={styles.dashboardContent}>
              <p className={styles.veraLabel}>// VERA — SHIP AI v2.4.1</p>
              <p className={styles.veraQuote}>
                {user ? `Commander ${user.username.toUpperCase()}.` : 'Commander.'}<br /><br />
                {VERA_QUOTE}
              </p>
            </div>
          </div>

        </div>
      </div>
      <ReturnToPortfolio />
    </div>
  );
};

export default HNTDDashboard;
