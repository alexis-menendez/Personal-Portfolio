// File: client/src/components/innerOrbit/layout/nav/IOFooter.tsx

// React
import React from 'react';

// Auth
import { useAuth } from '../../../../context/authContext';

// Styles
import styles from '../../../../assets/css/innerOrbit/layout/IONavBar.module.css';

const Footer: React.FC = () => {
  const { logout } = useAuth();

  return (
    <footer className={styles.footer}>
      <p>
        <span>
          <a href="/terms">Terms</a> | <a href="/privacy">Privacy</a>
        </span>
        <br />
        <span style={{ marginTop: '0.9rem', display: 'inline-block' }}>
          © {new Date().getFullYear()} innerOrbit
        </span>
      </p>
    </footer>
  );
};

export default Footer;
