
import '../styles/Portfolio.css'
import projectThumb from '../assets/project-thumb.png'

const Portfolio = () => {
    const projects = [
        {
            id: 1,
            title: "Nexus Dashboard",
            image: projectThumb,
            problem: "Users struggled with fragmented data visualization across multiple platforms.",
            solution: "Engineered a unified, real-time analytics dashboard using React and D3.js.",
            result: "Increased user efficiency by 40% and reduced reporting time by half.",
            techStack: ["React", "D3.js", "Node.js", "MongoDB"],
            demoLink: "#",
            repoLink: "#"
        },
        {
            id: 2,
            title: "E-Commerce Scale",
            image: projectThumb, // Placeholder, would ideally differ
            problem: "Legacy store crashed during high-traffic sales events.",
            solution: "Migrated to a headless architecture with Next.js and Shopify Storefront API.",
            result: "Achieved 99.99% uptime during Black Friday and 2x faster page loads.",
            techStack: ["Next.js", "Shopify", "Tailwind", "Redis"],
            demoLink: "#",
            repoLink: "#"
        }
    ]

    return (
        <section className="portfolio-section" id="case-studies">
            <div className="portfolio-container">
                <div className="portfolio-header">
                    <h2>Selected <span>Case Studies</span></h2>
                    <p>
                        Real-world challenges solved with engineering precision and creative design.
                    </p>
                </div>

                <div className="projects-grid">
                    {projects.map((project, index) => (
                        <div
                            key={project.id}
                            className={`project-card ${index % 2 !== 0 ? 'reverse' : ''}`}
                        >
                            <div className="project-image">
                                <img src={project.image} alt={project.title} loading="lazy" />
                            </div>

                            <div className="project-content">
                                <h3 className="project-title">{project.title}</h3>

                                <div className="problem-solution">
                                    <div className="ps-item">
                                        <strong>Problem</strong>
                                        <p>{project.problem}</p>
                                    </div>
                                    <div className="ps-item">
                                        <strong>Solution</strong>
                                        <p>{project.solution}</p>
                                    </div>
                                    <div className="ps-item">
                                        <strong>Result</strong>
                                        <p>{project.result}</p>
                                    </div>
                                </div>

                                <div className="project-tech">
                                    {project.techStack.map((tech, i) => (
                                        <span key={i} className="tech-tag">{tech}</span>
                                    ))}
                                </div>

                                <div className="project-actions">
                                    <a href={project.demoLink} className="action-btn primary">
                                        Live Demo <span>↗</span>
                                    </a>
                                    <a href={project.repoLink} className="action-btn secondary">
                                        GitHub
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Portfolio
