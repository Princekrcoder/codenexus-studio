import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import './styles/App.css'

import SEO from "./components/SEO"
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import AdminLayout from './admin/AdminLayout.jsx'
import ClientLogin from './client/ClientLogin.jsx'
import ClientLayout from './client/ClientLayout.jsx'
import ManagerLayout from './manager/ManagerLayout.jsx'

import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Services from './components/Services.jsx'
import Trust from './components/Trust.jsx'
import TechDashboard from './components/TechDashboard.jsx'
import OurProcessTimeline from "./components/Process.jsx"
import Portfolio from './components/Portfolio.jsx'
import Testimonials from './components/Testimonials.jsx'
import CTA from './components/CTA.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

function App() {
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'light') {
      setTheme('light')
      document.body.classList.add('light-theme')
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    document.body.classList.toggle('light-theme')
    localStorage.setItem('theme', newTheme)
  }

  const HomePage = () => (
    <>
      {/* SEO for Home Page */}
      <SEO
        title="CodeNexus Studio | Web Development Company in Mohali (Punjab)"
        description="CodeNexus Studio provides Web Development, Web Apps, E-commerce, Portfolio Websites and Tech Consulting in Mohali, Punjab. Serving India and global clients."
        canonical="https://codenexusstudio.vercel.app/"
        ogImage="/og-image.png"
      />
      <div className="App">
        <div className="bg-blob blob-1"></div>
        <div className="bg-blob blob-2"></div>

        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <Hero />
        <Services />
        <Trust />
        <TechDashboard />
        <Portfolio />
        <Testimonials />
        <CTA />
        <OurProcessTimeline />
        <Contact />
        <Footer />
      </div>
    </>
  )

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login theme={theme} toggleTheme={toggleTheme} />} />
      <Route path="/register" element={<Register theme={theme} toggleTheme={toggleTheme} />} />
      <Route path="/admin/*" element={<AdminLayout theme={theme} toggleTheme={toggleTheme} />} />
      <Route path="/client/login" element={<ClientLogin theme={theme} toggleTheme={toggleTheme} />} />
      <Route path="/client/*" element={<ClientLayout theme={theme} toggleTheme={toggleTheme} />} />
      <Route path="/manager/*" element={<ManagerLayout theme={theme} toggleTheme={toggleTheme} />} />
    </Routes>
  )
}

export default App

