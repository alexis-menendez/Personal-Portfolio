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

  return (
    <>
      {/* Resume Header */}
      <div className={styles.resumeHeader}>
        <h1 className={styles.heading}>Alex Menendez</h1>
        <p className={styles.paragraph}>
          <em>
            Full-stack developer specializing in TypeScript, React, and the MERN stack with a background in psychology and welding.
          </em>
          <br />
          Portland, OR | (737) 217-9087 | menendez.alex.d@gmail.com |
          <a href="https://github.com/alexis-menendez" target="_blank" rel="noreferrer"> github.com/alexis-menendez</a> |
          <a href="https://www.linkedin.com/in/alex-d-menendez" target="_blank" rel="noreferrer"> linkedin.com/in/alex-d-menendez</a>
        </p>
      </div>

      {/* Resume Layout */}
      <div className={styles.resumeLayout}>
        {/* Sidebar Navigation */}
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
          {activeTab === 'education' && (
            <div>
              <h2>Education</h2>
              <p><strong>Rice University</strong> — Certificate in Full-Stack Web Development, 4.0 GPA (June 2025)</p>
              <p><strong>Austin Community College</strong> — Associate of Arts in Psychology, 4.0 GPA (Spring 2025)</p>
            </div>
          )}

          {activeTab === 'skills' && (
            <div>
              <h2>Skills</h2>
              <ul>
                <li><strong>Languages:</strong> JavaScript, TypeScript, Python, HTML, CSS</li>
                <li><strong>Frontend:</strong> React, Tailwind CSS, CSS Modules, Responsive Design</li>
                <li><strong>Backend:</strong> Node.js, Express, MongoDB, GraphQL, JWT</li>
                <li><strong>Tools:</strong> Git, GitHub Actions, Postman, Vite, Render, Netlify</li>
                <li><strong>Other:</strong> Agile, OpenAI APIs, Research, Leadership</li>
              </ul>
            </div>
          )}

          {activeTab === 'projects' && (
            <div>
              <h2>Projects</h2>
              <p><strong>Personal Developer Portfolio:</strong> <a href="https://alex-menendez.onrender.com" target="_blank" rel="noreferrer">Live Site</a></p>
              <p><strong>Lattice:</strong> <a href="https://github.com/alexis-menendez/Module-17-Lattice" target="_blank" rel="noreferrer">GitHub</a></p>
              <p><strong>How Not To Die:</strong> <a href="https://github.com/alexis-menendez/HowNotToDieDemo" target="_blank" rel="noreferrer">GitHub</a></p>
              <p><strong>InnerOrbit:</strong> <a href="https://github.com/alexis-menendez/Inner-Orbit" target="_blank" rel="noreferrer">GitHub</a></p>
            </div>
          )}

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
