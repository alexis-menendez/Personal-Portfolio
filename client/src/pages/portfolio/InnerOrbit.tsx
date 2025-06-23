// File: client/src/pages/portfolio/InnerOrbit.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../assets/css/portfolio/pageStyles/Projects.module.css';

const innerOrbitLinks = [
  {
    name: "Deployed App",
    description: "Explore the live InnerOrbit wellness app, featuring mood journaling, mood tracking, and meditation guides.",
    image: "/assets/portfolio/icons/deployed/DeployedBlue.png",
    link: "/io-home", // internal route
    isInternal: true,
    newTab: true, // added to indicate open in new tab
    imageLeft: false,
  },
  {
    name: "GitHub",
    description: "View the full source code for the InnerOrbit MERN stack application on GitHub.",
    image: "/assets/portfolio/icons/git/GitBlue.png",
    link: "https://github.com/alexis-menendez/Personal-Portfolio",
    isInternal: false,
    imageLeft: true,
  },
  {
    name: "Documentation",
    description: "Detailed design documentation and technical breakdown of InnerOrbit, including features, architecture, and development notes.",
    image: "/assets/portfolio/icons/documentation/DocumentationBlue.png",
    link: "https://docs.google.com/document/d/1K9LzRR68QS5rKAFtXKpg2JLLScKgCeq1-FQufrgHPsQ/edit?tab=t.m171kj9l8bu",
    isInternal: false,
    imageLeft: false,
  },
  {
    name: "Gallery",
    description: "Visual highlights and screenshots showcasing the InnerOrbit user experience.",
    image: "/assets/portfolio/icons/innerOrbit/InnerOrbitBlue.png",
    link: "/gallery", // internal route
    isInternal: false, // default to false until implemented
    imageLeft: true,
  },
];

const InnerOrbit: React.FC = () => {
  return (
    <>
      <div className={styles.textSection}>
        <h1 className={styles.heading}>InnerOrbit</h1>
        <p className={styles.paragraph}>
          InnerOrbit is a space-themed mental health journaling tool built with the MERN stack. 
          It allows users to track moods, write entries, and explore constellations — all within a calm, immersive interface.
        </p>
      </div>

      <div className={styles.projectGrid}>
        {innerOrbitLinks.map((section, index) => {
          const cardContent = (
            <>
              {section.imageLeft && (
                <div className={styles.imageBox}>
                  <img src={section.image} alt={`${section.name} icon`} />
                </div>
              )}

              <div className={section.imageLeft ? styles.rightText : styles.leftText}>
                <h2>{section.name}</h2>
                <p>{section.description}</p>
                <button className={styles.button}>View Project</button>
              </div>

              {!section.imageLeft && (
                <div className={styles.imageBox}>
                  <img src={section.image} alt={`${section.name} icon`} />
                </div>
              )}
            </>
          );

          // Open in new tab if specified (even if internal)
          if (section.newTab) {
            return (
              <a
                key={index}
                href={section.link}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.card}
              >
                {cardContent}
              </a>
            );
          }

          // Internal links (same tab)
          if (section.isInternal) {
            return (
              <Link key={index} to={section.link} className={styles.card}>
                {cardContent}
              </Link>
            );
          }

          // External links (new tab)
          return (
            <a
              key={index}
              href={section.link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.card}
            >
              {cardContent}
            </a>
          );
        })}
      </div>
    </>
  );
};

export default InnerOrbit;

