// File: client/src/pages/taskadelic/TDLogin.tsx

import { useState, FormEvent, ChangeEvent } from 'react';
import Auth from '../../utils/taskadelic/auth';
import { login } from '../../api/taskadelic/authAPI';
import tdStyles from '../../assets/css/taskadelic/Taskadelic.module.css';

const TDLogin = () => {
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

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
            {showPassword ? 'show' : 'hide'}
          </button>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default TDLogin;
