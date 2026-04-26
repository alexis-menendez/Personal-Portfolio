// File: client/src/pages/dontDie/HNTDThankYou.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHNTDAuth } from '../../context/HNTDAuthContext';

const HNTDThankYou: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useHNTDAuth();
  const [feedback, setFeedback] = useState('');
  const [sent,     setSent]     = useState(false);

  const handleSend = () => {
    if (!feedback.trim()) return;
    const subject = encodeURIComponent('How Not To Die Demo — Feedback');
    const body    = encodeURIComponent(feedback.trim());
    window.open(`mailto:alexis.246.menendez@gmail.com?subject=${subject}&body=${body}`);
    setSent(true);
  };

  const handleReturn = () => {
    logout();
    navigate('/home');
  };

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
        }}>
          // SEND FEEDBACK
        </p>

        {!sent ? (
          <>
            <textarea
              value={feedback}
              onChange={e => setFeedback(e.target.value)}
              placeholder="Your feedback..."
              rows={5}
              style={{
                width: '100%', boxSizing: 'border-box',
                background: 'rgba(0,255,225,0.04)',
                border: '1px solid rgba(0,255,225,0.3)',
                borderRadius: 4, color: '#00ffe1',
                fontFamily: 'Courier New, monospace',
                fontSize: 'clamp(0.72rem, 1.4vmin, 0.85rem)',
                padding: '0.6rem 0.75rem', resize: 'vertical',
                outline: 'none',
              }}
            />
            <button
              onClick={handleSend}
              disabled={!feedback.trim()}
              style={{
                alignSelf: 'flex-start',
                fontFamily: 'Courier New, monospace',
                fontSize: 'clamp(0.7rem, 1.3vmin, 0.82rem)',
                letterSpacing: '0.08em',
                color: feedback.trim() ? '#00ffe1' : 'rgba(0,255,225,0.3)',
                background: 'transparent',
                border: `1px solid ${feedback.trim() ? 'rgba(0,255,225,0.5)' : 'rgba(0,255,225,0.15)'}`,
                padding: '0.35rem 0.85rem',
                cursor: feedback.trim() ? 'pointer' : 'default',
                transition: 'all 0.2s',
              }}
            >
              [ Send Feedback ]
            </button>
          </>
        ) : (
          <p style={{
            fontFamily: 'Courier New, monospace',
            fontSize: 'clamp(0.7rem, 1.4vmin, 0.85rem)',
            color: '#ffdd00', letterSpacing: '0.06em',
          }}>
            ▸ Your email client should have opened. Thank you.
          </p>
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
