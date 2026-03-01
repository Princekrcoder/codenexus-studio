import { useState, useEffect, Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import './styles/App.css'

import SEO from "./components/SEO"
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Services from './components/Services.jsx'

// Lazy load portal routes
const Login = lazy(() => import('./components/Login.jsx'))
const Register = lazy(() => import('./components/Register.jsx'))
const ForgotPassword = lazy(() => import('./components/ForgotPassword.jsx'))
const ResetPassword = lazy(() => import('./components/ResetPassword.jsx'))
const AdminLayout = lazy(() => import('./admin/AdminLayout.jsx'))
const ClientLogin = lazy(() => import('./client/ClientLogin.jsx'))
const ClientLayout = lazy(() => import('./client/ClientLayout.jsx'))
const ManagerLayout = lazy(() => import('./manager/ManagerLayout.jsx'))

// Lazy load below-the-fold components
const Trust = lazy(() => import('./components/Trust.jsx'))
const TechDashboard = lazy(() => import('./components/TechDashboard.jsx'))
const OurProcessTimeline = lazy(() => import('./components/Process.jsx'))
const Portfolio = lazy(() => import('./components/Portfolio.jsx'))
const Testimonials = lazy(() => import('./components/Testimonials.jsx'))
const CTA = lazy(() => import('./components/CTA.jsx'))
const Contact = lazy(() => import('./components/Contact.jsx'))
const Footer = lazy(() => import('./components/Footer.jsx'))

const LoadingFallback = () => (
  <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
    Loading...
  </div>
)

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
      <SEO
        title="Top Web Development Agency in Mohali | CodeNexus Studio"
        description="CodeNexus Studio builds custom React web applications, e-commerce stores, and portfolios. Best scalable tech solutions in Mohali, Punjab."
        canonical="https://codenexusstudio.vercel.app/"
        ogImage="/og-image.png"
      />
      <div className="App">
        <div className="bg-blob blob-1"></div>
        <div className="bg-blob blob-2"></div>

        <Navbar theme={theme} toggleTheme={toggleTheme} />
        {/* Above the fold (loads instantly) */}
        <Hero />
        <Services />

        {/* Below the fold (lazy loaded for performance) */}
        <Suspense fallback={<LoadingFallback />}>
          <Trust />
          <TechDashboard />
          <Portfolio />
          <Testimonials />
          <CTA />
          <OurProcessTimeline />
          <Contact />
          <Footer />
        </Suspense>
      </div>
    </>
  )

  return (
    <Suspense fallback={<div className="admin-shell"><LoadingFallback /></div>}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login theme={theme} toggleTheme={toggleTheme} />} />
        <Route path="/register" element={<Register theme={theme} toggleTheme={toggleTheme} />} />
        <Route path="/forgot-password" element={<ForgotPassword theme={theme} toggleTheme={toggleTheme} />} />
        <Route path="/reset-password/:token" element={<ResetPassword theme={theme} toggleTheme={toggleTheme} />} />
        <Route path="/admin/*" element={<AdminLayout theme={theme} toggleTheme={toggleTheme} />} />
        <Route path="/client/login" element={<ClientLogin theme={theme} toggleTheme={toggleTheme} />} />
        <Route path="/client/*" element={<ClientLayout theme={theme} toggleTheme={toggleTheme} />} />
        <Route path="/manager/*" element={<ManagerLayout theme={theme} toggleTheme={toggleTheme} />} />
      </Routes>
    </Suspense>
  )
}

export default App
