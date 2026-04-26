// File: client/src/pages/portfolio/SpaceCity.tsx

// React
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import StarBackground from '../../components/portfolio/common/StarBackground';
import ShootingStar from '../../components/portfolio/common/ShootingStar';

// Styles
import styles from '../../assets/css/portfolio/pageStyles/SpaceCity.module.css';

// ─── Data ────────────────────────────────────────────────────────────────────


interface Project {
  title: string;
  desc: string;
  tags: string[];
  github: string | null;
  live: string | null;
  route: string;
}

const PROJECTS: Project[] = [
  {
    title: 'How Not To Die',
    desc: 'A narrative survival game disguised as a space console — write explorer logs, survive alien planets, and uncover deep mysteries.',
    tags: ['React', 'TypeScript', 'Node.js'],
    github: 'https://github.com/alexis-menendez/HowNotToDieDemo',
    live: '/hntd-home',
    route: '/dontDie',
  },
  {
    title: 'InnerOrbit',
    desc: 'A cosmic wellness app where users log moods and create journal entries within a soothing visual galaxy.',
    tags: ['MERN', 'GraphQL', 'JWT'],
    github: 'https://github.com/alexis-menendez/Inner-Orbit',
    live: '/io-home',
    route: '/innerOrbit',
  },
  {
    title: 'Taskadelic',
    desc: 'A psychedelic Kanban board blending bullet journaling with hypnotic visuals to keep tasks flowing and focus high.',
    tags: ['React', 'Node.js', 'CSS'],
    github: 'https://github.com/alexis-menendez/Module-14-Taskadelic',
    live: '/td-home',
    route: '/taskadelic',
  },
  {
    title: 'Lattice',
    desc: 'A social platform for mycologists to share thoughts, reactions, and discoveries in a vibrant network of fungal minds.',
    tags: ['MERN', 'MongoDB', 'REST API'],
    github: 'https://github.com/alexis-menendez/Module-17-Lattice',
    live: null,
    route: '/lattice',
  },
  {
    title: 'The Solarium',
    desc: 'A whimsical digital library where users search, save, and annotate books in a sun-drenched, plant-filled sanctuary.',
    tags: ['React', 'Express', 'Google Books API'],
    github: 'https://github.com/alexis-menendez/Module-18-The-Solarium',
    live: null,
    route: '/solarium',
  },
  {
    title: 'Runestone Evaluation',
    desc: 'A fantasy-themed quiz app for learning programming concepts — rune-inscribed challenges guide aspiring developers through the fundamentals.',
    tags: ['JavaScript', 'MongoDB', 'Express'],
    github: 'https://github.com/alexis-menendez/Module-19-Runestone-Evaluation',
    live: null,
    route: '/runestone',
  },
];

const NAV_LINKS = ['About', 'Projects', 'Contact'] as const;

// ─── Component ───────────────────────────────────────────────────────────────

