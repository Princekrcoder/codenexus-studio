import '../styles/Footer.css'
import { FaLinkedinIn, FaGithub, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";
import { MdLocationOn } from "react-icons/md";

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
                            <a
                                href="https://www.linkedin.com/"
                                target="_blank"
                                rel="noreferrer"
                                className="footer-social-icon"
                                aria-label="LinkedIn"
                            >
                                <FaLinkedinIn />
                            </a>

                            <a
                                href="https://twitter.com/"
                                target="_blank"
                                rel="noreferrer"
                                className="footer-social-icon"
                                aria-label="Twitter"
                            >
                                <FaXTwitter />
                            </a>

                            <a
                                href="https://github.com/"
                                target="_blank"
                                rel="noreferrer"
                                className="footer-social-icon"
                                aria-label="GitHub"
                            >
                                <FaGithub />
                            </a>

                            <a
                                href="https://www.instagram.com/"
                                target="_blank"
                                rel="noreferrer"
                                className="footer-social-icon"
                                aria-label="Instagram"
                            >
                                <FaInstagram />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-col">
                        <h3>Company</h3>
                        <ul className="footer-links">
                            <li><a href="#about">About Us</a></li>
                            <li><a href="#portfolio">Our Work</a></li>
                            <li><a href="#careers">Careers</a></li>
                            <li><a href="#contact-form">Contact</a></li>
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
                        <ul className="footer-links footer-contact">
                            <li>
                                <a href="mailto:codenexusstudio@gmail.com">
                                    <HiOutlineMail />
                                    <span>codenexusstudio@gmail.com</span>
                                </a>
                            </li>

                            <li>
                                <span className="footer-location">
                                    <MdLocationOn />
                                    <span>Mohali, India</span>
                                </span>
                            </li>
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
