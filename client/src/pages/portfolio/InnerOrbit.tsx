// File: client/src/pages/portfolio/InnerOrbit.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import ShortPortfolioLayout from '../../components/portfolio/layout/ShortPortfolioLayout';
import styles from '../../assets/css/portfolio/pageStyles/Projects.module.css';

const innerOrbitLinks = [
  {
    name: "Deployed App",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/assets/portfolio/icons/deployed/DeployedBlue.png",
    link: "/io-home", // internal route
    isInternal: true,
    imageLeft: false,
  },
  {
    name: "GitHub",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/assets/portfolio/icons/git/GitBlue.png",
    link: "https://github.com/alexis-menendez/Personal-Portfolio",
    isInternal: false,
    imageLeft: true,
  },
  {
    name: "Documentation",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/assets/portfolio/icons/documentation/DocumentationBlue.png",
    link: "https://docs.google.com/document/d/1K9LzRR68QS5rKAFtXKpg2JLLScKgCeq1-FQufrgHPsQ/edit?tab=t.m171kj9l8bu",
    isInternal: false,
    imageLeft: false,
  },
];

const InnerOrbit: React.FC = () => {
  return (
    <ShortPortfolioLayout>
      <h1 className={styles.heading}>InnerOrbit</h1>
      <div className={styles.projectGrid}>
        {innerOrbitLinks.map((section, index) => (
          <a key={index} href={section.link} target="_blank" rel="noopener noreferrer" className={styles.card}>
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
          </a>
        ))}
      </div>
    </ShortPortfolioLayout>
  );
};

export default InnerOrbit;

