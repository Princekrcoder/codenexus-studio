
import '../styles/CTA.css'

const CTA = () => {
    return (
        <section className="cta-section" id="contact">
            <div className="cta-container">
                <div className="cta-card">
                    <h2>Have a Project in Mind?</h2>
                    <p>
                        Let's turn your vision into a high-performance digital reality.
                        We build scalable solutions that drive real growth.
                    </p>

                    <div className="cta-actions">
                        <a href="#start" className="cta-btn primary">
                            Start Your Project <span>🚀</span>
                        </a>
                        <a href="mailto:hello@codenexus.com" className="cta-btn secondary">
                            Contact Us
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CTA
