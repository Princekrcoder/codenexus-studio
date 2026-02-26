import React, { useEffect, useRef } from "react";

export default function OurProcessTimeline() {
  const containerRef = useRef(null);

  useEffect(() => {
    const observerOptions = { threshold: 0.3 };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, observerOptions);

    const items = containerRef.current?.querySelectorAll(".timeline-item");
    items?.forEach((item) => observer.observe(item));

    return () => {
      items?.forEach((item) => observer.unobserve(item));
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Google Fonts import can be in index.html (recommended), but kept here for easy use */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;500;700&family=Poppins:wght@600;800&display=swap');

        :root {
          --bg: #050505;
          --card-bg: rgba(15, 15, 15, 0.8);
          --accent-cyan: #00f2ff;
          --accent-purple: #7000ff;
          --text-main: #ffffff;
          --text-dim: #a0a0a0;
        }

        body {
          margin: 0;
          padding: 0;
          background-color: var(--bg);
          color: var(--text-main);
          font-family: 'Inter', sans-serif;
          overflow-x: hidden;
        }

        /* Background Glows */
        body::before {
          content: "";
          position: fixed;
          top: -10%; left: -10%;
          width: 40%; height: 40%;
          background: radial-gradient(circle, rgba(112, 0, 255, 0.15), transparent 70%);
          z-index: -1;
        }

        body::after {
          content: "";
          position: fixed;
          bottom: -10%; right: -10%;
          width: 45%; height: 45%;
          background: radial-gradient(circle, rgba(0, 242, 255, 0.12), transparent 70%);
          z-index: -1;
        }

        .container {
          max-width: 1100px;
          margin: 100px auto;
          padding: 0 20px;
        }

        .title {
          text-align: center;
          font-family: 'Poppins', sans-serif;
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: 80px;
          background: linear-gradient(to bottom, #fff 30%, #666);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .subtitle {
          text-align:center;
          max-width: 720px;
          margin: -55px auto 70px;
          color: var(--text-dim);
          font-size: 1rem;
          line-height: 1.7;
        }

        .timeline {
          position: relative;
        }

        /* Glowing vertical line */
        .timeline::before {
          content: "";
          position: absolute;
          left: 50%;
          width: 2px;
          height: 100%;
          background: linear-gradient(to bottom,
            transparent,
            var(--accent-cyan) 15%,
            var(--accent-purple) 85%,
            transparent);
          transform: translateX(-50%);
        }

        .timeline-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          margin-bottom: 100px;
          opacity: 0;
          transform: translateY(50px);
          transition: all 0.8s cubic-bezier(0.2, 1, 0.3, 1);
          position: relative;
        }

        .timeline-item.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .timeline-item:nth-child(even) {
          flex-direction: row-reverse;
        }

        .timeline-content {
          width: 42%;
          padding: 30px;
          background: var(--card-bg);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 20px;
          position: relative;
          backdrop-filter: blur(10px);
          transition: transform 0.3s ease, border 0.3s ease;
        }

        /* Neon hover effect */
        .timeline-content:hover {
          transform: scale(1.03);
          border: 1px solid var(--accent-cyan);
          box-shadow: 0 0 22px rgba(0, 242, 255, 0.22);
        }

        .timeline-dot {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 12px;
          height: 12px;
          background: var(--bg);
          border: 3px solid var(--accent-cyan);
          border-radius: 50%;
          z-index: 2;
          box-shadow: 0 0 15px var(--accent-cyan);
        }

        /* Process tag styling */
        .step-tag {
          font-size: 0.78rem;
          font-weight: 800;
          color: var(--accent-cyan);
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 10px;
          display: block;
        }

        .timeline-content h3 {
          font-family: 'Poppins', sans-serif;
          font-size: 1.5rem;
          margin: 10px 0;
          color: #fff;
        }

        .timeline-content p {
          color: var(--text-dim);
          line-height: 1.7;
          font-size: 0.95rem;
          margin: 0;
        }

        /* Optional bullet points inside card */
        .points {
          margin-top: 14px;
          padding-left: 16px;
          color: #bdbdbd;
          font-size: 0.92rem;
          line-height: 1.6;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .timeline::before { left: 30px; }
          .timeline-item { flex-direction: row !important; margin-bottom: 60px; }
          .timeline-content { width: calc(100% - 80px); margin-left: 60px; }
          .timeline-dot { left: 30px; }
        }
      `}</style>

      <div className="container" ref={containerRef}>
        <h1 className="title">Our Process</h1>
        <p className="subtitle">
          We follow a structured workflow to ensure fast execution, high-quality design,
          and scalable development.
        </p>

        <div className="timeline">
          {/* ITEM 1 */}
          <div className="timeline-item">
            <div className="timeline-content">
              <span className="step-tag">STEP 01 — DISCOVERY</span>
              <h3>Understand the problem</h3>
              <p>
                We identify the user pain-points, clarify requirements, and define the
                scope of the solution.
              </p>
              <ul className="points">
                <li>User research & needs</li>
                <li>Feature planning</li>
                <li>Goal definition</li>
              </ul>
            </div>
            <div className="timeline-dot"></div>
          </div>

          {/* ITEM 2 */}
          <div className="timeline-item">
            <div className="timeline-content">
              <span className="step-tag">STEP 02 — DESIGN</span>
              <h3>Build the UI/UX system</h3>
              <p>
                We create wireframes and a modern UI with accessibility, performance,
                and clarity.
              </p>
              <ul className="points">
                <li>Wireframes & layout</li>
                <li>Design system</li>
                <li>Prototype review</li>
              </ul>
            </div>
            <div className="timeline-dot"></div>
          </div>

          {/* ITEM 3 */}
          <div className="timeline-item">
            <div className="timeline-content">
              <span className="step-tag">STEP 03 — DEVELOPMENT</span>
              <h3>Implement & integrate features</h3>
              <p>
                We develop frontend + backend, integrate APIs, and ensure code quality
                with clean architecture.
              </p>
              <ul className="points">
                <li>Frontend + backend build</li>
                <li>API integration</li>
                <li>Version control (Git)</li>
              </ul>
            </div>
            <div className="timeline-dot"></div>
          </div>

          {/* ITEM 4 */}
          <div className="timeline-item">
            <div className="timeline-content">
              <span className="step-tag">STEP 04 — TESTING</span>
              <h3>Quality assurance</h3>
              <p>
                We test usability, bugs, edge cases, and performance to make it stable
                and reliable.
              </p>
              <ul className="points">
                <li>Bug fixing & optimization</li>
                <li>Cross-device testing</li>
                <li>Security & validation</li>
              </ul>
            </div>
            <div className="timeline-dot"></div>
          </div>

          {/* ITEM 5 */}
          <div className="timeline-item">
            <div className="timeline-content">
              <span className="step-tag">STEP 05 — DEPLOYMENT</span>
              <h3>Launch & monitor</h3>
              <p>
                We deploy on cloud, monitor performance, and continuously improve based
                on feedback.
              </p>
              <ul className="points">
                <li>Deployment (Vercel/AWS)</li>
                <li>Monitoring & analytics</li>
                <li>Continuous improvements</li>
              </ul>
            </div>
            <div className="timeline-dot"></div>
          </div>
        </div>
      </div>
    </>
  );
}
