// File: client/src/pages/dontDie/HNTDDashboard.tsx

import React from 'react';
import { useHNTDAuth } from '../../context/HNTDAuthContext';
import HNTDNavigation from '../../components/dontDie/HNTDNavigation';
import ReturnToPortfolio from '../../components/innerOrbit/common/ReturnToPortfolio';
import styles from '../../assets/css/dontDie/HNTDConsole.module.css';

const VERA_QUOTE = `WELCOME BACK, EXPLORER.

All systems are... mostly operational.
VERA is online. Navigation is stable.
The planets are waiting.

Proceed with caution. Or don't.
VERA makes no guarantees.`;

const HNTDDashboard: React.FC = () => {
  const { user } = useHNTDAuth();

  return (
    <div className={styles.consoleBackground}>
      <div className={styles.consoleScreen}>
        <div className={styles.consoleContent}>

          {/* Navigation column */}
          <div className={styles.navColumn}>
            <HNTDNavigation />
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
