// File: client/src/pages/dontDie/HNTDThankYou.tsx

// ── Imports ────────────────────────────────────────────────────
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHNTDAuth } from '../../context/HNTDAuthContext';

// ── Shared input style — used for all feedback form fields ─────
const inputStyle: React.CSSProperties = {
  width: '100%',
  boxSizing: 'border-box',
  background: 'rgba(0,255,225,0.04)',
  border: '1px solid rgba(0,255,225,0.3)',
  borderRadius: 4,
  color: '#00ffe1',
  fontFamily: 'Courier New, monospace',
  fontSize: 'clamp(0.72rem, 1.4vmin, 0.85rem)',
  padding: '0.6rem 0.75rem',
  outline: 'none',
};

// ── Component ──────────────────────────────────────────────────
const HNTDThankYou: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useHNTDAuth();

  // ── Local state ────────────────────────────────────────────────
  const [name,     setName]     = useState('');
  const [email,    setEmail]    = useState('');
  const [feedback, setFeedback] = useState('');
  const [status,   setStatus]   = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const canSubmit = name.trim() && email.trim() && feedback.trim() && status === 'idle';

  // ── Send handler — POSTs feedback to the backend ──────────────
  const handleSend = async () => {
    if (!canSubmit) return;
    setStatus('sending');
    try {
      const res = await fetch('/hntd/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), feedback: feedback.trim() }),
      });
      setStatus(res.ok ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  };

  // ── Return handler — logs the explorer out and returns to portfolio ──
  const handleReturn = () => {
    logout();
    navigate('/home');
  };

  // ── Render ─────────────────────────────────────────────────────
  return (
    <div style={{
      minHeight: '100vh', width: '100vw',
      background: '#000',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '2rem',
      boxSizing: 'border-box',
    }}>
      <p style={{
        fontFamily: 'Orbitron, sans-serif',
        fontSize: 'clamp(1rem, 3vmin, 1.6rem)',
        color: '#00ffe1', letterSpacing: '0.12em',
        textAlign: 'center', marginBottom: '2.5rem',
        maxWidth: 560,
      }}>
        Thank you for playing the How Not To Die Demo
      </p>

      <div style={{ width: '100%', maxWidth: 480, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <p style={{
          fontFamily: 'Courier New, monospace', fontSize: 'clamp(0.7rem, 1.4vmin, 0.85rem)',
          color: 'rgba(0,255,225,0.6)', letterSpacing: '0.06em',
          marginBottom: '0.25rem',
        }}>
          // SEND FEEDBACK
        </p>

        {status === 'sent' ? (
          <p style={{
            fontFamily: 'Courier New, monospace',
            fontSize: 'clamp(0.7rem, 1.4vmin, 0.85rem)',
            color: '#ffdd00', letterSpacing: '0.06em',
          }}>
            ▸ Thank you for your feedback.
          </p>
        ) : (
          <>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Your name"
              style={inputStyle}
            />
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Your email address"
              style={inputStyle}
            />
            <textarea
              value={feedback}
              onChange={e => setFeedback(e.target.value)}
              placeholder="Your feedback..."
              rows={5}
              style={{ ...inputStyle, resize: 'vertical' }}
            />
            {status === 'error' && (
              <p style={{
                fontFamily: 'Courier New, monospace',
                fontSize: 'clamp(0.7rem, 1.4vmin, 0.85rem)',
                color: '#ff4d4d', letterSpacing: '0.06em',
              }}>
                ▸ Something went wrong. Please try again.
              </p>
            )}
            <button
              onClick={handleSend}
              disabled={!canSubmit}
              style={{
                alignSelf: 'flex-start',
                fontFamily: 'Courier New, monospace',
                fontSize: 'clamp(0.7rem, 1.3vmin, 0.82rem)',
                letterSpacing: '0.08em',
                color: canSubmit ? '#00ffe1' : 'rgba(0,255,225,0.3)',
                background: 'transparent',
                border: `1px solid ${canSubmit ? 'rgba(0,255,225,0.5)' : 'rgba(0,255,225,0.15)'}`,
                padding: '0.35rem 0.85rem',
                cursor: canSubmit ? 'pointer' : 'default',
                transition: 'all 0.2s',
              }}
            >
              {status === 'sending' ? '[ Sending... ]' : '[ Send Feedback ]'}
            </button>
          </>
        )}
      </div>

      <button
        onClick={handleReturn}
        style={{
          marginTop: '3rem',
          fontFamily: 'Courier New, monospace',
          fontSize: 'clamp(0.72rem, 1.4vmin, 0.85rem)',
          letterSpacing: '0.1em',
          color: '#00ffe1',
          background: 'transparent',
          border: '1px solid rgba(0,255,225,0.4)',
          padding: '0.5rem 1.2rem',
          cursor: 'pointer',
          transition: 'background 0.2s',
        }}
        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,255,225,0.08)')}
        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
      >
        [ Return to Portfolio Website ]
      </button>
    </div>
  );
};

export default HNTDThankYou;
