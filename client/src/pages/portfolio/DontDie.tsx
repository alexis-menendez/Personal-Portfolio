// File: client/src/pages/portfolio/DontDie.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../assets/css/portfolio/pageStyles/Projects.module.css';

const dontDieLinks = [
  {
    name: "Deployed App",
    description: "Coming Soon!",
    image: "/assets/portfolio/icons/deployed/DeployedTeal.svg",
    link: "#",
    isInternal: false,
    newTab: false,
    imageLeft: false,
  },
  {
    name: "GitHub",
    description: "View the full source code for the How Not to Die survival sim demo on GitHub.",
    image: "/assets/portfolio/icons/git/GitTeal.svg",
    link: "https://github.com/alexis-menendez/HowNotToDieDemo",
    isInternal: false,
    newTab: true,
    imageLeft: true,
  },
  {
    name: "Documentation",
    description: "Detailed design documentation and technical breakdown of How Not To Die, including features, architecture, and development notes.",
    image: "/assets/portfolio/icons/documentation/DocumentationTeal.svg",
    link: "https://docs.google.com/document/d/1lG3wGpQglw6aqWl2WG_FtDNSuud-BfDb08JUTFICkO8/edit?usp=sharing",
    isInternal: false,
    newTab: true,
    imageLeft: false,
  },
  {
    name: "Gallery",
    description: "Visual highlights and screenshots showcasing the How Not To Die user experience.",
    image: "/assets/portfolio/icons/dontDie/DontDieTeal.svg",
    link: "/gallery", // internal route
    isInternal: true,
    newTab: false,
    imageLeft: true,
  },
];

const DontDie: React.FC = () => {
  return (
    <>
      <div className={styles.textSection}>
        <h1 className={styles.heading}>How Not To Die</h1>
        <p className={styles.paragraph}>
          How Not to Die is a satirical sci-fi survival guide set in a mysterious alien universe. 
          Designed like a malfunctioning console interface, the experience immerses users in interactive planetary exploration, 
          cryptic logs, and quirky diagnostics—all wrapped in a grim but humorous tone.
        </p>
      </div>

      <div className={styles.projectGrid}>
        {dontDieLinks.map((section, index) => {
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

          if (section.isInternal) {
            return (
              <Link key={index} to={section.link} className={styles.card}>
                {cardContent}
              </Link>
            );
          }

          return (
            <a key={index} href={section.link} className={styles.card}>
              {cardContent}
            </a>
          );
        })}
      </div>
    </>
  );
};

export default DontDie;
