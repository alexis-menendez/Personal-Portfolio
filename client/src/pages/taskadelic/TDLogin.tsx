// File: client/src/pages/taskadelic/TDLogin.tsx

import { useState, FormEvent, ChangeEvent, useRef } from 'react';
import Auth from '../../utils/taskadelic/TDAuth';
import { login } from '../../api/taskadelic/TDAuthAPI';
import tdStyles from '../../assets/css/taskadelic/TDTaskadelic.module.css';

const TDLogin = () => {
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showHelp, setShowHelp]         = useState(false);
  const helpRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await login(loginData);
      Auth.login(data.token);
    } catch (err) {
      console.error('Login failed:', err);
      alert('Invalid username or password.');
    }
  };

  return (
    <div className={tdStyles.loginContainer}>
      <form className={tdStyles.loginForm} onSubmit={handleSubmit}>
        <h1 className={tdStyles.formTitle}>Login</h1>
        <label>Username</label>
        <input type="text"     name="username" value={loginData.username} onChange={handleChange} />
        <label>Password</label>
        <div className={tdStyles.passwordWrapper}>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={loginData.password}
            onChange={handleChange}
          />
          <button
            type="button"
            className={tdStyles.passwordToggle}
            onClick={() => setShowPassword(prev => !prev)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? 'hide' : 'show'}
          </button>
        </div>
        <button type="submit">Login</button>

        {/* Help hint */}
        <div
          ref={helpRef}
          className={tdStyles.helpWrapper}
          onMouseEnter={() => setShowHelp(true)}
          onMouseLeave={() => setShowHelp(false)}
        >
          <span className={tdStyles.helpTrigger}>Need help signing in?</span>
          {showHelp && (
            <div className={tdStyles.helpTooltip}>
              <p>If this were a live app, clicking here would let you reset your password.</p>
              <p>For this demo, sign in with:</p>
              <p><strong>demo</strong> / demo1234</p>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default TDLogin;
