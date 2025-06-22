// File: client/src/pages/portfolio/Resume.tsx


import React, { useState } from 'react';
import styles from '../../assets/css/portfolio/pageStyles/Resume.module.css';


const Resume: React.FC = () => {
  const [activeTab, setActiveTab] = useState('education');

  const tabs = [
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'volunteer', label: 'Volunteer Work' },
  ];

  const projects = [
    {
      name: "InnerOrbit",
      description: "A cosmic wellness app where users log moods and create journal entires within a soothing visual galaxy.",
      image: "/assets/portfolio/icons/innerOrbit/InnerOrbitIceBlue.png",
      link: "/innerOrbit"
    },
    {
      name: "How Not To Die",
      description: "A narrative survival game disguised as a space console—write explorer logs, survive alien planets, and uncover deep mysteries.",
      image: "/assets/portfolio/icons/dontDie/DontDieIceBlue.png",
      link: "/dontDie"
    },
    {
      name: "Lattice",
      description: "A social platform for mycologists to share thoughts, reactions, and discoveries in a vibrant network of fungal minds.",
      image: "/assets/portfolio/icons/lattice/LatticeIceBlue.png",
      link: "/lattice"
    },
    {
      name: "The Solarium",
      description: "A whimsical digital library where users search, save, and annotate books in a sun-drenched, plant-filled sanctuary.",
      image: "/assets/portfolio/icons/solarium/SolariumIceBlue.png",
      link: "/solarium"
    },
    {
      name: "Runestone Evaluation",
      description: "A magical quiz app that transforms personality tests into mystical spellcasting rituals for aspiring mages.",
      image: "/assets/portfolio/icons/runestone/RunestoneIceBlue.png",
      link: "/runestone"
    },
    {
      name: "Taskadelic",
      description: "A psychedelic Kanban board blending bullet journaling with hypnotic visuals to keep tasks flowing and focus high.",
      image: "/assets/portfolio/icons/taskadelic/TaskadelicIceBlue.png",
      link: "/taskadelic"
    }
  ];

  return (
    <>
      {/* Resume Header */}
      <div className={styles.resumeHeader}>
        <h1 className={styles.heading}>Alex Menendez</h1>
        <p className={styles.paragraph}>
          <em>Full-stack developer specializing in TypeScript, React, and the MERN stack.</em><br />
          Portland, OR | (737) 217-9087
        </p>


        <div className={styles.iconRow}>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = 'mailto:menendez.alex.d@gmail.com';
            }}
            className={styles.headerIcon}
          >
            <img
              src="/assets/portfolio/icons/header/EmailHeader.png"
              alt="Email"
              className={styles.iconImage}
            />
          </a>
          <a
            href="https://github.com/alexis-menendez"
            className={styles.headerIcon}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/assets/portfolio/icons/header/GitHeader.png"
              alt="GitHub"
              className={styles.iconImage}
            />
          </a>
          <a
            href="https://www.linkedin.com/in/alex-d-menendez/"
            className={styles.headerIcon}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/assets/portfolio/icons/header/LinkedinHeader.png"
              alt="LinkedIn"
              className={styles.iconImage}
            />
          </a>
        </div>
      </div>

      {/* Resume Layout */}
      <div className={styles.resumeLayout}>
        <aside className={styles.sidebar}>
          <h2 className={styles.sidebarTitle}>Curriculum Vitae</h2>
          <ul className={styles.tabList}>
            {tabs.map((tab) => (
              <li
                key={tab.id}
                className={`${styles.tabItem} ${activeTab === tab.id ? styles.active : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </li>
            ))}
          </ul>
        </aside>

        {/* Tab Content */}
        <section className={styles.contentArea}>
          {/* Education */}
        {activeTab === 'education' && (
        <div>
            <h2>Education</h2>

            <div className={styles.dividingLine}></div>

            <p>
            <span className={styles.institution}>Rice University</span>. Houston, TX. June, 2025.<br />
            <em>Certificate of Completion.</em> 4.0 GPA.
            </p>
            <p>Completed an intensive Web Development course, covering full-stack development, software engineering practices, and advanced programming techniques such as:</p>
            <ul>
            <li>Built and deployed <span className={styles.emph}>full-stack</span> applications (<span className={styles.emph}>MERN stack</span>)</li>
            <li>Practiced <span className={styles.emph}>version control</span>, <span className={styles.emph}>Git workflows</span>, and <span className={styles.emph}>CI/CD pipelines</span> using GitHub and GitHub Actions</li>
            <li>Integrated <span className={styles.emph}>REST</span> and <span className={styles.emph}>GraphQL APIs</span>, implemented <span className={styles.emph}>JWT-based authentication</span>, and designed protected routes</li>
            <li>Created responsive, accessible UIs using <span className={styles.emph}>Tailwind CSS</span>, <span className={styles.emph}>CSS Modules</span>, and <span className={styles.emph}>custom animation</span> techniques</li>
            <li>Collaborated using <span className={styles.emph}>Agile methodologies</span>, managing projects through GitHub Projects, Discord, and Slack</li>
            <li>Gained hands-on experience with technologies such as <span className={styles.emph}>WebSockets</span>, <span className={styles.emph}>HTML</span>, <span className={styles.emph}>CSS</span>, <span className={styles.emph}>JavaScript</span>, <span className={styles.emph}>TypeScript</span>, <span className={styles.emph}>Git</span>, <span className={styles.emph}>Node.js</span>, <span className={styles.emph}>Express</span>, <span className={styles.emph}>MongoDB</span>, <span className={styles.emph}>React</span>, and <span className={styles.emph}>Python</span></li>
            <li>Exposure to <span className={styles.emph}>AI & Machine Learning</span> tech such as <span className={styles.emph}>ML models</span>, <span className={styles.emph}>OpenAI API integration</span>, <span className={styles.emph}>prompt engineering</span>, and deploying <span className={styles.emph}>AI-enhanced</span> features</li>
            </ul>

            <div className={styles.dividingLine}></div>

            <p>
            <span className={styles.institution}>Austin Community College</span>. Austin, TX. Spring 2025.<br />
            <em>Associate of Arts in Psychology.</em> 4.0 GPA.
            </p>

            <div className={styles.dividingLine}></div>
        </div>
          )}

          {/* Skills */}
        {activeTab === 'skills' && (
        <div className={styles.skillsSection}>
            <h2>Skills</h2>

            <div className={styles.dividingLine}></div>

            <table className={styles.skillsTable}>
            <tbody>
                <tr>
                <td className={styles.category}>Languages</td>
                <td>JavaScript (ES6+), TypeScript, Python</td>
                </tr>
                <tr>
                <td className={styles.category}>Markup & Styling</td>
                <td>HTML, CSS, JSX/TSX</td>
                </tr>
                <tr>
                <td className={styles.category}>Frontend</td>
                <td>React (Hooks, Component Architecture), Tailwind CSS, CSS Modules, Responsive Design, UI/UX Principles</td>
                </tr>
                <tr>
                <td className={styles.category}>Backend</td>
                <td>Node.js, Express, REST APIs, WebSockets</td>
                </tr>
                <tr>
                <td className={styles.category}>Databases</td>
                <td>MongoDB (Mongoose), SQL, GraphQL</td>
                </tr>
                <tr>
                <td className={styles.category}>Authentication & Security</td>
                <td>JWT, bcrypt, OAuth (conceptual), Protected Routes, Role-based Access Control</td>
                </tr>
                <tr>
                <td className={styles.category}>Testing & Debugging</td>
                <td>Jest, React Testing Library, Chrome DevTools, Insomnia, Postman, console debugging</td>
                </tr>
                <tr>
                <td className={styles.category}>DevOps & CI/CD</td>
                <td>Git & GitHub, GitHub Actions, CircleCI, Environment Variables, Process Improvement</td>
                </tr>
                <tr>
                <td className={styles.category}>Tools</td>
                <td>VS Code, npm, Vite, Postman</td>
                </tr>
                <tr>
                <td className={styles.category}>Hosting & Deployment</td>
                <td>Amazon Web Services (AWS), Render, Netlify, Cloudinary</td>
                </tr>
                <tr>
                <td className={styles.category}>Machine Learning</td>
                <td>OpenAI API integration, prompt engineering, deploying AI features</td>
                </tr>
                <tr>
                <td className={styles.category}>Project Management</td>
                <td>Agile Methodologies, GitHub Projects, Figma, Slack, Discord, Team Supervision & Collaboration</td>
                </tr>
                <tr>
                <td className={styles.category}>Administrative & Analytical</td>
                <td>Research & Analysis, Document Management</td>
                </tr>
            </tbody>
            </table>
        </div>
          )}

          {/* Projects */}
          {activeTab === 'projects' && (
            <div className={styles.projectsSection}>
              <h2>Projects</h2>
              <div className={styles.dividingLine}></div>
              <div className={styles.projectGrid}>
                {projects.map((project) => (
                  <a
                    key={project.name}
                    href={project.link}
                    className={styles.projectCard}
                  >
                    <img
                      src={project.image}
                      alt={project.name}
                      className={styles.projectImage}
                    />
                    <div className={styles.projectInfo}>
                      <h3>{project.name}</h3>
                      <p>{project.description}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}


          {/* Experience */}
          {activeTab === 'experience' && (
            <div>
              <h2>Experience</h2>
              <ul>
                <li><strong>ACC | Tutoring Lab Assistant</strong> — Jan 2024–Present</li>
                <li><strong>George P. Johnson | Customer Service Rep</strong> — 2022–2023</li>
                <li><strong>Dovetail | Welder / Fabricator</strong> — 2020–2021</li>
                <li><strong>Others:</strong> Austin Fab & Forge, World Market, Inner Space Caverns, etc.</li>
              </ul>
            </div>
          )}


          {/* Volunteer Work */}
          {activeTab === 'volunteer' && (
            <div>
              <h2>Volunteer Work</h2>
              <ul>
                <li><strong>The Lavender Society</strong> — Founder & President</li>
                <li><strong>Austin Creative Reuse</strong> — Events Assistant</li>
                <li><strong>Dougherty Arts Center</strong> — Gallery Assistant</li>
                <li><strong>ATX ROX, Wild Wild Westie, ATX Fusion</strong> — Event Staff</li>
              </ul>
            </div>
          )}
        </section>
      </div>
    </>
  );
};


export default Resume;

