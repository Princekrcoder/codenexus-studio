import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../styles/Navbar.css'

const Navbar = ({ theme, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { user, isAuthenticated, loading } = useAuth()
  const navigate = useNavigate()

  const getDashboardUrl = () => {
    if (!user) return '/login'
    const routes = { Admin: '/admin', Manager: '/manager', Client: '/client', Developer: '/' }
    return routes[user.role] || '/login'
  }

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
        {!loading && isAuthenticated
          ? <button className="nav-login-btn" onClick={() => navigate(getDashboardUrl())}>Dashboard</button>
          : <Link to="/login" className="nav-login-btn">Login</Link>
        }
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'light' ? '🌞' : '🌙'}
        </button>
      </div>
    </nav>
  )
}

export default Navbar