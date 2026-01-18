import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Trust from './components/Trust';
import TechDashboard from './components/TechDashboard';
import Process from './components/Process';

function App() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      setTheme('light');
      document.body.classList.add('light-theme');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.body.classList.toggle('light-theme');
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className="App">
      <div className="bg-blob blob-1"></div>
      <div className="bg-blob blob-2"></div>
      
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Hero />
      <Services />
      <Trust />
      <TechDashboard />
      <Process />
    </div>
  );
}

export default App;