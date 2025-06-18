// File: client/src/pages/portfolio/Runestonetsx

import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../assets/css/portfolio/pageStyles/Projects.module.css';

const RunestoneLinks = [
  {
    name: "Gallery",
    description: "Coming Soon!",
    image: "/assets/portfolio/icons/runestone/RunestonePurple.png",
    link: "#",  // Internal route placeholder
    isInternal: false, // default to false until implemented
    imageLeft: false,
  },
  {
    name: "GitHub",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/assets/portfolio/icons/git/GitPurple.png",
    link: "https://github.com/alexis-menendez/Module-19-Runestone-Evaluation",
    isInternal: false,
    imageLeft: true,
  },
  {
    name: "Documentation",
    description: "NEED TO REPLACE WITH CORRECT LINK.",
    image: "/assets/portfolio/icons/documentation/DocumentationPurple.png",
    link: "https://docs.google.com/document/d/1K9LzRR68QS5rKAFtXKpg2JLLScKgCeq1-FQufrgHPsQ/edit?tab=t.m171kj9l8bu",
    isInternal: false,
    imageLeft: false,
  },
];

const Runestone: React.FC = () => {
  return (
    <>
      <div className={styles.textSection}>
        <h1 className={styles.heading}>Runestone Evaluation</h1>
        <p className={styles.paragraph}>
          Runestone Evaluation is a concept-to-delivery academic grading platform inspired by fantasy themes. 
          It combines playful UI with robust logic for categorizing, visualizing, and reflecting on performance using JavaScript and MongoDB.
        </p>
      </div>

      <div className={styles.projectGrid}>
        {RunestoneLinks.map((section, index) => {
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
            <Link key={index} to={section.link!} className={styles.card}>
              {cardContent}
            </Link>
          ) : (
            <a key={index} href={section.link || "#"} target="_blank" rel="noopener noreferrer" className={styles.card}>
              {cardContent}
            </a>
          );
        })}
      </div>
    </>
  );
};

export default Runestone;

