import { Link } from 'react-router-dom'
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
                        <Link to="/login" className="cta-btn primary">
                            Start Your Project <span>🚀</span>
                        </Link>
                        <a href="https://wa.me/918092701770?text=Hi%20CodeNexus%20Studio,%20I%20have%20a%20project%20in%20mind." target="_blank" rel="noreferrer" className="cta-btn secondary">
                            WhatsApp Us
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CTA
