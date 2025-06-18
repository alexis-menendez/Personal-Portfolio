// File: client/src/pages/portfolio/Solarium.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import ShortPortfolioLayout from '../../components/portfolio/layout/ShortPortfolioLayout';
import styles from '../../assets/css/portfolio/pageStyles/Projects.module.css';

const SolariumLinks = [
  {
    name: "Gallery",
    description: "Coming Soon!",
    image: "/assets/portfolio/icons/solarium/SolariumBrown.png",
    link: "#",  // Internal route placeholder
    isInternal: false, // default to false until implemented
    imageLeft: false,
  },
  {
    name: "GitHub",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/assets/portfolio/icons/git/GitBrown.png",
    link: "https://github.com/alexis-menendez/Module-18-The-Solarium",
    isInternal: false,
    imageLeft: true,
  },
  {
    name: "Documentation",
    description: "NEED TO REPLACE WITH CORRECT LINK.",
    image: "/assets/portfolio/icons/documentation/DocumentationBrown.png",
    link: "https://docs.google.com/document/d/1K9LzRR68QS5rKAFtXKpg2JLLScKgCeq1-FQufrgHPsQ/edit?tab=t.m171kj9l8bu",
    isInternal: false,
    imageLeft: false,
  },
];

const Solarium: React.FC = () => {
  return (
    <ShortPortfolioLayout>
      <div className={styles.textSection}>
        <h1 className={styles.heading}>The Solarium</h1>
        <p className={styles.paragraph}>
          The Solarium is a light-suffused platform for organizing and presenting visual knowledge. 
          This project blends elegant interface design with full-stack logic, emphasizing clarity, responsiveness, and visual storytelling.
        </p>
      </div>

      <div className={styles.projectGrid}>
        {SolariumLinks.map((section, index) => {
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
    </ShortPortfolioLayout>
  );
};

export default Solarium;

