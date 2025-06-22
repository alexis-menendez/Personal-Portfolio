// File: client/src/pages/portfolio/Projects.tsx

import React from 'react';
import styles from '../../assets/css/portfolio/pageStyles/Home.module.css';

const projects = [
  {
    name: "InnerOrbit",
    description: "A cosmic wellness app where users log moods and create journal entires within a soothing visual galaxy.",
    image: "/assets/portfolio/icons/innerOrbit/RetroInnerOrbit.svg",
    link: "/innerOrbit"
  },
  {
    name: "How Not To Die",
    description: "A narrative survival game disguised as a space console—write explorer logs, survive alien planets, and uncover deep mysteries.",
    image: "/assets/portfolio/icons/dontDie/RetroDontDie.png",
    link: "/dontDie"
  },
  {
    name: "Lattice",
    description: "A social platform for mycologists to share thoughts, reactions, and discoveries in a vibrant network of fungal minds.",
    image: "/assets/portfolio/icons/lattice/RetroLattice.svg",
    link: "/lattice"
  },
  {
    name: "The Solarium",
    description: "A whimsical digital library where users search, save, and annotate books in a sun-drenched, plant-filled sanctuary.",
    image: "/assets/portfolio/icons/solarium/RetroSolarium.svg",
    link: "/solarium"
  },
  {
    name: "Runestone Evaluation",
    description: "A magical quiz app that transforms personality tests into mystical spellcasting rituals for aspiring mages.",
    image: "/assets/portfolio/icons/runestone/RetroRunestone.svg",
    link: "/runestone"
  },
  {
    name: "Taskadelic",
    description: "A psychedelic Kanban board blending bullet journaling with hypnotic visuals to keep tasks flowing and focus high.",
    image: "/assets/portfolio/icons/taskadelic/RetroTaskadelic.png",
    link: "/taskadelic"
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
          const isImageLeft = project.name === "How Not To Die" || project.name === "The Solarium" || project.name === "Taskadelic";
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

