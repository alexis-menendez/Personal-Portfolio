// File: client/src/pages/portfolio/Lattice.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import ShortPortfolioLayout from '../../components/portfolio/layout/ShortPortfolioLayout';
import styles from '../../assets/css/portfolio/pageStyles/Projects.module.css';

const LatticeLinks = [
  {
    name: "Gallery",
    description: "Coming Soon!",
    image: "/assets/portfolio/icons/lattice/LatticeRed.png",
    link: "#",  // Internal route placeholder
    isInternal: false, // default to false until implemented
    imageLeft: false,
  },
  {
    name: "GitHub",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/assets/portfolio/icons/git/GitRed.png",
    link: "https://github.com/alexis-menendez/Module-17-Lattice",
    isInternal: false,
    imageLeft: true,
  },
  {
    name: "Documentation",
    description: "NEED TO REPLACE WITH CORRECT LINK.",
    image: "/assets/portfolio/icons/documentation/DocumentationRed.png",
    link: "https://docs.google.com/document/d/1K9LzRR68QS5rKAFtXKpg2JLLScKgCeq1-FQufrgHPsQ/edit?tab=t.m171kj9l8bu",
    isInternal: false,
    imageLeft: false,
  },
];

const Lattice: React.FC = () => {
  return (
    <ShortPortfolioLayout>
      <div className={styles.textSection}>
        <h1 className={styles.heading}>Lattice</h1>
        <p className={styles.paragraph}>
          Lattice is a mycology-inspired social network where users can post findings, 
          connect with other enthusiasts, and share fungal knowledge. 
          Built with a full MERN stack, this app demonstrates data modeling, form handling, and user authentication.
        </p>
      </div>

      <div className={styles.projectGrid}>
        {LatticeLinks.map((section, index) => {
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
    </ShortPortfolioLayout>
  );
};

export default Lattice;

