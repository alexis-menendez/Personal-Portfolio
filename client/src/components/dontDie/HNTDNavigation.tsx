// File: client/src/components/dontDie/HNTDNavigation.tsx

import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useHNTDAuth } from '../../context/HNTDAuthContext';
import styles from '../../assets/css/dontDie/HNTDConsole.module.css';

const NAV_LINKS = [
  { to: '/hntd-dashboard', label: 'Command Center' },
  { to: '/hntd-holomap',   label: 'Galaxy Map'     },
];

const HNTDNavigation: React.FC = () => {
  const { logout } = useHNTDAuth();
  const navigate   = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/hntd-home');
  };

  return (
    <nav>
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

        <li style={{ marginTop: '1rem' }}>
          <button
            onClick={handleLogout}
            className={styles.navLink}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            ✦ Sign Out
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default HNTDNavigation;
