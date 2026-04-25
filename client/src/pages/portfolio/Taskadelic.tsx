// File: client/src/pages/portfolio/Taskadelic.tsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../assets/css/portfolio/pageStyles/ProjectDetail.module.css';

const SCREENSHOTS = [
  { src: '/assets/portfolio/images/gallery/taskadelic/DesktopHome.webp',   label: 'Home' },
  { src: '/assets/portfolio/images/gallery/taskadelic/DesktopLogin.webp',  label: 'Login' },
  { src: '/assets/portfolio/images/gallery/taskadelic/DesktopBoard.webp',  label: 'Board' },
  { src: '/assets/portfolio/images/gallery/taskadelic/DesktopTicket.webp', label: 'Ticket' },
  { src: '/assets/portfolio/images/gallery/taskadelic/DesktopEdit.webp',   label: 'Edit Ticket' },
  { src: '/assets/portfolio/images/gallery/taskadelic/MobileHome.webp',    label: 'Mobile Home' },
  { src: '/assets/portfolio/images/gallery/taskadelic/MobileBoard.webp',   label: 'Mobile Board' },
  { src: '/assets/portfolio/images/gallery/taskadelic/MobileTicket.webp',  label: 'Mobile Ticket' },
];

const TECH = ['React', 'TypeScript', 'Node.js', 'Express.js', 'PostgreSQL', 'Sequelize', 'JWT', 'CSS'];

