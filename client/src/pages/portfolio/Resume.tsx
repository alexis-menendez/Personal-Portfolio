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

            <div className={styles.thinDividingLine}></div>

            <p>
            <span className={styles.institution}>Austin Community College</span>. Austin, TX. Spring 2025.<br />
            <em>Associate of Arts in Psychology.</em> 4.0 GPA.
            </p>
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
        <div className={styles.experienceSection}>
            <h2>Experience</h2>

            <div className={styles.dividingLine}></div>

            <div className={styles.jobEntry}>
            <p className={styles.job}>Austin Community College</p>
            <p><em>Tutoring Lab Assistant | Austin, TX. | January 2024 – Present</em></p>
            <ul>
                <li>Troubleshoot technical issues and support students in accessing digital resources.</li>
                <li>Guide students to appropriate student services based on their needs</li>
            </ul>
            </div>
           
            <div className={styles.thinDividingLine}></div>

            <div className={styles.jobEntry}>
            <p className={styles.job}>George P. Johnson Marketing</p>
            <p><em>Customer Service Representative | Austin, TX. | May 2022 – October 2023</em></p>
            <ul>
                <li>Delivered customer service via Salesforce CRM software, assist clients & customers through email/text/phone</li>
                <li>Provide tech support and troubleshooting</li>
            </ul>
            </div>
           
            <div className={styles.thinDividingLine}></div>

            <div className={styles.jobEntry}>
            <p className={styles.job}>Guiding Lives</p>
            <p><em>Data Entry & Organizational Assistant | Austin, TX. | January 2020 – July 2022</em></p>
            <ul>
                <li>Managed data entry, correspondence, and scheduling, maintaining compliance with agency protocols.</li>
                <li>Performed office duties in support of faculty, including word processing, maintaining files, and processing mail</li>
            </ul>
            </div>
           
            <div className={styles.thinDividingLine}></div>

            <div className={styles.jobEntry}>
            <p className={styles.job}>Austin Fab & Forge and Neiri Design</p>
            <p><em>Artistic Metalworker Internship | Austin, TX. | April 2021 – June 2021</em></p>
            <ul>
                <li>Collaborated with local fabricators to design and install custom metalwork pieces</li>
                <li>Mastered advanced fabrication techniques and metalworking tools</li>
            </ul>
            </div>
           
            <div className={styles.thinDividingLine}></div>

            <div className={styles.jobEntry}>
            <p className={styles.job}>Dovetail Custom Wood & Metal</p>
            <p><em>Welder / Fabricator | Del Valle, TX. | April 2020 – May 2021</em></p>
            <ul>
                <li>Read and followed blueprints to weld, drill, grind, cut, shape, bend, and forge metal</li>
                <li>Worked independently and collaboratively on fabrication projects</li>
            </ul>
            </div>
           
            <div className={styles.thinDividingLine}></div>

            <div className={styles.jobEntry}>
            <p className={styles.job}>Austin Community College</p>
            <p><em>Lab Technician Assistant | Round Rock & Austin, TX. | September 2019 – June 2020</em></p>
            <ul>
                <li>Assisted students and professors with lab tools and machine operation</li>
                <li>Maintained and cleaned tools and welding equipment</li>
            </ul>
            </div>
           
            <div className={styles.thinDividingLine}></div>

            <div className={styles.jobEntry}>
            <p className={styles.job}>S&S Trails</p>
            <p><em>Organizational Assistant | Austin, TX. | January 2017 – September 2019</em></p>
            <ul>
                <li>Analyzed quarterly spending and compiled reports for internal use</li>
                <li>Provided administrative support through data entry and documentation</li>
            </ul>
            </div>
           
            <div className={styles.thinDividingLine}></div>

            <div className={styles.jobEntry}>
            <p className={styles.job}>World Market</p>
            <p><em>Customer Service Representative | College Station, TX. | January 2015 – January 2017</em></p>
            <ul>
                <li>Handled transactions with accuracy and provided front-line customer support</li>
                <li>Maintained a high level of service and communication with customers</li>
            </ul>
            </div>
           
            <div className={styles.thinDividingLine}></div>

            <div className={styles.jobEntry}>
            <p className={styles.job}>Inner Space Caverns</p>
            <p><em>Tour Guide | Georgetown, TX. | November 2013 – January 2015</em></p>
            <ul>
                <li>Led guided tours and delivered public speaking to diverse groups</li>
                <li>Cared for exotic animals in the petting zoo, supporting educational visitor experiences</li>
            </ul>
            </div>
        </div>
        )}

        {/* Volunteer Work */}
        {activeTab === 'volunteer' && (
        <div className={styles.experienceSection}>
            <h2>Volunteer Work</h2>
            <div className={styles.dividingLine}></div>

            <div className={styles.jobEntry}>
            <p className={styles.job}>The Lavender Society, <em>at Austin Community College</em></p>
            <p><em>Founder & President | Austin, TX. | March 2024 – May 2025</em></p>
            <ul>
                <li>Founded and led a student organization supporting LGBTQ+ students and allies</li>
                <li>Organized meetings, campus events, and outreach efforts to foster inclusivity and community engagement</li>
                <li>Collaborated with college staff and departments to advocate for student needs and representation</li>
            </ul>
            </div>

            <div className={styles.thinDividingLine}></div>

            <div className={styles.jobEntry}>
            <p className={styles.job}>Austin Creative Reuse</p>
            <p><em>Materials and Events Assistant | Austin, TX. | September 2024 – May 2025</em></p>
            <ul>
                <li>Organized donations and promoted the organization’s mission at community events</li>
            </ul>
            </div>

            <div className={styles.thinDividingLine}></div>

            <div className={styles.jobEntry}>
            <p className={styles.job}>Dougherty Arts Center</p>
            <p><em>Horticulture Assistant & Gallery Assistant | Austin, TX. | July 2024 – May 2025</em></p>
            <ul>
                <li>Assisted with garden maintenance, including weeding, pruning, mulching, and planting</li>
                <li>Monitored gallery and artwork, ensuring proper care and handling during events & greeting visitors</li>
            </ul>
            </div>

            <div className={styles.thinDividingLine}></div>

            <div className={styles.jobEntry}>
            <p className={styles.job}>ATX ROX</p>
            <p><em>Event Registration Assistant | Austin, TX. | September 26, 2024 – September 29, 2024</em></p>
            <ul>
                <li>Handled attendee check-ins, processed registrations and payments, and provided event information for smooth scheduling and navigation</li>
            </ul>
            </div>

            <div className={styles.thinDividingLine}></div>

            <div className={styles.jobEntry}>
            <p className={styles.job}>Wild Wild Westie</p>
            <p><em>Event Registration Assistant | Dallas, TX. | July 4, 2024 – July 7, 2024</em></p>
            <ul>
                <li>Managed check-ins, credential verification, and payments, ensuring data accuracy and guiding attendees on event details</li>
            </ul>
            </div>

            <div className={styles.thinDividingLine}></div>

            <div className={styles.jobEntry}>
            <p className={styles.job}>ATX Fusion</p>
            <p><em>Assistant Event Coordinator | Austin, TX. | February 2023 – February 2024</em></p>
            <ul>
                <li>Coordinated event logistics, managed attendee check-in, and oversaw food/beverage budgets</li>
            </ul>
            </div>
        </div>
        )}
        </section>
      </div>
    </>
  );
};


export default Resume;

