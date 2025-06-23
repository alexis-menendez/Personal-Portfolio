// File: client/src/pages/portfolio/Projects.tsx

import React from 'react';
import SectionWrapper from '../../components/portfolio/common/SectionWrapper';
import sharedStyles from '../../assets/css/portfolio/pageStyles/Home.module.css'; 
import projectStyles from '../../assets/css/portfolio/pageStyles/Projects.module.css'; 

const projects = [
  {
    name: "InnerOrbit",
    description: "A cosmic wellness app where users log moods and create journal entries within a soothing visual galaxy.",
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
      <SectionWrapper>
        <h1 className={sharedStyles.heading}>Projects</h1>
        <p className={sharedStyles.paragraph}>
          These projects represent the intersection of imagination, design, and functionality.
          Each app began as a spark—whether a journaling app born from a love of star maps and 
          constellations or a survival game wrapped in cosmic mystery—and was shaped through thoughtful code, 
          narrative depth, and user-centered design.
        </p>
      </SectionWrapper>

      <div className={projectStyles.projectGrid}>
        {projects.map((project, index) => {
          const isImageLeft =
            project.name === "How Not To Die" ||
            project.name === "The Solarium" ||
            project.name === "Taskadelic";

          return (
            <a key={index} href={project.link} className={projectStyles.card}>
              {isImageLeft && (
                <div className={projectStyles.imageBox}>
                  <img src={project.image} alt={`${project.name} icon`} />
                </div>
              )}

              <div className={isImageLeft ? projectStyles.rightText : projectStyles.leftText}>
                <h2>{project.name}</h2>
                <p>{project.description}</p>
                <button className={projectStyles.button}>View Project</button>
              </div>

              {!isImageLeft && (
                <div className={projectStyles.imageBox}>
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
