// File: client/src/pages/hntd/HNTDHome.tsx

import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHNTDAuth } from '../../context/hntdAuthContext';
import { loginHNTD, registerHNTD } from '../../api/hntd/authAPI';
import styles from '../../assets/css/hntd/HNTDConsole.module.css';

const HNTDHome: React.FC = () => {
  const { login, isAuthenticated } = useHNTDAuth();
  const navigate = useNavigate();
  const [mode, setMode]         = useState<'login' | 'register'>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm,  setConfirm]  = useState('');
  const [error,    setError]    = useState('');

  if (isAuthenticated) navigate('/hntd-dashboard');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (mode === 'register') {
        if (password !== confirm) { setError('Passwords do not match.'); return; }
        const data = await registerHNTD(username, password);
        login(data.user, data.token);
      } else {
        const data = await loginHNTD(username, password);
        login(data.user, data.token);
      }
      navigate('/hntd-dashboard');
    } catch (err: any) {
      setError(err.message || 'Authentication failed.');
    }
  };

  return (
    <div className={styles.consoleBackground}>
      <div className={styles.consoleScreen}>
        <div className={styles.authContainer}>
          <p className={styles.authTitle}>
            {mode === 'login' ? '// EXPLORER ACCESS TERMINAL' : '// REGISTER NEW EXPLORER'}
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', width: '100%' }}>
            <input
              className={styles.authInput}
              type="text"
              placeholder="USERNAME"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
            <input
              className={styles.authInput}
              type="password"
              placeholder="PASSWORD"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            {mode === 'register' && (
              <input
                className={styles.authInput}
                type="password"
                placeholder="CONFIRM PASSWORD"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                required
              />
            )}
            {error && <p className={styles.authError}>{error}</p>}
            <button className={styles.authBtn} type="submit">
              {mode === 'login' ? '> AUTHENTICATE' : '> REGISTER'}
            </button>
          </form>

          <button className={styles.authToggle} onClick={() => { setMode(m => m === 'login' ? 'register' : 'login'); setError(''); }}>
            {mode === 'login' ? 'New explorer? Register here.' : 'Already registered? Sign in.'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HNTDHome;
