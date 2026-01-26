import { useState, useEffect } from 'react'
import './styles/App.css'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Services from './components/Services.jsx'
import Trust from './components/Trust.jsx'
import TechDashboard from './components/TechDashboard.jsx'
import OurProcessTimeline from "./components/Process.jsx";
import Portfolio from './components/Portfolio.jsx';
import Testimonials from './components/Testimonials.jsx';
import CTA from './components/CTA.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

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

  return (
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
  )
}

export default App