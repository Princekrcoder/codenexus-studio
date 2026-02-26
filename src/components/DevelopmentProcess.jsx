import React from "react";

const processSteps = [
  {
    id: 1,
    title: "Discovery",
    description:
      "We understand your vision, requirements, and business goals to define the right strategy.",
    icon: "🔍",
  },
  {
    id: 2,
    title: "Planning",
    description:
      "We design wireframes, workflows, and architecture to ensure smooth execution.",
    icon: "🧭",
  },
  {
    id: 3,
    title: "Development",
    description:
      "Our team builds scalable, high-performance solutions using modern technologies.",
    icon: "💻",
  },
  {
    id: 4,
    title: "Testing",
    description:
      "We rigorously test for security, performance, and reliability before launch.",
    icon: "🧪",
  },
  {
    id: 5,
    title: "Deployment",
    description:
      "We launch, monitor, and support your product for long-term success.",
    icon: "🚀",
  },
];

const DevelopmentProcess = () => {
  return (
    <section className="development-process">
      <div className="container">
        <div className="section-header">
          <h2>
            Our Development <span>Process</span>
          </h2>
          <p>A structured approach that turns ideas into powerful digital products.</p>
        </div>

        <div className="process-grid">
          {processSteps.map((step) => (
            <div key={step.id} className="process-card">
              <div className="icon-box">{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .development-process {
          padding: 90px 0;
        }

        .container {
          max-width: 1200px;
          margin: auto;
          padding: 0 20px;
        }

        .section-header {
          text-align: center;
          margin-bottom: 70px;
        }

        .section-header h2 {
          font-size: 2.6rem;
          font-weight: 700;
          color: #fff;
        }

        .section-header span {
          color: #646cff;
        }

        .section-header p {
          margin-top: 12px;
          color: #aaa;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .process-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 32px;
        }

        .process-card {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 18px;
          padding: 36px 28px;
          text-align: center;
          transition: all 0.35s ease;
          position: relative;
        }

        .process-card::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 18px;
          background: radial-gradient(
            circle at top,
            rgba(100, 108, 255, 0.15),
            transparent 70%
          );
          opacity: 0;
          transition: opacity 0.35s ease;
        }

        .process-card:hover {
          transform: translateY(-8px);
          border-color: #646cff;
        }

        .process-card:hover::after {
          opacity: 1;
        }

        .icon-box {
          width: 70px;
          height: 70px;
          margin: 0 auto 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          border-radius: 16px;
          background: rgba(100, 108, 255, 0.15);
        }

        .process-card h3 {
          font-size: 1.4rem;
          font-weight: 600;
          margin-bottom: 14px;
          color: #fff;
        }

        .process-card p {
          color: #aaa;
          line-height: 1.6;
          font-size: 0.95rem;
        }

        @media (max-width: 768px) {
          .section-header h2 {
            font-size: 2.1rem;
          }
        }
      `}</style>
    </section>
  );
};

export default DevelopmentProcess;
