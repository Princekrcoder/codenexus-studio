import React, { useState, useEffect } from 'react';
import './TechStack.css';

const techData = [
  {
    id: 'frontend',
    title: 'Frontend Development',
    desc: 'Building modern, high-performance UIs with a focus on responsiveness and smooth animations.',
    skills: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript', 'Framer Motion'],
    level: 95
  },
  {
    id: 'backend',
    title: 'Backend Systems',
    desc: 'Engineering scalable server-side architectures and secure API endpoints.',
    skills: ['Node.js', 'Express', 'PostgreSQL', 'Redis', 'Python'],
    level: 88
  },
  {
    id: 'fullstack',
    title: 'Full Stack Solutions',
    desc: 'Seamlessly bridging the gap between client-side beauty and server-side power.',
    skills: ['T3 Stack', 'MERN Stack', 'GraphQL', 'Prisma'],
    level: 92
  }
];

const TechStack = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, [activeTab]);

  return (
    <div className="tech-container">
      {/* Background Blobs (From your theme) */}
      <div className="bg-blob blob-1"></div>
      <div className="bg-blob blob-2"></div>

      <div className="dashboard-wrapper">
        <header style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span className="badge">Technical Arsenal</span>
          <h1 className="main-title" style={{marginTop: '15px'}}>Our <span>Technology</span> Stack</h1>
        </header>

        <div className="dashboard-card">
          {/* Sidebar */}
          <div className="tech-sidebar">
            {techData.map((item, index) => (
              <button
                key={item.id}
                className={`tab-btn ${activeTab === index ? 'active' : ''}`}
                onClick={() => {
                    setAnimate(false);
                    setActiveTab(index);
                }}
              >
                <div className="dot" />
                {item.title}
              </button>
            ))}
          </div>

          {/* Display */}
          <div className="tech-display">
            <div className={`display-content ${animate ? 'active-content' : ''}`}>
              <div className="display-header">
                <h2>{techData[activeTab].title}</h2>
                <p style={{color: 'var(--text-muted)', lineHeight: '1.6'}}>
                    {techData[activeTab].desc}
                </p>
              </div>

              <div className="progress-box">
                <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem'}}>
                  <span>Proficiency</span>
                  <span style={{color: 'var(--primary)'}}>{techData[activeTab].level}%</span>
                </div>
                <div className="bar-bg">
                  <div 
                    className="bar-fill" 
                    style={{ width: `${techData[activeTab].level}%` }}
                  ></div>
                </div>
              </div>

              <div className="pills-container">
                {techData[activeTab].skills.map((skill, i) => (
                  <span key={i} className="tech-pill">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .display-content {
          opacity: 0;
          transform: translateY(10px);
          transition: 0.5s ease-out;
        }
        .display-content.active-content {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
};
export default ModernTechStack;
