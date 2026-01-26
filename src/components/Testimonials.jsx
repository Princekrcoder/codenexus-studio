
import '../styles/Testimonials.css'

const Testimonials = () => {
    const testimonials = [
        {
            id: 1,
            name: "Sarah Jenkins",
            role: "CTO @ FinTech Global",
            feedback: "CodeNexus transformed our legacy infrastructure into a high-speed, scalable platform. The attention to detail and clean architecture is unmatched.",
            initials: "SJ",
            rating: 5
        },
        {
            id: 2,
            name: "David Chen",
            role: "Founder @ NovaStart",
            feedback: "From the initial discovery phase to the final launch, the team was incredible. They didn't just write code; they solved our business problems.",
            initials: "DC",
            rating: 5
        },
        {
            id: 3,
            name: "Emily Rodriguez",
            role: "Product Lead @ Creatively",
            feedback: "The UI/UX design is world-class. Our user engagement increased by 200% after the redesign. Highly recommended!",
            initials: "ER",
            rating: 5
        }
    ]

    return (
        <section className="testimonials-section" id="testimonials">
            <div className="testimonials-container">
                <div className="testimonials-header">
                    <h2>Client <span>Feedback</span></h2>
                    <p>
                        Trusted by industry leaders to deliver exceptional results.
                    </p>
                </div>

                <div className="testimonials-grid">
                    {testimonials.map((item) => (
                        <div key={item.id} className="testimonial-card">
                            <div className="quote-icon">“</div>

                            <div className="star-rating">
                                {[...Array(item.rating)].map((_, i) => (
                                    <span key={i}>★</span>
                                ))}
                            </div>

                            <p className="feedback-text">"{item.feedback}"</p>

                            <div className="client-info">
                                <div className="client-avatar">
                                    {item.initials}
                                </div>
                                <div className="client-details">
                                    <h4>{item.name}</h4>
                                    <span>{item.role}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Testimonials
