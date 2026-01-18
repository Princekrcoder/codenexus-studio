import { useEffect, useRef } from 'react'
import './Hero.css'

const Hero = () => {
  const editorRef = useRef(null)

  useEffect(() => {
    const codeLines = [
      "import { Future } from '@nexus/core';","",
      "const app = new WebApp({",
      "  performance: 'blazing-fast',",
      "  security: 'enterprise-grade',",
      "  design: 'pixel-perfect'",
      "});","",
      "// Initialize AI Systems",
      "await app.deploy();",
      "console.log('System Online 🟢');"
    ]

    const editor = editorRef.current
    let i = 0, j = 0, ran = false
    const isMobile = window.innerWidth < 600

    const createCursor = () => {
      const existingCursor = document.querySelector('.cursor')
      if (existingCursor) existingCursor.remove()
      
      const cursor = document.createElement('span')
      cursor.className = 'cursor'
      return cursor
    }

    const typeEffect = () => {
      if (i >= codeLines.length) {
        if (isMobile && ran) return
        ran = true
        setTimeout(() => {
          editor.innerHTML = ''
          i = 0
          j = 0
          typeEffect()
        }, 3000)
        return
      }

      let line = editor.children[i]
      if (!line) {
        line = document.createElement('div')
        line.className = 'code-line'
        line.innerHTML = `<span class="line-num">${i + 1}</span><span class="type-text"></span>`
        editor.appendChild(line)
      }

      const span = line.querySelector('.type-text')
      const txt = codeLines[i]

      if (j < txt.length) {
        span.textContent += txt[j++]
        span.appendChild(createCursor())
        setTimeout(typeEffect, 30)
      } else {
        span.innerHTML = txt
          .replace(/import|from|const|new|await/g, '<span class="kwd">$&</span>')
          .replace(/'[^']*'/g, '<span class="str">$&</span>')
          .replace(/console|log/g, '<span class="func">$&</span>')
          .replace(/\/\/.*/g, '<span style="color:#5c6370">$&</span>')
        j = 0
        i++
        setTimeout(typeEffect, 100)
      }
    }

    typeEffect()
  }, [])

  return (
    <section className="hero">
      <div className="hero-inner">
        <div>
          <div className="badge">🚀 v2.0 Now Live</div>
          <h1>Build Faster.<br />Scale <span>Smarter.</span></h1>
          <p className="subtitle">Turn your ideas into high-performance web applications.</p>
          <div className="btn-group">
            <a href="#start" className="btn btn-primary">Start Project</a>
            <a href="#github" className="btn btn-secondary">View Github</a>
          </div>
        </div>

        <div className="code-wrapper">
          <div className="code-card">
            <div className="window-header">
              <div className="dot red"></div>
              <div className="dot yellow"></div>
              <div className="dot green"></div>
            </div>
            <div className="code-area" ref={editorRef}></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero