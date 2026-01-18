import React from 'react';
import './Process.css';

const Process = () => {
  const processSteps = [
    {
      title: "Discovery & Planning",
      description: "We start by understanding your business goals, target audience, and technical requirements. This phase includes competitor analysis, feature planning, and technology stack selection.",
      deliverables: ["Project Roadmap", "Technical Specs", "Timeline & Budget"]
    },
    {
      title: "Design & Prototyping",
      description: "Our design team creates wireframes, mockups, and interactive prototypes that align with your brand identity and user experience goals.",
      deliverables: ["UI/UX Design", "Interactive Prototype", "Design System"]
    },
    {
      title: "Development & Testing",
      description: "Clean, scalable code development with continuous testing. We follow agile methodology with regular updates and feedback loops.",
      deliverables: ["Clean Codebase", "Quality Assurance", "Performance Testing"]
    },
    {
      title: "Launch & Optimization",
      description: "Seamless deployment with performance monitoring, SEO optimization, and post-launch support to ensure everything runs smoothly.",
      deliverables: ["Live Deployment", "SEO Setup", "Ongoing Support"]
    }
  ];

  const stats = [
    { number: "2-4", label: "Weeks Average" },
    { number: "100%", label: "Transparency" },
    { number: "24/7", label: "Communication" }
  ];

  return (
    <section className="process-section">
      <div className="process-container">
        <div className="process-header">
          <h2>Our <span>Process</span></h2>
          <p>
            A streamlined, transparent workflow designed to deliver exceptional 
            results while keeping you informed every step of the way.
          </p>
        </div>

        <div className="process-timeline">
          {processSteps.map((step, index) => (
            <div key={index} className="process-step">
              <div className="step-content">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                <div className="step-deliverables">
                  {step.deliverables.map((deliverable, idx) => (
                    <span key={idx} className="deliverable">{deliverable}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Process Stats */}
        <div className="process-stats">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;