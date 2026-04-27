import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../styles/Navbar.css'

const Navbar = ({ theme, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

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

  // Role-based dashboard URL
  const getDashboardUrl = () => {
    if (!user) return '/login'
    if (user.role === 'Client') return '/client'
    if (user.role === 'Manager') return '/manager'
    return '/admin' // Admin, Developer
  }

  const handleLogout = async () => {
    await logout()
    navigate('/')
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

        {isAuthenticated ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Link to={getDashboardUrl()} className="nav-login-btn">Dashboard</Link>
            <button
              onClick={handleLogout}
              className="nav-login-btn"
              style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer' }}
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="nav-login-btn">Login</Link>
        )}

        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'light' ? '🌞' : '🌙'}
        </button>
      </div>
    </nav>
  )
}

export default Navbar