// File: client/src/pages/portfolio/Runestone.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../assets/css/portfolio/pageStyles/Projects.module.css';

const runestoneLinks = [
  {
    name: "Deployed App",
    description: "Coming Soon!",
    image: "/assets/portfolio/icons/deployed/DeployedPurple.svg",
    link: "#",
    isInternal: false,
    newTab: false,
    imageLeft: false,
  },
  {
    name: "GitHub",
    description: "View the full source code for the Runestone Evaluation platform on GitHub.",
    image: "/assets/portfolio/icons/git/GitPurple.png",
    link: "https://github.com/alexis-menendez/Module-19-Runestone-Evaluation",
    isInternal: false,
    newTab: true,
    imageLeft: true,
  },
  {
    name: "Documentation",
    description: "Check back soon for detailed design documentation on the Runestone Evaluation tool!",
    image: "/assets/portfolio/icons/documentation/DocumentationPurple.svg",
    link: "#",
    isInternal: false,
    newTab: false,
    imageLeft: false,
  },
  {
    name: "Gallery",
    description: "Coming Soon!",
    image: "/assets/portfolio/icons/runestone/RunestonePurple.png",
    link: "#",
    isInternal: false,
    newTab: false,
    imageLeft: true,
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
        {runestoneLinks.map((section, index) => {
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

export default Runestone;
