// File: client/src/components/innerOrbit/home/LoginForm.tsx

import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

// Auth
import { AuthContext } from '../../../context/authContext';

// GraphQL
import { LOGIN_USER } from '../../../graphql/mutations';

// Styles
import { motion } from 'framer-motion';
import formStyles from '../../../../../assets/css/innerOrbit/common/Form.module.css';
import buttonStyles from '../../../../../assets/css/innerOrbit/common/Button.module.css';
import logoStyles from '../../../../../assets/css/innerOrbit/common/Logo.module.css';


const Login = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error('AuthContext is undefined. Ensure AuthProvider is wrapping your component tree.');
  }
  const { login } = authContext;
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: '',
    password: '',
  });

  const [loginUser] = useMutation(LOGIN_USER);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const { data } = await loginUser({
        variables: {
          username: form.username,
          password: form.password,
        },
      });

      if (data?.loginUser?.token && data?.loginUser?.user) {
        const { _id, username, email } = data.loginUser.user;
        login({ id: _id, username, email }, data.loginUser.token);
        navigate('/dashboard');
      } else {
        alert('Login failed.');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('Something went wrong during login.');
    }
  };

  return (
    <section className={formStyles.authSection}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={formStyles.authContainer}
      >
        <h1 className={logoStyles.title}>
          <span className={logoStyles.titleInner}>inner</span>
          <span className={logoStyles.titleOrbit}>Orbit</span>
        </h1>

        <div className={formStyles.formContainer}>
          <input
            type="text"
            id="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className={formStyles.input}
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className={formStyles.input}
          />
          <button
            onClick={handleLogin}
            className={`${buttonStyles.button} ${buttonStyles.primary}`}
          >
            Login
          </button>
            <p className={formStyles.linkText}>
              Don’t have an account? <Link to="/register" className={formStyles.link}>Sign up</Link>
            </p>
        </div>
      </motion.div>
    </section>
  );
};

export default Login;
