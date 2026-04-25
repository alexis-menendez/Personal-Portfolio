// File: client/src/pages/portfolio/InnerOrbit.tsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StarBackground from '../../components/portfolio/common/StarBackground';
import ShootingStar from '../../components/portfolio/common/ShootingStar';
import IOMainLayoutBackground from '../../components/innerOrbit/layout/IOmainLayout/IOMainLayoutBackground';
import styles from '../../assets/css/portfolio/pageStyles/ProjectDetail.module.css';

const SCREENSHOTS = [
  { src: '/assets/portfolio/images/gallery/innerOrbit/home.webp',                label: 'Home' },
  { src: '/assets/portfolio/images/gallery/innerOrbit/dashboard.webp',           label: 'Dashboard' },
  { src: '/assets/portfolio/images/gallery/innerOrbit/journal-galaxy.webp',      label: 'Journal Galaxy' },
  { src: '/assets/portfolio/images/gallery/innerOrbit/journal-notebook.webp',    label: 'Journal Entry' },
  { src: '/assets/portfolio/images/gallery/innerOrbit/tracker.webp',             label: 'Mood Tracker' },
  { src: '/assets/portfolio/images/gallery/innerOrbit/timer.webp',               label: 'Focus Timer' },
];

const TECH = ['React', 'TypeScript', 'Node.js', 'Express.js', 'MongoDB', 'GraphQL', 'JWT', 'CSS / Animation'];

const InnerOrbit: React.FC = () => {
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
    <div className={styles.page}>
      <div className={styles.stars}>
        <StarBackground />
        <ShootingStar />
        <IOMainLayoutBackground />
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
        <h1 className={styles.title}>InnerOrbit</h1>
        <p className={styles.description}>
          A space-themed mental wellness app built with the MERN stack. Users track their moods,
          write journal entries, and watch them become stars in a personal constellation — all
          within a calm, immersive cosmic interface.
        </p>

        <div className={styles.tags}>
          {TECH.map(t => <span key={t} className={styles.tag}>{t}</span>)}
        </div>

        <div className={styles.actions}>
          <button className={styles.btnPrimary} onClick={() => navigate('/io-home')}>
            Launch Demo
          </button>
          <a
            className={styles.btnGhost}
            href="https://github.com/alexis-menendez/Inner-Orbit"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub ↗
          </a>
          <a
            className={styles.btnGhost}
            href="https://docs.google.com/document/d/1K9LzRR68QS5rKAFtXKpg2JLLScKgCeq1-FQufrgHPsQ/edit?tab=t.m171kj9l8bu"
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

export default InnerOrbit;
