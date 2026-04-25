// File: client/src/components/taskadelic/TDNavbar.tsx

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import auth from '../../utils/taskadelic/auth';
import tdStyles from '../../assets/css/taskadelic/Taskadelic.module.css';

const TDNavbar = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(auth.loggedIn());
  }, []);

  return (
    <div className={`${tdStyles.nav} ${tdStyles.decoBorder}`}>
      <div className={tdStyles.navTitle}>
        <Link to="/td-board">Taskadelic</Link>
      </div>
      <ul>
        {!loggedIn ? (
          <li className={tdStyles.navItem}>
            <button type="button">
              <Link to="/td-home">Login</Link>
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
    </div>
  );
};

export default TDNavbar;
