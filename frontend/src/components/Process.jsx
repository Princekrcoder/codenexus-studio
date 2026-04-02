import React, { useEffect, useRef } from "react";
import { Search, PenTool, Code, Bug, Rocket } from "lucide-react";
import '../styles/Process.css';

export default function OurProcessTimeline() {
    const containerRef = useRef(null);

    useEffect(() => {
        const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        }, observerOptions);

        const items = containerRef.current?.querySelectorAll(".p-step-item");
        items?.forEach((item) => observer.observe(item));

        return () => {
            items?.forEach((item) => observer.unobserve(item));
            observer.disconnect();
        };
    }, []);

    return (
        <section className="p-wrapper" id="process" ref={containerRef}>
            <div className="p-header-section">
                <span className="p-workflow-tag">The Workflow</span>
                <h2 className="p-title">Our Process</h2>
                <p className="p-subtitle">
                    We follow a structured workflow to ensure fast execution, high-quality design, and scalable development.
                </p>
            </div>

            <div className="p-steps-container">
                <div className="p-connecting-line"></div>

                {/* STEP 01 */}
                <div className="p-step-item">
                    <div className="p-step-content p-align-right order-text">
                        <span className="p-step-number text-primary">STEP 01 — DISCOVERY</span>
                        <h3 className="p-step-title">Understand the problem</h3>
                        <p className="p-step-desc">
                            We identify the user pain-points, clarify requirements, and define the scope of the solution.
                        </p>
                        <div className="p-step-badges align-end">
                            <span>User research & needs</span>
                            <span>Feature planning</span>
                            <span>Goal definition</span>
                        </div>
                    </div>
                    <div className="p-step-icon-container border-primary">
                        <Search className="p-icon text-primary-icon" size={32} />
                    </div>
                    <div className="p-step-image-container order-image">
                        <img 
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrqUI6nyjj3lWAxkt65QQfyyGe3kfr5COHkdgieJ4ccoqkG1WnKVaGr2KtdyWCiZk6_XO2Zr6kye8dI7lAcsH4eCns49q0EqDhikx5Tm84VxoItk7CzUcWBEhpuHaoweH_dSSUkBF6VNl-bhNcPczEFwvp8WA6ysDnxwvC_RO0kNAqCxw1OmXkg0BZX3ydwlyTqcN-pYijMKm6KhsTBXs8q8ol1Ded0kN84h3Hap1NycGbGwcEmVsbhzUTecifP6FBjGNyL9lPbZ4v" 
                            alt="Discovery UI" 
                        />
                    </div>
                </div>

                {/* STEP 02 */}
                <div className="p-step-item p-reverse">
                    <div className="p-step-content p-align-left order-text">
                        <span className="p-step-number text-secondary">STEP 02 — DESIGN</span>
                        <h3 className="p-step-title">Build the UI/UX system</h3>
                        <p className="p-step-desc">
                            We create wireframes and a modern UI with accessibility, performance, and clarity.
                        </p>
                        <div className="p-step-badges align-start">
                            <span className="bg-secondary-dim">Wireframes & layout</span>
                            <span className="bg-secondary-dim">Design system</span>
                            <span className="bg-secondary-dim">Prototype review</span>
                        </div>
                    </div>
                    <div className="p-step-icon-container border-secondary">
                        <PenTool className="p-icon text-secondary-icon" size={32} />
                    </div>
                    <div className="p-step-image-container order-image">
                        <img 
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-w8X-DOp2vI5NRC0MzuDj1ZFkFyCxTGQcB_rduH_Kd76kJxEUAFo2Ine_NjLVhm0QApjxUrvQC4w2qnA_jAU-xIxmQTxkVNxEtxHpj8k-ORjirLdQAyIdYDdAI8YmV7gut_46PxIHdOM8suYLQVbLfNc7CyXNEaQtvsl86LGR2P3e8HNvboCk4AmGHeIEl2bpbJ4F3xxGC6tLnQYQttkNmBeci14bAgQn2AoAUF9EWJXpirZX6N3Ii1Pe8sHFn2j5DNdoVgH6xuri" 
                            alt="Design UX" 
                        />
                    </div>
                </div>

                {/* STEP 03 */}
                <div className="p-step-item">
                    <div className="p-step-content p-align-right order-text">
                        <span className="p-step-number text-tertiary">STEP 03 — DEVELOPMENT</span>
                        <h3 className="p-step-title">Implement & integrate</h3>
                        <p className="p-step-desc">
                            We develop frontend + backend, integrate APIs, and ensure code quality with clean architecture.
                        </p>
                        <div className="p-step-badges align-end">
                            <span className="bg-tertiary-dim">Frontend + backend build</span>
                            <span className="bg-tertiary-dim">API integration</span>
                            <span className="bg-tertiary-dim">Version control (Git)</span>
                        </div>
                    </div>
                    <div className="p-step-icon-container border-tertiary">
                        <Code className="p-icon text-tertiary-icon" size={32} />
                    </div>
                    <div className="p-step-image-container order-image">
                        <img 
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-SoIKKaCd-0QGSMItOZsuv7R50OmafiKtxwOoP_pZYb8R85IK6AW8qqi4O1BHpFr8AlJxZ78Q3Mf5etKvzs4SnHh4qpShI25fFUq5j0eVVup0C0GatU_vNnHvgguGPOlAhbqLLjLvrfeAwni6q-EiYfAiGRpk7v0pywc3adH_j5FIdkXEE5RXtH47k8ICBnEtKuvyHsStsvvXOLGPcqVDOg8g1xKXm40edRqUFzOAOerrzb07y5rakWV8hPiDPJpeGEP7A0JCkKu1" 
                            alt="Code Editor" 
                        />
                    </div>
                </div>

                {/* STEP 04 */}
                <div className="p-step-item p-reverse">
                    <div className="p-step-content p-align-left order-text">
                        <span className="p-step-number text-error">STEP 04 — TESTING</span>
                        <h3 className="p-step-title">Quality assurance</h3>
                        <p className="p-step-desc">
                            We test usability, bugs, edge cases, and performance to make it stable and reliable.
                        </p>
                        <div className="p-step-badges align-start">
                            <span className="bg-error-dim">Bug fixing & optimization</span>
                            <span className="bg-error-dim">Cross-device testing</span>
                            <span className="bg-error-dim">Security & validation</span>
                        </div>
                    </div>
                    <div className="p-step-icon-container border-error">
                        <Bug className="p-icon text-error-icon" size={32} />
                    </div>
                    <div className="p-step-image-container order-image">
                        <img 
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCrppn08zj-t5NP1sDFY3z3wBeOzN4nsb5VWhpl2RM4AMU_Q08WSLHnIcRBqKePUSUrg2D-kQ_-0fxHIN3ZfMUx1V0n82zT6g_scLFdXSdkoti4KxljNsLtiILuTJ3Heu9CH-aq-5nya7NgvAvLDvm8mADiQHi8Vv0FVsENhV5ZlFlUv18aXZAI5x9RIG2f6sZAa30kB9QBnCLfbetRbhS_oQWf4LPvC5TfH6pkq1AyCVc3s9X7FcIuqfuiXArU7OhP90GxImBV306Y" 
                            alt="Testing App" 
                        />
                    </div>
                </div>

                {/* STEP 05 */}
                <div className="p-step-item">
                    <div className="p-step-content p-align-right order-text">
                        <span className="p-step-number text-primary-fixed">STEP 05 — DEPLOYMENT</span>
                        <h3 className="p-step-title">Launch & monitor</h3>
                        <p className="p-step-desc">
                            We deploy on cloud, monitor performance, and continuously improve based on feedback.
                        </p>
                        <div className="p-step-badges align-end">
                            <span className="bg-primary-dim">Deployment (Vercel/AWS)</span>
                            <span className="bg-primary-dim">Monitoring & analytics</span>
                            <span className="bg-primary-dim">Continuous improvements</span>
                        </div>
                    </div>
                    <div className="p-step-icon-container border-primary-fixed">
                        <Rocket className="p-icon text-primary-fixed-icon" size={32} />
                    </div>
                    <div className="p-step-image-container order-image">
                        <img 
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuASdXmgncXQ-Bk0wOZdzVnep-GwCP58cvDT4ny5zfiiHAqh0UWpikcMTt0MzRgv7mDlDSgIZgREMA5uKRz3SitVJT2W02fPgsdupv71B9JZZt8slkgkRU1bUmOvFiQWlw8PdrPpvftnu2D6ew8hRZFB2SUYeiMpICcBsHoeHUEHPtxpljPQy0Zwrw9yPmqYEkW6MuGc0fgB_z_aq4Fu-sfjQftbhQ-mT9dieuqfBb_yTqOsYExOYvMC6RxrNKlsZiGtUEm7US3lucLF" 
                            alt="Deployment Cloud" 
                        />
                    </div>
                </div>

            </div>
        </section>
    );
}