const SpaceCity: React.FC = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<string>('hero');

  useEffect(() => {
    document.documentElement.setAttribute('data-scrollbar', 'portfolio');
    return () => document.documentElement.removeAttribute('data-scrollbar');
  }, []);

  // ── Active-section observer ───────────────────────────────────────────────
  useEffect(() => {
    const sectionIds = ['hero', 'about', 'projects', 'contact'];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.4 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // ── Smooth-scroll helper ──────────────────────────────────────────────────
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div className={styles.page}>

      {/* Stars */}
      <div className={styles.stars} aria-hidden="true">
        <StarBackground />
        <ShootingStar />
      </div>

      {/* ── Nav ─────────────────────────────────────────────────────────── */}
      <nav className={styles.nav} aria-label="Primary navigation">
        <span className={styles.navLogo}>
          <span className={styles.navLogoMark}>✦</span> Portfolio
        </span>

        <ul className={styles.navLinks} role="list">
          {NAV_LINKS.map((label) => {
            const id = label.toLowerCase();
            const isActive = activeSection === id;
            return (
              <li key={label}>
                <button
                  className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
                  onClick={() => scrollTo(id)}
                  aria-current={isActive ? 'true' : undefined}
                >
                  {label}
                </button>
              </li>
            );
          })}

          <li>
            <button className={styles.navCta} onClick={() => scrollTo('contact')}>
              Hire Me
            </button>
          </li>
        </ul>
      </nav>

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section id="hero" className={`${styles.section} ${styles.hero}`}>
        {/* Atmospheric glows */}
        <div className={styles.blobLeft} aria-hidden="true" />
        <div className={styles.blobRight} aria-hidden="true" />

        {/* Decorative buildings — left side */}
        <img
          src="/assets/portfolio/images/art/BakcgroundTowers1.png"
          alt=""
          className={styles.heroBuildingMidLeft}
          aria-hidden="true"
          loading="eager"
        />
        <img
          src="/assets/portfolio/images/art/SoloTower2.png"
          alt=""
          className={styles.heroBuildingSoloLeft}
          aria-hidden="true"
          loading="eager"
        />

        {/* Decorative buildings — right side */}
        <img
          src="/assets/portfolio/images/art/TwoTowers.png"
          alt=""
          className={styles.heroBuildingTwoTowersRight}
          aria-hidden="true"
          loading="eager"
        />

        <img
          src="/assets/portfolio/images/art/BackgroundTowers3.png"
          alt=""
          className={styles.heroBuildingFarRight}
          aria-hidden="true"
          loading="eager"
        />

        {/* Content */}
        <div className={styles.heroInner}>
          <p className={styles.heroName}>Alexis Divina</p>
          <p className={styles.heroCreativeTitle}>Creative Developer &amp; Digital Artist</p>
          <h1 className={styles.heroHeading}>
            <span className={styles.heroHeadingLine}>Building</span>
            <span className={styles.heroHeadingGradient}>Digital Worlds</span>
            <span className={styles.heroHeadingLine}>That Inspire</span>
          </h1>

          <p className={styles.heroSub}>
            I build immersive web experiences where art meets code.
            Every pixel tells a story, every interaction sparks joy.
          </p>

          <div className={styles.heroButtons}>
            <button className={styles.btnPrimary} onClick={() => scrollTo('projects')}>
              View My Work
            </button>
            <button className={styles.btnGhost} onClick={() => scrollTo('contact')}>
              Let&apos;s Connect
            </button>
          </div>
        </div>
      </section>

      {/* ── About ───────────────────────────────────────────────────────── */}
      <section id="about" className={`${styles.section} ${styles.about}`}>
        <div className={styles.aboutGrid}>

          {/* Left column — building art */}
          <div className={styles.aboutImageCol}>
            <div className={styles.aboutOval1} aria-hidden="true" />
            <div className={styles.aboutOval2} aria-hidden="true" />
            <img
              src="/assets/portfolio/images/art/SoloTower1.png"
              alt=""
              className={styles.aboutBuilding}
              aria-hidden="true"
              loading="lazy"
            />
          </div>

          {/* Right column — text + skills */}
          <div className={styles.aboutContent}>
            <p className={styles.sectionEyebrow}>ABOUT ME</p>

            <h2 className={styles.sectionHeading}>
              Where <span className={styles.gradientWord}>Art</span> Meets Code
            </h2>

            <p className={styles.aboutBio}>
              I&apos;m a full-stack developer, and I built this site&apos;s assets by hand:
              cutting holographic paper into collages, photographing them, and adding
              the glowing outlines digitally. Art and engineering are the same problem
              to me, just different tools.
            </p>
            <p className={styles.aboutBio}>
              I&apos;m obsessed with the cosmos, endlessly curious, and convinced that
              the best interfaces feel alive, surprising, and a little bit magical.
              I don&apos;t just build features, I craft experiences.
            </p>

            {/* Currently Building With */}
            <p className={styles.sectionEyebrow}>Currently Building With</p>
            <div className={styles.techTags}>
              {['React', 'TypeScript', 'JavaScript', 'Node.js', 'Express.js',
                'MongoDB', 'GraphQL', 'CSS / Animation', 'REST APIs', 'JWT', 'Vite', 'Git'
              ].map((tech) => (
                <span key={tech} className={styles.techTag}>{tech}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Projects ────────────────────────────────────────────────────── */}
      <section id="projects" className={`${styles.section} ${styles.projects}`}>
        <div className={styles.projectsInner}>

          <div className={styles.projectsHeader}>
            <p className={styles.sectionEyebrow}>SELECTED WORK</p>
            <h2 className={styles.sectionHeading}>
              Projects That{' '}
              <span className={styles.gradientWord}>Push Boundaries</span>
            </h2>
          </div>

          <div className={styles.projectsGrid}>
            {PROJECTS.map((project) => (
              <div
                key={project.title}
                className={styles.card}
                onClick={() => navigate(project.route)}
                style={{ cursor: 'pointer' }}
              >
                <div className={styles.cardTop}>
                  <h3 className={styles.cardTitle}>{project.title}</h3>

                  <div className={styles.cardLinks}>
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.cardIconLink}
                        aria-label={`${project.title} GitHub repository`}
                        title="GitHub"
                        onClick={(e) => e.stopPropagation()}
                      >
                        ↗
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        className={styles.cardIconLink}
                        aria-label={`${project.title} live demo`}
                        title="Live"
                        onClick={(e) => e.stopPropagation()}
                      >
                        ↗
                      </a>
                    )}
                  </div>
                </div>

                <p className={styles.cardDesc}>{project.desc}</p>

                <div className={styles.cardTags}>
                  {project.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ─────────────────────────────────────────────────────── */}
      <section id="contact" className={`${styles.section} ${styles.contact}`}>
        <div className={styles.contactInner}>

          <p className={styles.sectionEyebrow}>GET IN TOUCH</p>

          <h2 className={styles.sectionHeading}>
            Let&apos;s Create Something{' '}
            <span className={styles.gradientWord}>Amazing</span>
          </h2>

          <p className={styles.contactParagraph}>
            I&apos;m always open to exciting projects, creative collaborations, and
            opportunities to push the boundaries of what&apos;s possible on the web.
          </p>

          <a
            href="mailto:menendez.alex.d@gmail.com"
            className={styles.contactBtn}
          >
            Say Hello
          </a>

          <div className={styles.socialRow}>
            <a
              href="https://github.com/alexis-menendez"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="GitHub"
            >
              <img
                src="/assets/portfolio/icons/footer/GitFooter.svg"
                alt="GitHub"
                className={styles.socialIcon}
              />
            </a>

            <a
              href="https://www.linkedin.com/in/alex-d-menendez/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="LinkedIn"
            >
              <img
                src="/assets/portfolio/icons/footer/LinkedinFooter.svg"
                alt="LinkedIn"
                className={styles.socialIcon}
              />
            </a>

            <a
              href="mailto:menendez.alex.d@gmail.com"
              className={styles.socialLink}
              aria-label="Email"
            >
              <img
                src="/assets/portfolio/icons/footer/EmailFooter.svg"
                alt="Email"
                className={styles.socialIcon}
              />
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default SpaceCity;
