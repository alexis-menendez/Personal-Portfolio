// File: client/src/pages/portfolio/Lattice.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../assets/css/portfolio/pageStyles/Projects.module.css';

const latticeLinks = [
  {
    name: "Deployed App",
    description: "Coming Soon!",
    image: "/assets/portfolio/icons/deployed/DeployedRed.svg",
    link: "#",
    isInternal: false,
    newTab: false,
    imageLeft: false,
  },
  {
    name: "GitHub",
    description: "View the full source code for the Lattice mycology social network on GitHub.",
    image: "/assets/portfolio/icons/git/GitRed.png",
    link: "https://github.com/alexis-menendez/Module-17-Lattice",
    isInternal: false,
    newTab: true,
    imageLeft: true,
  },
  {
    name: "Documentation",
    description: "Under development, check back soon for design documentation for Lattice, including tech overview and feature notes!",
    image: "/assets/portfolio/icons/documentation/DocumentationRed.png",
    link: "#",
    isInternal: false,
    newTab: false,
    imageLeft: false,
  },
  {
    name: "Gallery",
    description: "Coming Soon!",
    image: "/assets/portfolio/icons/lattice/LatticeRed.png",
    link: "#",
    isInternal: false,
    newTab: false,
    imageLeft: true,
  },
];

const Lattice: React.FC = () => {
  return (
    <>
      <div className={styles.textSection}>
        <h1 className={styles.heading}>Lattice</h1>
        <p className={styles.paragraph}>
          Lattice is a mycology-inspired social network where users can post findings, 
          connect with other enthusiasts, and share fungal knowledge. 
          Built with a full MERN stack, this app demonstrates data modeling, form handling, and user authentication.
        </p>
      </div>

      <div className={styles.projectGrid}>
        {latticeLinks.map((section, index) => {
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

export default Lattice;
