// File: client/src/pages/portfolio/Taskadelic.tsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StarBackground from '../../components/portfolio/common/StarBackground';
import ShootingStar from '../../components/portfolio/common/ShootingStar';
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
    document.documentElement.setAttribute('data-scrollbar', 'taskadelic');
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
