
import { useState } from 'react'
import '../styles/TechDashboard.css'

const TechDashboard = () => {
  const [activeTab, setActiveTab] = useState('frontend')

  const techData = {
    frontend: {
      title: "Client Side",
      tag: "UI/UX",
      description: "Crafting immersive visual experiences with modern, reactive libraries and high-performance frameworks.",
      technologies: ["React.js", "Next.js", "Tailwind CSS", "TypeScript", "Redux Toolkit", "Framer Motion"]
    },
    backend: {
      title: "Server Side",
      tag: "Core Logic",
      description: "Building robust, scalable server architectures that power your application's business logic and API integrations.",
      technologies: ["Node.js", "Express", "Python / Django", "GoLang", "GraphQL", "WebSockets"]
    },
    fullstack: {
      title: "Full Stack",
      tag: "End-to-End",
      description: "Seamless end-to-end development ensuring perfect synchronization between client and server layers.",
      technologies: ["MERN Stack", "T3 Stack", "JAMstack", "Serverless Functions"]
    },
    database: {
      title: "Database",
      tag: "Data Layer",
      description: "Secure, optimized data storage solutions designed for reliability and high-speed retrieval.",
      technologies: ["MongoDB", "PostgreSQL", "Redis", "Firebase", "Supabase"]
    },
    devops: {
      title: "DevOps",
      tag: "Infrastructure",
      description: "Automated CI/CD pipelines, containerization, and cloud infrastructure for zero-downtime deployments.",
      technologies: ["Docker", "Kubernetes", "AWS", "Vercel", "GitHub Actions"]
    }
  }

  return (
    <section className="tech-dashboard">
      <div className="container">

        <div className="dashboard-header">
          <h2>System <span className="highlight">Architecture</span></h2>
          <p>
            Explore the cutting-edge technologies that power our high-performance solutions.
          </p>
        </div>

        <div className="dashboard-interface">
          {/* Sidebar Navigation */}
          <div className="tech-sidebar">
            {Object.keys(techData).map((key) => (
              <button
                key={key}
                className={`tab-btn ${activeTab === key ? 'active' : ''}`}
                onClick={() => setActiveTab(key)}
                aria-label={`View ${techData[key].title} technologies`}
              >
                <span className="dot"></span> {techData[key].title}
              </button>
            ))}
          </div>

          {/* Main Content Display */}
          <div className="tech-display">
            {Object.keys(techData).map((key) => (
              <div
                key={key}
                className={`tech-content ${activeTab === key ? 'active-content' : ''}`}
              >
                {activeTab === key && (
                  <>
                    <div className="content-header">
                      <h3>{techData[key].title}</h3>
                      <span className="tag">{techData[key].tag}</span>
                    </div>

                    <p className="content-description">
                      {techData[key].description}
                    </p>

                    <div className="tech-icons-grid">
                      {techData[key].technologies.map((tech, index) => (
                        <div key={index} className="tech-pill">
                          {tech}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}

export default TechDashboard