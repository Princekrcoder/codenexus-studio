import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Navbar.css'

const Navbar = ({ theme, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className={isScrolled ? 'scrolled' : ''}>
      <div className="logo">Code<span>Nexus</span>.</div>

      <div className="nav-right">
        <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">☰</button>
        <div className={`nav-links ${isMenuOpen ? 'show' : ''}`}>
          <a href="#solutions">Solutions</a>
          <a href="#case-studies">Case Studies</a>
          <a href="#pricing">Pricing</a>
          <a href="#about">About</a>
        </div>
        <Link to="/login" className="nav-login-btn">Login</Link>
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'light' ? '🌞' : '🌙'}
        </button>
      </div>
    </nav>
  )
}

export default Navbar