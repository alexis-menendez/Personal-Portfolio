// File: client/src/pages/portfolio/Solarium.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../assets/css/portfolio/pageStyles/Projects.module.css';

const solariumLinks = [
  {
    name: "Deployed App",
    description: "Coming Soon!",
    image: "/assets/portfolio/icons/deployed/DeployedBrown.svg",
    link: "#",
    isInternal: false,
    newTab: false,
    imageLeft: false,
  },
  {
    name: "GitHub",
    description: "View the full source code for The Solarium visual knowledge platform on GitHub.",
    image: "/assets/portfolio/icons/git/GitBrown.png",
    link: "https://github.com/alexis-menendez/Module-18-The-Solarium",
    isInternal: false,
    newTab: true,
    imageLeft: true,
  },
  {
    name: "Documentation",
    description: "Under development, check back soon for design documentation for The Solarium, including tech overview and feature notes!",
    image: "/assets/portfolio/icons/documentation/DocumentationBrown.svg",
    link: "#",
    isInternal: false,
    newTab: false,
    imageLeft: false,
  },
  {
    name: "Gallery",
    description: "Coming Soon!",
    image: "/assets/portfolio/icons/solarium/SolariumBrown.png",
    link: "#",
    isInternal: false,
    newTab: false,
    imageLeft: true,
  },
];

const Solarium: React.FC = () => {
  return (
    <>
      <div className={styles.textSection}>
        <h1 className={styles.heading}>The Solarium</h1>
        <p className={styles.paragraph}>
          The Solarium is a whimsical digital library where users can search, save, and annotate books 
          in a sun-drenched, plant-filled sanctuary. It blends elegant interface design with full-stack 
          logic to create an experience focused on warmth, discovery, and reflection.
        </p>
      </div>

      <div className={styles.projectGrid}>
        {solariumLinks.map((section, index) => {
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

export default Solarium;


