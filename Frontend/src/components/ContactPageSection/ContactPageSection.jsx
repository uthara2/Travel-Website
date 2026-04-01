import React, { useState } from 'react'
import axios from 'axios'
import './ContactPageSection.css'

const ContactPageSection = () => {

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.placeholder.includes("First") ? "firstName" :
       e.target.placeholder.includes("Last") ? "lastName" :
       e.target.placeholder.includes("Phone") ? "phone" :
       e.target.placeholder.includes("Email") ? "email" :
       "message"]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/enquiries/create-enquiry", formData);
      alert("Message sent successfully!");

      setFormData({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        message: ""
      });

    } catch (error) {
      console.log(error);
      alert("Something went wrong!");
    }
  };
  return (
    <div className="contact-page-section">

      <div className="container position-relative" style={{ marginBottom:"100px"}}>

        {/* Contact Form */}
        <div className="contact-form-wrapper">

          {/* Section Heading */}
          <div className="section-heading text-center">
            <h2>Get In Touch</h2>
            <p className="mb-0">
              Get in touch for personalized assistance. We're here to help
              and provide solutions tailored to your requirements.
            </p>
          </div>

          <div className="divider-sm"></div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="row g-4">

              <div className="col-12 col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="First Name*"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12 col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Last Name*"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12 col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Phone*"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12 col-md-6">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email*"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12">
                <textarea
                  className="form-control"
                  placeholder="Write your message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="col-12">
                <button
                  type="submit"
                  className="btn btn-primary w-100 mt-3"
                >
                  Send Message
                </button>
              </div>

            </div>
          </form>

        </div>
      </div>
    </div>
  )
}

export default ContactPageSection