
import '../styles/Footer.css'

const Footer = () => {
    return (
        <footer className="footer-section">
            <div className="footer-container">

                <div className="footer-grid">
                    {/* Brand Column */}
                    <div className="footer-col footer-brand">
                        <div className="logo">Code<span>Nexus</span>.</div>
                        <p className="footer-desc">
                            Building scalable, high-performance digital experiences for forward-thinking companies.
                        </p>
                        <div className="footer-socials">
                            <a href="#" className="footer-social-icon">Li</a>
                            <a href="#" className="footer-social-icon">Tw</a>
                            <a href="#" className="footer-social-icon">Gh</a>
                            <a href="#" className="footer-social-icon">Ig</a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-col">
                        <h3>Company</h3>
                        <ul className="footer-links">
                            <li><a href="#about">About Us</a></li>
                            <li><a href="#portfolio">Our Work</a></li>
                            <li><a href="#careers">Careers</a></li>
                            <li><a href="#contact">Contact</a></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div className="footer-col">
                        <h3>Services</h3>
                        <ul className="footer-links">
                            <li><a href="#service-web">Web Development</a></li>
                            <li><a href="#service-ui">UI/UX Design</a></li>
                            <li><a href="#service-seo">SEO Optimization</a></li>
                            <li><a href="#service-consulting">Tech Consulting</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="footer-col">
                        <h3>Contact</h3>
                        <ul className="footer-links">
                            <li><a href="mailto:hello@codenexus.com">hello@codenexus.com</a></li>
                            <li><a href="tel:+15551234567">+1 (555) 123-4567</a></li>
                            <li><span>San Francisco, CA</span></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="footer-bottom">
                    <p className="copyright">
                        &copy; {new Date().getFullYear()} CodeNexus Studio. All rights reserved.
                    </p>
                    <div className="legal-links">
                        <a href="#privacy">Privacy Policy</a>
                        <a href="#terms">Terms of Service</a>
                    </div>
                </div>

            </div>
        </footer>
    )
}

export default Footer
