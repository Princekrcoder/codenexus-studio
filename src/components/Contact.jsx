
import '../styles/Contact.css'

const Contact = () => {
    return (
        <section className="contact-section" id="contact-form">
            <div className="contact-container">

                {/* Left Info Column */}
                <div className="contact-info">
                    <div className="contact-header">
                        <h2>Let's Build Something <span>Great</span></h2>
                    </div>
                    <p className="contact-desc">
                        Whether you have a specific project in mind or just want to explore new possibilities,
                        we're here to help you navigate the digital landscape.
                    </p>

                    <div className="info-cards">
                        <div className="info-card">
                            <div className="icon-box">✉️</div>
                            <div className="info-content">
                                <h4>Email Us</h4>
                                <p>hello@codenexus.com</p>
                            </div>
                        </div>

                        <div className="info-card">
                            <div className="icon-box">📞</div>
                            <div className="info-content">
                                <h4>Call Us</h4>
                                <p>+1 (555) 123-4567</p>
                            </div>
                        </div>

                        <div className="info-card">
                            <div className="icon-box">📍</div>
                            <div className="info-content">
                                <h4>Visit Us</h4>
                                <p>San Francisco, CA</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Form Column */}
                <div className="contact-form-wrapper">
                    <div className="social-links-top">
                        <h4>Connect With Us</h4>
                        <div className="social-icons">
                            <a href="#" className="social-icon">Li</a>
                            <a href="#" className="social-icon">Tw</a>
                            <a href="#" className="social-icon">Gh</a>
                            <a href="#" className="social-icon">Ig</a>
                        </div>
                    </div>

                    <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                        <div className="form-group">
                            <label>Your Name</label>
                            <input type="text" className="form-input" placeholder="John Doe" />
                        </div>

                        <div className="form-group">
                            <label>Email Address</label>
                            <input type="email" className="form-input" placeholder="john@example.com" />
                        </div>

                        <div className="form-group">
                            <label>Message</label>
                            <textarea className="form-textarea" placeholder="Tell us about your project..."></textarea>
                        </div>

                        <button type="submit" className="submit-btn">
                            Send Message
                        </button>
                    </form>
                </div>

            </div>
        </section>
    )
}

export default Contact
