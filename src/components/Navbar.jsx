import { useState } from 'react'
import './Navbar.css'

const Navbar = ({ theme, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav>
      <div className="logo">Code<span>Nexus</span>.</div>

      <div className="nav-right">
        <button className="menu-toggle" onClick={toggleMenu}>☰</button>
        <div className={`nav-links ${isMenuOpen ? 'show' : ''}`}>
          <a href="#solutions">Solutions</a>
          <a href="#case-studies">Case Studies</a>
          <a href="#pricing">Pricing</a>
          <a href="#about">About</a>
        </div>
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'light' ? '🌞' : '🌙'}
        </button>
      </div>
    </nav>
  )
}

export default Navbar