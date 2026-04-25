// File: client/src/pages/portfolio/DontDie.tsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StarBackground from '../../components/portfolio/common/StarBackground';
import ShootingStar from '../../components/portfolio/common/ShootingStar';
import styles from '../../assets/css/portfolio/pageStyles/ProjectDetail.module.css';

const SCREENSHOTS = [
  { src: '/assets/portfolio/images/gallery/dontDie/DontDieLogin.webp', label: 'Login' },
];

const TECH = ['React', 'JavaScript', 'Node.js', 'Express.js', 'PostgreSQL', 'Sequelize', 'JWT', 'CSS Modules', 'OpenWeatherMap API'];

const DontDie: React.FC = () => {
  const navigate = useNavigate();
  const [lightbox, setLightbox] = useState<{ src: string; label: string } | null>(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-scrollbar', 'dontDie');
    return () => document.documentElement.removeAttribute('data-scrollbar');
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightbox(null); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <div className={`${styles.page} ${styles.pageDontDie}`}>
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
        <h1 className={`${styles.title} ${styles.titleDontDie}`}>How Not To Die</h1>
        <p className={styles.description}>
          A satirical sci-fi survival guide set in a mysterious alien universe.
          Designed like a malfunctioning space console, it immerses users in interactive planetary
          exploration, cryptic explorer logs, collaborative survival guides, and a narrative AI
          companion named VERA who may or may not be losing her mind.
        </p>

        <div className={styles.tags}>
          {TECH.map(t => <span key={t} className={`${styles.tag} ${styles.tagDontDie}`}>{t}</span>)}
        </div>

        <div className={styles.actions}>
          <button className={`${styles.btnPrimary} ${styles.btnPrimaryDontDie}`} disabled style={{ cursor: 'not-allowed', opacity: 0.5 }}>
            Demo Coming Soon
          </button>
          <a
            className={styles.btnGhost}
            href="https://github.com/alexis-menendez/HowNotToDieDemo"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub ↗
          </a>
          <a
            className={styles.btnGhost}
            href="https://docs.google.com/document/d/1lG3wGpQglw6aqWl2WG_FtDNSuud-BfDb08JUTFICkO8/edit?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
          >
            Docs ↗
          </a>
        </div>
      </section>

      {/* Screenshots */}
      <section className={styles.screenshots}>
        <p className={styles.sectionEyebrow}>Screenshots</p>
        <div className={styles.screenshotGrid}>
          {SCREENSHOTS.map(s => (
            <div key={s.label} className={styles.screenshotCard} onClick={() => setLightbox(s)} style={{ cursor: 'pointer' }}>
              <img src={s.src} alt={s.label} className={styles.screenshotImg} loading="lazy" />
              <span className={styles.screenshotLabel}>{s.label}</span>
            </div>
          ))}
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

export default DontDie;
