import { useEffect, useRef } from "react";
import "../styles/Hero.css";

const Hero = () => {
  const editorRef = useRef(null);
  const timeoutsRef = useRef([]);

  useEffect(() => {
    const codeLines = [
      "import { Future } from '@nexus/core';",
      "",
      "const app = new WebApp({",
      "  performance: 'blazing-fast',",
      "  security: 'enterprise-grade',",
      "  design: 'pixel-perfect'",
      "});",
      "",
      "// Initialize AI Systems",
      "await app.deploy();",
      "console.log('System Online 🟢');",
    ];

    const editor = editorRef.current;
    if (!editor) return;

    let i = 0;
    let j = 0;
    let ran = false;

    const isMobile = window.innerWidth < 600;

    // ✅ Speed Controls
    const TYPE_BASE = isMobile ? 45 : 70; // base typing delay
    const TYPE_RANDOM = isMobile ? 40 : 60; // random extra delay
    const LINE_DELAY = isMobile ? 130 : 190; // next line delay
    const RESTART_DELAY = 2500;

    const addTimeout = (fn, delay) => {
      const id = setTimeout(fn, delay);
      timeoutsRef.current.push(id);
      return id;
    };

    const createCursor = () => {
      // remove existing cursor inside editor only
      const existingCursor = editor.querySelector(".cursor");
      if (existingCursor) existingCursor.remove();

      const cursor = document.createElement("span");
      cursor.className = "cursor";
      cursor.textContent = "|";
      return cursor;
    };

    // ✅ important: prevent HTML injection issues
    const escapeHTML = (str) =>
      str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

    // ✅ highlight while typing (no overwrite after full line)
    const highlightSyntax = (text) => {
      const safe = escapeHTML(text);

      return safe
        .replace(/(import|from|const|new|await)/g, '<span class="kwd">$1</span>')
        .replace(/('[^']*')/g, '<span class="str">$1</span>')
        .replace(/\b(console|log)\b/g, '<span class="func">$1</span>')
        .replace(/(\/\/.*)/g, '<span style="color:#5c6370">$1</span>');
    };

    const typeEffect = () => {
      // ✅ End reached
      if (i >= codeLines.length) {
        if (isMobile && ran) return; // mobile pe ek baar hi
        ran = true;

        addTimeout(() => {
          editor.innerHTML = "";
          i = 0;
          j = 0;
          typeEffect();
        }, RESTART_DELAY);

        return;
      }

      let line = editor.children[i];
      if (!line) {
        line = document.createElement("div");
        line.className = "code-line";
        line.innerHTML = `<span class="line-num">${i + 1}</span><span class="type-text"></span>`;
        editor.appendChild(line);
      }

      const span = line.querySelector(".type-text");
      const txt = codeLines[i];

      // ✅ blank line (just move next)
      if (txt.length === 0) {
        span.innerHTML = "";
        i++;
        j = 0;
        addTimeout(typeEffect, LINE_DELAY);
        return;
      }

      // ✅ typing with highlight
      if (j <= txt.length) {
        const partial = txt.slice(0, j);
        span.innerHTML = highlightSyntax(partial);
        span.appendChild(createCursor());

        j++;

        const delay = TYPE_BASE + Math.random() * TYPE_RANDOM;
        addTimeout(typeEffect, delay);
      } else {
        // ✅ line complete
        span.innerHTML = highlightSyntax(txt);
        j = 0;
        i++;
        addTimeout(typeEffect, LINE_DELAY);
      }
    };

    typeEffect();

    // ✅ cleanup
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
    };
  }, []);

  return (
    <section className="hero">
      <div className="hero-inner">
        <div>
          <div className="badge">🚀 v2.0 Now Live</div>
          <h1>
            Build Faster.
            <br />
            Scale <span>Smarter.</span>
          </h1>
          <p className="subtitle">
            Turn your ideas into high-performance web applications.
          </p>
          <div className="btn-group">
            <a href="#start" className="btn btn-primary">
              Start Project
            </a>
            <a href="#github" className="btn btn-secondary">
              View Github
            </a>
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
  );
};

export default Hero;
