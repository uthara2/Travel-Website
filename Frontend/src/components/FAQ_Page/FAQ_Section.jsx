import './FAQ_Section.css'

const faqData = [
    {
        category: "Booking Process",
        items: [
            {
                question: "How do I book a tour with your agency?",
                answer:" If you need immediate assistance, click the button below to chat live with a Customer Service Customer live with Service Customer representative.If you need immediate assistance, click the button below to chat live with a Customer Service Customer live with Service Customer representative."
            },
            {
                question: "What payment methods do you accept?",
                answer:" If you need immediate assistance, click the button below to chat live with a Customer Service Customer live with Service Customer representative.If you need immediate assistance, click the button below to chat live with a Customer Service Customer live with Service Customer representative."
            },
            {
                question: "Can I customize my travel itineray?",
                answer:" If you need immediate assistance, click the button below to chat live with a Customer Service Customer live with Service Customer representative.If you need immediate assistance, click the button below to chat live with a Customer Service Customer live with Service Customer representative."
            },
            {
                question: "How do I book a tour with your agency?",
                answer:" If you need immediate assistance, click the button below to chat live with a Customer Service Customer live with Service Customer representative.If you need immediate assistance, click the button below to chat live with a Customer Service Customer live with Service Customer representative."
            },
        ]
    },
    {
        category:"Tour Details",
        items: [
            {
                question: "Are meals and transportation included in the tour packages?",
                answer:" If you need immediate assistance, click the button below to chat live with a Customer Service Customer live with Service Customer representative.If you need immediate assistance, click the button below to chat live with a Customer Service Customer live with Service Customer representative."
            },
            {
                question: "What measures do you take to ensure safety on your tours?",
                answer:" If you need immediate assistance, click the button below to chat live with a Customer Service Customer live with Service Customer representative.If you need immediate assistance, click the button below to chat live with a Customer Service Customer live with Service Customer representative."
            },
            {
                question: "Do you offer accessibility options for travelers with disabilities?",
                answer:" If you need immediate assistance, click the button below to chat live with a Customer Service Customer live with Service Customer representative.If you need immediate assistance, click the button below to chat live with a Customer Service Customer live with Service Customer representative."
            },
        ]
    },
    {
        category:"Cancellation and Refunds",
        items: [
            {
                question: "How do I book a tour with your agency?",
                answer:" If you need immediate assistance, click the button below to chat live with a Customer Service Customer live with Service Customer representative.If you need immediate assistance, click the button below to chat live with a Customer Service Customer live with Service Customer representative."
            },
            {
                question: "What measures do you take to ensure safety on your tours?",
                answer:" If you need immediate assistance, click the button below to chat live with a Customer Service Customer live with Service Customer representative.If you need immediate assistance, click the button below to chat live with a Customer Service Customer live with Service Customer representative."
            },
            {
                question: "Can I customize my travel itineray?",
                answer:" If you need immediate assistance, click the button below to chat live with a Customer Service Customer live with Service Customer representative.If you need immediate assistance, click the button below to chat live with a Customer Service Customer live with Service Customer representative."
            },
        ]
    }
]

const FAQ_Section = () => {
  return (
    <div className="faq-question-section">
        <div className="divider"></div>
        <div className="container">
            <div className="row g-5 g-lg-4 g-xl-5">
                <div className="col-12 col-lg-8">
                    {faqData.map((section, sectionIndex) => (
                        <div key={sectionIndex} className="mb-5">
                            <h2 className="mb-4 faq-title">{section.category}</h2>

                            <div className="faq-accordion">
                                <div className="accordion" id={`accordion-${sectionIndex}`}>
                                    {section.items.map((items, index) => {
                                        const collapseId = `collapse-${sectionIndex}-${index}`
                                        return(
                                        <div className="accordion-item mb-3" key={index}>
                                            <h2 className="accordion-header">
                                                <button
                                                className={`accordion-button ${section.category === "Booking Process" && index === 0 ? '' : 'collapsed'}`}
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target={`#${collapseId}`}
                                                >
                                                {items.question}
                                                </button>
                                            </h2>
                                            <div
                                                id={collapseId}
                                                className={`accordion-collapse collapse ${section.category === "Booking Process" && index === 0 ? 'show' : ''}`}
                                                data-bs-parent={`#accordion-${sectionIndex}`}
                                            >
                                                <div className="accordion-body">
                                                    {items.answer}
                                                </div>
                                            </div>
                                        </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Right Side */}
                <div className="col-12 col-lg-4">
                    <div className="section-heading">
                        <span className="sub-title">Need Any Help?</span>
                        <h2 className="mb-4">Popular Inquiries</h2>
                        <p>If you need immediate assistance, click the button below to chat live with a Customer Service representative.</p>
                    </div>

                    <div className="have-question-card mt-5">
                        <h4 className="mb-4">Have any Question</h4>
                        <form className="d-flex flex-column gap-4">
                            <input
                            type="text"
                            className="form-control"
                            placeholder="Your Name"
                            />

                            <textarea
                            className="form-control"
                            placeholder="Write Message.."
                            ></textarea>

                            <button
                            type="submit"
                            className="btn btn-primary rounded-3"
                            >
                            Ask Question Now <i className="icon-arrow-right"></i>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div className="divider"></div>
    </div>
  )
}

export default FAQ_Section