import { useState } from 'react'
import '../styles/Contact.css'
import { FaLinkedinIn, FaGithub, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdLocationOn } from "react-icons/md";
import { HiOutlineMail } from "react-icons/hi";
import { FiPhoneCall } from "react-icons/fi";
import { contactAPI } from '../services/api'

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' })
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        setError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if (!formData.name || !formData.email || !formData.message) {
            setError('Please fill in all fields')
            return
        }

        setLoading(true)
        setError('')
        
        try {
            await contactAPI.submit(formData)
            setSuccess(true)
            setFormData({ name: '', email: '', message: '' })
            setTimeout(() => setSuccess(false), 5000)
        } catch (err) {
            setError(err.message || 'Failed to send message. Please try again.')
        } finally {
            setLoading(false)
        }
    }
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
                            <div className="icon-box">
                                <HiOutlineMail />
                            </div>
                            <div className="info-content">
                                <h4>Email Us</h4>
                                <p>codenexusstudio@gmail.com</p>
                            </div>
                        </div>

                        {/* ✅ Phone Added */}
                        <div className="info-card">
                            <div className="icon-box">
                                <FiPhoneCall />
                            </div>
                            <div className="info-content">
                                <h4>Call Us</h4>
                                <p>+91 8092701770</p>
                            </div>
                        </div>

                        <div className="info-card">
                            <div className="icon-box">
                                <MdLocationOn />
                            </div>
                            <div className="info-content">
                                <h4>Visit Us</h4>
                                <p>Mohali, India</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Form Column */}
                <div className="contact-form-wrapper">

                    <div className="social-links-top">
                        <h4>Connect With Us</h4>

                        <div className="social-icons">
                            <a
                                href="https://www.linkedin.com/"
                                target="_blank"
                                rel="noreferrer"
                                className="social-icon"
                                aria-label="LinkedIn"
                            >
                                <FaLinkedinIn />
                            </a>

                            <a
                                href="https://twitter.com/"
                                target="_blank"
                                rel="noreferrer"
                                className="social-icon"
                                aria-label="Twitter"
                            >
                                <FaXTwitter />
                            </a>

                            <a
                                href="https://github.com/"
                                target="_blank"
                                rel="noreferrer"
                                className="social-icon"
                                aria-label="GitHub"
                            >
                                <FaGithub />
                            </a>

                            <a
                                href="https://www.instagram.com/"
                                target="_blank"
                                rel="noreferrer"
                                className="social-icon"
                                aria-label="Instagram"
                            >
                                <FaInstagram />
                            </a>
                        </div>
                    </div>

                    <form className="contact-form" onSubmit={handleSubmit}>
                        {success && (
                            <div style={{ padding: '12px', marginBottom: '16px', backgroundColor: '#10b981', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
                                Message sent successfully! We'll get back to you soon.
                            </div>
                        )}
                        
                        {error && (
                            <div style={{ padding: '12px', marginBottom: '16px', backgroundColor: '#ef4444', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
                                {error}
                            </div>
                        )}

                        <div className="form-group">
                            <label>Your Name</label>
                            <input 
                                type="text" 
                                name="name"
                                className="form-input" 
                                placeholder="John Doe" 
                                value={formData.name}
                                onChange={handleChange}
                                disabled={loading}
                            />
                        </div>

                        <div className="form-group">
                            <label>Email Address</label>
                            <input 
                                type="email" 
                                name="email"
                                className="form-input" 
                                placeholder="john@example.com" 
                                value={formData.email}
                                onChange={handleChange}
                                disabled={loading}
                            />
                        </div>

                        <div className="form-group">
                            <label>Message</label>
                            <textarea 
                                name="message"
                                className="form-textarea" 
                                placeholder="Tell us about your project..."
                                value={formData.message}
                                onChange={handleChange}
                                disabled={loading}
                            ></textarea>
                        </div>

                        <button type="submit" className="submit-btn" disabled={loading}>
                            {loading ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>

                </div>

            </div>
        </section>
    )
}

export default Contact
