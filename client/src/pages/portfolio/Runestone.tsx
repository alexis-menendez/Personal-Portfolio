// File: client/src/pages/portfolio/Runestone.tsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StarBackground from '../../components/portfolio/common/StarBackground';
import ShootingStar from '../../components/portfolio/common/ShootingStar';
import styles from '../../assets/css/portfolio/pageStyles/ProjectDetail.module.css';

const TECH = ['JavaScript', 'Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'REST API'];

const Runestone: React.FC = () => {
  const navigate = useNavigate();
  const [lightbox, setLightbox] = useState<{ src: string; label: string } | null>(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-scrollbar', 'portfolio');
    return () => document.documentElement.removeAttribute('data-scrollbar');
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightbox(null); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <div className={`${styles.page} ${styles.pageRunestone}`}>
      <div className={styles.stars}>
        <StarBackground />
        <ShootingStar />
      </div>

      {/* Nav */}
      <nav className={styles.nav}>
        <button className={styles.navBack} onClick={() => navigate('/home')}>
          ← Back
        </button>
      </nav>

      {/* Hero */}
      <section className={styles.hero}>
        <p className={styles.eyebrow}>Project</p>
        <h1 className={`${styles.title} ${styles.titleRunestone}`}>Runestone Evaluation</h1>
        <p className={styles.description}>
          A fantasy-themed quiz application for learning programming concepts. Users work through categorized
          challenges rendered as rune-inscribed trials — covering topics from fundamentals to advanced patterns —
          with results tracked and visualized in a mystical interface. Built with JavaScript and MongoDB, it
          pairs playful fantasy aesthetics with a genuine educational purpose.
        </p>

        <div className={styles.tags}>
          {TECH.map(t => <span key={t} className={`${styles.tag} ${styles.tagRunestone}`}>{t}</span>)}
        </div>

        <div className={styles.actions}>
          <button
            className={styles.btnPrimary}
            disabled
            style={{ cursor: 'not-allowed', opacity: 0.5 }}
          >
            Demo Coming Soon
          </button>
          <a
            className={styles.btnGhost}
            href="https://github.com/alexis-menendez/Module-19-Runestone-Evaluation"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub ↗
          </a>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div className={styles.lightboxOverlay} onClick={() => setLightbox(null)}>
          <img src={lightbox.src} alt={lightbox.label} className={styles.lightboxImg} />
          <span className={styles.lightboxLabel}>{lightbox.label}</span>
        </div>
      )}
    </div>
  );
};

export default Runestone;