const Taskadelic: React.FC = () => {
  const navigate = useNavigate();
  const [lightbox, setLightbox] = useState<{ src: string; label: string } | null>(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-scrollbar', 'innerOrbit');
    return () => document.documentElement.removeAttribute('data-scrollbar');
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightbox(null); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <div className={`${styles.page} ${styles.pageTaskadelic}`}>
      {/* Nav */}
      <nav className={styles.nav}>
        <button className={styles.navBack} onClick={() => navigate('/home')}>
          ← Back
        </button>
      </nav>

      {/* Hero */}
      <section className={`${styles.hero} ${styles.heroTaskadelic}`}>

        {/* Art deco corner brackets */}
        <span className={styles.cornerTL} aria-hidden="true" />
        <span className={styles.cornerTR} aria-hidden="true" />
        <span className={styles.cornerBL} aria-hidden="true" />
        <span className={styles.cornerBR} aria-hidden="true" />

        <p className={styles.eyebrow}>Project</p>

        {/* Art deco ornament — full width, above title */}
        <svg className={styles.artDecoOrnament} viewBox="0 0 800 44" preserveAspectRatio="none" aria-hidden="true">
          {/* Outer lines — full span */}
          <line x1="0" y1="4"  x2="800" y2="4"  stroke="#bf5fff" strokeWidth="0.5" opacity="0.25" />
          <line x1="0" y1="40" x2="800" y2="40" stroke="#bf5fff" strokeWidth="0.5" opacity="0.25" />
          {/* Main lines left */}
          <line x1="0" y1="14" x2="330" y2="14" stroke="#ff61d2" strokeWidth="0.9" opacity="0.6" />
          <line x1="0" y1="22" x2="330" y2="22" stroke="#ff61d2" strokeWidth="1.2" opacity="0.75" />
          <line x1="0" y1="30" x2="330" y2="30" stroke="#ff61d2" strokeWidth="0.9" opacity="0.6" />
          {/* Left ticks */}
          <line x1="60"  y1="8"  x2="60"  y2="36" stroke="#ff61d2" strokeWidth="0.5" opacity="0.35" />
          <line x1="120" y1="8"  x2="120" y2="36" stroke="#ff61d2" strokeWidth="0.5" opacity="0.35" />
          <line x1="180" y1="8"  x2="180" y2="36" stroke="#ff61d2" strokeWidth="0.5" opacity="0.35" />
          {/* Left chevrons */}
          <polyline points="342,8 356,22 342,36" fill="none" stroke="#ff61d2" strokeWidth="1.1" opacity="0.75" />
          <polyline points="354,8 368,22 354,36" fill="none" stroke="#ff61d2" strokeWidth="0.8" opacity="0.5" />
          {/* Center diamond */}
          <polygon points="400,6 424,22 400,38 376,22" fill="none"    stroke="#ff61d2" strokeWidth="1.2" opacity="0.9"  />
          <polygon points="400,12 418,22 400,32 382,22" fill="#ff61d2" opacity="0.18" />
          <circle cx="400" cy="22" r="3" fill="#ff61d2" opacity="0.9" />
          {/* Right chevrons */}
          <polyline points="458,8 444,22 458,36" fill="none" stroke="#ff61d2" strokeWidth="0.8" opacity="0.5" />
          <polyline points="446,8 432,22 446,36" fill="none" stroke="#ff61d2" strokeWidth="1.1" opacity="0.75" />
          {/* Main lines right */}
          <line x1="470" y1="14" x2="800" y2="14" stroke="#ff61d2" strokeWidth="0.9" opacity="0.6"  />
          <line x1="470" y1="22" x2="800" y2="22" stroke="#ff61d2" strokeWidth="1.2" opacity="0.75" />
          <line x1="470" y1="30" x2="800" y2="30" stroke="#ff61d2" strokeWidth="0.9" opacity="0.6"  />
          {/* Right ticks */}
          <line x1="740" y1="8" x2="740" y2="36" stroke="#ff61d2" strokeWidth="0.5" opacity="0.35" />
          <line x1="680" y1="8" x2="680" y2="36" stroke="#ff61d2" strokeWidth="0.5" opacity="0.35" />
          <line x1="620" y1="8" x2="620" y2="36" stroke="#ff61d2" strokeWidth="0.5" opacity="0.35" />
        </svg>

        <h1 className={`${styles.title} ${styles.titleTaskadelic}`}>Taskadelic</h1>
        <p className={styles.description}>
          A psychedelic Kanban board that transforms task management into a vibrant, sensory
          experience. Part planner, part mood-board — Taskadelic makes staying organized feel
          like a creative act rather than a chore.
        </p>

        <div className={styles.tags}>
          {TECH.map(t => <span key={t} className={styles.tag}>{t}</span>)}
        </div>

        <div className={styles.actions}>
          <button className={styles.btnComingSoon} disabled>
            Demo Coming Soon
          </button>
          <a
            className={styles.btnGhost}
            href="https://github.com/alexis-menendez/Module-14-Taskadelic"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub ↗
          </a>
        </div>
      </section>

      {/* Art deco section divider */}
      <svg className={styles.artDecoDivider} viewBox="0 0 800 32" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <line x1="0"   y1="16" x2="330" y2="16" stroke="#bf5fff" strokeWidth="0.7" opacity="0.4" />
        <line x1="0"   y1="11" x2="300" y2="11" stroke="#bf5fff" strokeWidth="0.35" opacity="0.2" />
        <line x1="0"   y1="21" x2="300" y2="21" stroke="#bf5fff" strokeWidth="0.35" opacity="0.2" />
        <polyline points="334,4 346,16 334,28" fill="none" stroke="#ff61d2" strokeWidth="0.9" opacity="0.6" />
        <polyline points="344,4 356,16 344,28" fill="none" stroke="#ff61d2" strokeWidth="0.9" opacity="0.45"/>
        <polygon points="400,2 420,16 400,30 380,16" fill="none" stroke="#ff61d2" strokeWidth="1.1" opacity="0.85" />
        <polygon points="400,8 414,16 400,24 386,16" fill="#ff61d2" opacity="0.15" />
        <circle cx="400" cy="16" r="2.5" fill="#ff61d2" opacity="0.9" />
        <polyline points="456,4 444,16 456,28" fill="none" stroke="#ff61d2" strokeWidth="0.9" opacity="0.45"/>
        <polyline points="466,4 454,16 466,28" fill="none" stroke="#ff61d2" strokeWidth="0.9" opacity="0.6" />
        <line x1="470" y1="16" x2="800" y2="16" stroke="#bf5fff" strokeWidth="0.7" opacity="0.4" />
        <line x1="500" y1="11" x2="800" y2="11" stroke="#bf5fff" strokeWidth="0.35" opacity="0.2" />
        <line x1="500" y1="21" x2="800" y2="21" stroke="#bf5fff" strokeWidth="0.35" opacity="0.2" />
      </svg>

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

export default Taskadelic;
