// File: client/src/pages/portfolio/Taskadelic.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../assets/css/portfolio/pageStyles/Projects.module.css';

const taskadelicLinks = [
  {
    name: "Deployed App",
    description: "Coming Soon!",
    image: "/assets/portfolio/icons/deployed/DeployedPsychedelic.svg",
    link: "#",
    isInternal: false,
    newTab: false,
    imageLeft: false,
  },
  {
    name: "GitHub",
    description: "View the full source code for Taskadelic, the psychedelic productivity tool.",
    image: "/assets/portfolio/icons/git/GitPsychedelic.svg",
    link: "https://github.com/alexis-menendez/Module-14-Taskadelic",
    isInternal: false,
    newTab: true,
    imageLeft: true,
  },
  {
    name: "Documentation",
    description: "Check back soon for design documentation detailing Taskadelic’s features and technical architecture.",
    image: "/assets/portfolio/icons/documentation/DocumentationPsychedelic.svg",
    link: "https://docs.google.com/document/d/1K9LzRR68QS5rKAFtXKpg2JLLScKgCeq1-FQufrgHPsQ/edit?tab=t.m171kj9l8bu",
    isInternal: false,
    newTab: true,
    imageLeft: false,
  },
  {
    name: "Gallery",
    description: "Visual highlights and screenshots showcasing the Taskadelic user experience.",
    image: "/assets/portfolio/icons/taskadelic/TaskadelicPsychedelic.svg",
    link: "/gallery", // internal route
    isInternal: true,
    newTab: false,
    imageLeft: true,
  },
];

const Taskadelic: React.FC = () => {
  return (
    <>
      <div className={styles.textSection}>
        <h1 className={styles.heading}>Taskadelic</h1>
        <p className={styles.paragraph}>
          Taskadelic is a psychedelic productivity tool that transforms task management into a vibrant, sensory experience. 
          It’s part planner, part Kanban Board, part mood-board to make staying organized feel like a creative act rather than a chore.
        </p>
      </div>

      <div className={styles.projectGrid}>
        {taskadelicLinks.map((section, index) => {
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

export default Taskadelic;

