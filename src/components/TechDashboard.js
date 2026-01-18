import React, { useState } from 'react';
import './TechDashboard.css';

const TechDashboard = () => {
  const [activeTab, setActiveTab] = useState('frontend');

  const techData = {
    frontend: {
      title: "Client Side",
      tag: "UI/UX",
      description: "User interaction aur visual experience ke liye modern libraries.",
      technologies: ["React.js", "Next.js", "Tailwind CSS", "TypeScript", "Redux"]
    },
    backend: {
      title: "Server Side",
      tag: "Core Logic",
      description: "Robust API handling aur business logic processing.",
      technologies: ["Node.js", "Express", "Python / Django", "GoLang"]
    },
    fullstack: {
      title: "Full Stack",
      tag: "End-to-End",
      description: "Complete development solutions from frontend to backend.",
      technologies: ["MERN Stack", "MEAN Stack", "JAMstack", "Serverless"]
    },
    database: {
      title: "Database",
      tag: "Data Layer",
      description: "Scalable data storage and management solutions.",
      technologies: ["MongoDB", "PostgreSQL", "Redis", "Firebase"]
    },
    devops: {
      title: "DevOps",
      tag: "Deployment",
      description: "Automated deployment and infrastructure management.",
      technologies: ["Docker", "AWS", "Vercel", "GitHub Actions"]
    }
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <section className="tech-dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h2>System <span className="highlight">Architecture</span></h2>
          <p>Select a layer to view technologies.</p>
        </div>

        <div className="dashboard-interface">
          <div className="tech-sidebar">
            {Object.keys(techData).map((key) => (
              <button
                key={key}
                className={`tab-btn ${activeTab === key ? 'active' : ''}`}
                onClick={() => handleTabClick(key)}
              >
                <span className="dot"></span> {techData[key].title}
              </button>
            ))}
          </div>

          <div className="tech-display">
            <div className="tech-content active-content">
              <div className="content-header">
                <h3>{techData[activeTab].title}</h3>
                <span className="tag">{techData[activeTab].tag}</span>
              </div>
              <p className="description">{techData[activeTab].description}</p>
              <div className="tech-icons-grid">
                {techData[activeTab].technologies.map((tech, index) => (
                  <div key={index} className="tech-pill">{tech}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechDashboard;