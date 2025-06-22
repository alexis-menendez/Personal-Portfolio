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

          {/* Projects */}
          {activeTab === 'projects' && (
            <div>
              <h2>Projects</h2>
              <p><strong>Personal Developer Portfolio:</strong> <a href="https://alex-menendez.onrender.com" target="_blank" rel="noreferrer">Live Site</a></p>
              <p><strong>Lattice:</strong> <a href="https://github.com/alexis-menendez/Module-17-Lattice" target="_blank" rel="noreferrer">GitHub</a></p>
              <p><strong>How Not To Die:</strong> <a href="https://github.com/alexis-menendez/HowNotToDieDemo" target="_blank" rel="noreferrer">GitHub</a></p>
              <p><strong>InnerOrbit:</strong> <a href="https://github.com/alexis-menendez/Inner-Orbit" target="_blank" rel="noreferrer">GitHub</a></p>
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
