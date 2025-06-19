// File: client/src/components/innerOrbit/layout/nav/IONavBar.tsx

// React
import React from 'react';
import { NavLink } from 'react-router-dom';

// Auth
import { useAuth } from '../../../../context/authContext';

// Styles
import styles from '../../../../assets/css/innerOrbit/layout/IONavBar.module.css';

const NavBar: React.FC = () => {
  const { logout } = useAuth();

  return (
    <nav className={styles.dashboardNav}>
      <div className={styles.navTitle}>
        <span className={styles.inner}>inner</span>
        <span className={styles.orbit}>Orbit</span>
      </div>
      <ul className={styles.navLinks}>
        <li>
          <NavLink
            to="/io-dashboard"
            className={({ isActive }) => isActive ? `${styles.navLinkItem} ${styles.active}` : styles.navLinkItem}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/io-journal"
            className={({ isActive }) => isActive ? `${styles.navLinkItem} ${styles.active}` : styles.navLinkItem}
          >
            Journal
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/io-tracker"
            className={({ isActive }) => isActive ? `${styles.navLinkItem} ${styles.active}` : styles.navLinkItem}
          >
            Tracker
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/io-library"
            className={({ isActive }) => isActive ? `${styles.navLinkItem} ${styles.active}` : styles.navLinkItem}
          >
            Library
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/io-account"
            className={({ isActive }) => isActive ? `${styles.navLinkItem} ${styles.active}` : styles.navLinkItem}
          >
            Account
          </NavLink>
        </li>
        <li>
          <button className={styles.navLinkItem} onClick={logout} type="button">
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
