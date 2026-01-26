import React, { useEffect, useRef } from "react";
import '../styles/Process.css';

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

        const items = containerRef.current?.querySelectorAll(".process-timeline-item");
        items?.forEach((item) => observer.observe(item));

        return () => {
            items?.forEach((item) => observer.unobserve(item));
            observer.disconnect();
        };
    }, []);

    return (
        <section className="process-wrapper">
            <div className="process-container" ref={containerRef}>
                <h1 className="process-title">Our Process</h1>
                <p className="process-subtitle">
                    We follow a structured workflow to ensure fast execution, high-quality design,
                    and scalable development.
                </p>

                <div className="process-timeline">
                    {/* ITEM 1 */}
                    <div className="process-timeline-item">
                        <div className="process-timeline-content">
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
                        <div className="process-timeline-dot"></div>
                    </div>

                    {/* ITEM 2 */}
                    <div className="process-timeline-item">
                        <div className="process-timeline-content">
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
                        <div className="process-timeline-dot"></div>
                    </div>

                    {/* ITEM 3 */}
                    <div className="process-timeline-item">
                        <div className="process-timeline-content">
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
                        <div className="process-timeline-dot"></div>
                    </div>

                    {/* ITEM 4 */}
                    <div className="process-timeline-item">
                        <div className="process-timeline-content">
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
                        <div className="process-timeline-dot"></div>
                    </div>

                    {/* ITEM 5 */}
                    <div className="process-timeline-item">
                        <div className="process-timeline-content">
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
                        <div className="process-timeline-dot"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
