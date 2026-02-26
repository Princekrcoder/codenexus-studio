import '../styles/Trust.css'

const Trust = () => {
  const trustItems = [
    {
      title: "Clean & Maintainable Code",
      description: "We follow industry best practices and clean architecture principles to ensure your product remains scalable, readable, and easy to maintain."
    },
    {
      title: "Modern Technologies",
      description: "Our solutions are built using modern, battle-tested technologies that deliver high performance, security, and long-term reliability."
    },
    {
      title: "Business-First Approach",
      description: "Every technical decision we make is aligned with your business goals, ensuring real-world impact — not just good-looking interfaces."
    },
    {
      title: "Performance & SEO Focused",
      description: "We optimize for speed, accessibility, and search visibility so your product performs exceptionally across all devices."
    },
    {
      title: "Transparent Communication",
      description: "Clear timelines, honest feedback, and regular updates — you stay informed and in control throughout the project."
    },
    {
      title: "Long-Term Support",
      description: "Beyond launch, we provide ongoing support, improvements, and optimizations to help your product grow with time."
    }
  ]

  return (
    <section className="trust-section">
      <div className="trust-container">
        <div className="trust-header">
          <h2>Why <span>Choose CodeNexus</span></h2>
          <p>
            We combine clean engineering, modern technologies, and a
            business-first mindset to deliver results that truly matter.
          </p>
        </div>

        <div className="trust-grid">
          {trustItems.map((item, index) => (
            <div key={index} className="trust-card">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Trust