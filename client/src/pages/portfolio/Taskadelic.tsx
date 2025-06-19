// File: client/src/pages/portfolio/Taskadelic.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../assets/css/portfolio/pageStyles/Projects.module.css';

const TaskadelicLinks = [
  {
    name: "Gallery",
    description: "Coming Soon!",
    image: "/assets/portfolio/icons/taskadelic/TaskadelicPsychedelic.png",
    link: "#",  // Internal route placeholder
    isInternal: false, // default to false until implemented
    imageLeft: false,
  },
  {
    name: "GitHub",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/assets/portfolio/icons/git/GitPsychedelic.png",
    link: "https://github.com/alexis-menendez/Module-14-Taskadelic",
    isInternal: false,
    imageLeft: true,
  },
  {
    name: "Documentation",
    description: "NEED TO REPLACE WITH CORRECT LINK.",
    image: "/assets/portfolio/icons/documentation/DocumentationPsychedelic.png",
    link: "https://docs.google.com/document/d/1K9LzRR68QS5rKAFtXKpg2JLLScKgCeq1-FQufrgHPsQ/edit?tab=t.m171kj9l8bu",
    isInternal: false,
    imageLeft: false,
  },
];

const Taskadelic: React.FC = () => {
  return (
    <>
      <div className={styles.textSection}>
        <h1 className={styles.heading}>Taskadelic</h1>
        <p className={styles.paragraph}>
          Taskadelic is a psychedelic productivity tool that transforms task management into a vibrant, sensory experience. 
          It’s part planner, part moodboard, part meditative ritual—designed to make staying organized feel like a creative act rather than a chore.
        </p>
      </div>

      <div className={styles.projectGrid}>
        {TaskadelicLinks.map((section, index) => {
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

export default Taskadelic;

