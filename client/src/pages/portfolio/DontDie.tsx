// File: client/src/pages/portfolio/DontDie.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../assets/css/portfolio/pageStyles/Projects.module.css';

const DontDieLinks = [
  {
    name: "Gallery",
    description: "Coming Soon!",
    image: "/assets/portfolio/icons/dontDie/DontDieTeal.png",
    link: "#",  // Internal route placeholder
    isInternal: false, // default to false until implemented
    imageLeft: false,
  },
  {
    name: "GitHub",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/assets/portfolio/icons/git/GitTeal.png",
    link: "https://github.com/alexis-menendez/HowNotToDieDemo",
    isInternal: false,
    imageLeft: true,
  },
  {
    name: "Documentation",
    description: "NEED TO REPLACE WITH CORRECT LINK.",
    image: "/assets/portfolio/icons/documentation/DocumentationTeal.png",
    link: "https://docs.google.com/document/d/1K9LzRR68QS5rKAFtXKpg2JLLScKgCeq1-FQufrgHPsQ/edit?tab=t.m171kj9l8bu",
    isInternal: false,
    imageLeft: false,
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
        {DontDieLinks.map((section, index) => {
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

          return section.isInternal ? (
            <Link key={index} to={section.link} className={styles.card}>
              {cardContent}
            </Link>
          ) : (
            <a key={index} href={section.link} target="_blank" rel="noopener noreferrer" className={styles.card}>
              {cardContent}
            </a>
          );
        })}
      </div>
    </>
  );
};

export default DontDie;

