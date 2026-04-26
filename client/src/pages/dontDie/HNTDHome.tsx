// File: client/src/pages/dontDie/HNTDHome.tsx

import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHNTDAuth } from '../../context/HNTDAuthContext';
import { loginHNTD, registerHNTD } from '../../api/dontDie/HNTDAuthAPI';
import styles from '../../assets/css/dontDie/HNTDConsole.module.css';

const WELCOME_LETTER = `Greetings, Explorer!

Welcome to Tö'tahli Naut Dy-in™ — where we aim, shoot, and occasionally hit the stars! If you're reading this message, congratulations: you've been enthusiastically selected to join our long-standing, definitely-regulated planetary exploration initiative.

Your mission is to document flora, fauna, glowing things of indeterminate danger, and — should you encounter locals — practicing your best non-hostile wave. Your findings will be added to the Survival Guide used by future and fellow explorers.

To aid you on your mission you've been equipped with a refurbished shuttle, the most up-to-date copy of our Survival Guide, and our flagship AI companion, VERA: the Voyager Environmental Response Algorithm. VERA has been optimized to assist you in your mission as well as programmed to fulfill all of your social needs on this solo mission!

So strap in, Commander. The galaxy awaits!`;

const HNTDHome: React.FC = () => {
  const { login, isAuthenticated } = useHNTDAuth();
  const navigate = useNavigate();
  const [mode,         setMode]         = useState<'login' | 'register'>('login');
  const [username,     setUsername]     = useState('');
  const [password,     setPassword]     = useState('');
  const [confirm,      setConfirm]      = useState('');
  const [error,        setError]        = useState('');
  const [showWelcome,  setShowWelcome]  = useState(false);
  const [pendingUser,  setPendingUser]  = useState<{ user: any; token: string } | null>(null);

  if (isAuthenticated) navigate('/hntd-dashboard');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (mode === 'register') {
        if (password !== confirm) { setError('Passwords do not match.'); return; }
        const data = await registerHNTD(username, password);
        setPendingUser({ user: data.user, token: data.token });
        setShowWelcome(true);
      } else {
        const data = await loginHNTD(username, password);
        login(data.user, data.token);
        navigate('/hntd-dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed.');
    }
  };

  const handleWelcomeContinue = () => {
    if (pendingUser) {
      login(pendingUser.user, pendingUser.token);
      navigate('/hntd-dashboard');
    }
  };

  if (showWelcome) {
    return (
      <div className={styles.consoleBackground}>
        <div className={styles.consoleScreen}>
          <div className={styles.authContainer}>
            <p className={styles.authTitle}>// WELCOME, EXPLORER</p>
            <div style={{
              maxWidth: '320px', textAlign: 'left',
              fontFamily: 'Courier New', fontSize: 'clamp(0.65rem, 1.4vmin, 0.82rem)',
              color: '#00ffe1', lineHeight: 1.7, whiteSpace: 'pre-line',
              overflowY: 'auto', maxHeight: '55%',
            }}>
              {WELCOME_LETTER}
            </div>
            <button className={styles.authBtn} onClick={handleWelcomeContinue}>
              &gt; ENTER THE SHIP TERMINAL
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.consoleBackground}>
      <div className={styles.consoleScreen}>
        <div className={styles.authContainer}>
          <p className={styles.authTitle}>
            {mode === 'login' ? '// EXPLORER ACCESS TERMINAL' : '// REGISTER NEW EXPLORER'}
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', width: '100%' }}>
            <input className={styles.authInput} type="text" placeholder="USERNAME" value={username} onChange={e => setUsername(e.target.value)} required />
            <input className={styles.authInput} type="password" placeholder="PASSWORD" value={password} onChange={e => setPassword(e.target.value)} required />
            {mode === 'register' && (
              <input className={styles.authInput} type="password" placeholder="CONFIRM PASSWORD" value={confirm} onChange={e => setConfirm(e.target.value)} required />
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
