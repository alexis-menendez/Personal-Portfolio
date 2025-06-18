// File: client/src/pages/portfolio/Projects.tsx

import React from 'react';
import styles from '../../assets/css/portfolio/pageStyles/Projects.module.css';

const projects = [
  {
    name: "InnerOrbit",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/assets/portfolio/icons/innerOrbit/RetroInnerOrbit.svg",
    link: "/innerOrbit"
  },
  {
    name: "Lattice",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/assets/portfolio/icons/lattice/RetroLattice.svg",
    link: "/lattice"
  },
  {
    name: "The Solarium",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/assets/portfolio/icons/solarium/RetroSolarium.svg",
    link: "/solarium"
  },
  {
    name: "Runestone Evaluation",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/assets/portfolio/icons/runestone/RetroRunestone.svg",
    link: "/runestone"
  },
];

const Projects: React.FC = () => {
  return (
    <>
      <div className={styles.textSection}>
        <h1 className={styles.heading}>Projects</h1>
        <p className={styles.paragraph}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>

      <div className={styles.projectGrid}>
        {projects.map((project, index) => {
          const isImageLeft = project.name === "InnerOrbit" || project.name === "The Solarium";
          return (
            <a key={index} href={project.link} className={styles.card}>
              {isImageLeft && (
                <div className={styles.imageBox}>
                  <img src={project.image} alt={`${project.name} icon`} />
                </div>
              )}

              <div className={isImageLeft ? styles.rightText : styles.leftText}>
                <h2>{project.name}</h2>
                <p>{project.description}</p>
                <button className={styles.button}>View Project</button>
              </div>

              {!isImageLeft && (
                <div className={styles.imageBox}>
                  <img src={project.image} alt={`${project.name} icon`} />
                </div>
              )}
            </a>
          );
        })}
      </div>
    </>
  );
};

export default Projects;

