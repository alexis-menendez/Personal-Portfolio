// File: client/src/components/taskadelic/TDNavbar.tsx

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import auth from '../../utils/taskadelic/TDAuth';
import tdStyles from '../../assets/css/taskadelic/TDTaskadelic.module.css';

const TDNavbar = ({ narrow = false, hideLogin = false }: { narrow?: boolean; hideLogin?: boolean }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(auth.loggedIn());
  }, []);

  return (
    <div
      className={`${tdStyles.nav} ${tdStyles.decoBorder}`}
      style={{
        ...(narrow ? { maxWidth: '540px' } : {}),
        ...(hideLogin ? { justifyContent: 'center' } : {}),
      }}
    >
      <div className={tdStyles.navTitle} style={hideLogin ? { fontSize: '2.5rem' } : undefined}>
        <Link to="/td-board">Taskadelic</Link>
      </div>
      {!hideLogin && (
        <ul>
          {!loggedIn ? (
            <li className={tdStyles.navItem}>
              <button type="button" className={tdStyles.logoutBtn}>
                <Link to="/td-home" style={{ color: 'inherit', textDecoration: 'none' }}>Login</Link>
              </button>
            </li>
          ) : (
            <li className={tdStyles.navItem}>
              <button type="button" className={tdStyles.logoutBtn} onClick={() => auth.logout()}>
                Logout
              </button>
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default TDNavbar;
