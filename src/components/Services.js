import React from 'react';
import './Services.css';

const Services = () => {
  return (
    <section className="services-section">
      <div className="services-container">
        <div className="services-header">
          <h2>Our <span>Services</span></h2>
          <p>
            High-performance web development and scalable digital solutions
            engineered to help modern businesses grow faster.
          </p>
        </div>

        {/* Service 1 */}
        <div className="service-row">
          <div className="service-content">
            <h3>Website <span>Building</span></h3>
            <p>
              We design and develop premium websites from scratch with a
              strong focus on performance, accessibility, and modern UI.
            </p>
            <ul className="service-list">
              <li>Custom UI / UX Design</li>
              <li>Business & E-commerce Websites</li>
              <li>Optimized, Scalable Codebase</li>
            </ul>
          </div>

          <div className="service-visual">
            <div className="code-box">
              <pre>{`.website {
  performance: blazing-fast;
  design: pixel-perfect;
  scalability: future-ready;
}`}</pre>
            </div>
          </div>
        </div>

        {/* Service 2 */}
        <div className="service-row reverse">
          <div className="service-content">
            <h3>Web <span>Solutions</span></h3>
            <p>
              End-to-end web solutions covering optimization, security,
              integrations, and long-term scalability.
            </p>
            <ul className="service-list">
              <li>SEO & Speed Optimization</li>
              <li>API & Database Integration</li>
              <li>Secure Cloud Deployment</li>
            </ul>
          </div>

          <div className="service-visual">
            <div className="solution-grid">
              <div className="solution-box">Analytics</div>
              <div className="solution-box">Security</div>
              <div className="solution-box">Support</div>
              <div className="solution-box">Growth</div>
            </div>
          </div>
        </div>

        {/* Service 3 */}
        <div className="service-row">
          <div className="service-content">
            <h3>Portfolio <span>Building</span></h3>
            <p>
              We create professional, conversion-focused portfolio websites
              that help developers, designers, and freelancers stand out
              and attract better opportunities.
            </p>
            <ul className="service-list">
              <li>Personal Brand–Focused Design</li>
              <li>Project Showcase & Case Studies</li>
              <li>SEO & Performance Optimized</li>
            </ul>
          </div>

          <div className="service-visual">
            <div className="solution-grid">
              <div className="solution-box">Personal Branding</div>
              <div className="solution-box">Case Studies</div>
              <div className="solution-box">Live Projects</div>
              <div className="solution-box">Hire-Ready</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;