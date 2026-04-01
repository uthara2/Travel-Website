import { FaLocationDot, FaPhone, FaEnvelope } from "react-icons/fa6";
import './ContactSection.css'

const ContactSection = () => {
  return(
        <div className="container">
  <div className="row g-4">

    {/* Office Address */}
    <div className="col-12 col-md-6 col-lg-4">
      <div className="contact-card-sm">
        <div className="icon">
          <FaLocationDot size={30} />
        </div>
        <div>
          <h4>Office Address</h4>
          <p className="mb-0">629 Elgin St. Celina, 2202</p>
        </div>
      </div>
    </div>

    {/* Call Us */}
    <div className="col-12 col-md-6 col-lg-4">
      <div className="contact-card-sm">
        <div className="icon">
          <FaPhone size={30} />
        </div>
        <div>
          <h4>Call Us</h4>
          <p className="mb-0">+4800 45 678 900</p>
        </div>
      </div>
    </div>

    {/* Email */}
    <div className="col-12 col-md-6 col-lg-4">
      <div className="contact-card-sm">
        <div className="icon">
          <FaEnvelope size={30} />
        </div>
        <div>
          <h4>Email Us Anytime</h4>
          <p className="mb-0">contact@example.com</p>
        </div>
      </div>
    </div>

  </div>
</div>


  )
}

export default ContactSection