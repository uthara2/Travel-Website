import './Contact.css'

import img1 from '../../assets/contact1.jpg'

import { FaArrowCircleRight, FaArrowRight } from 'react-icons/fa'

const Contact = () => {
  return (
    <section className="contact-section" style={{backgroundImage:`url(${img1})`}}>
      <div className="divider"></div>

      <div className="container">
        <div className="row g-5">
          
          {/* LEFT SIDE */}
          <div className="col-6 order-2 order-lg-0">
            <div className="section-heading">
              <span className="sub-title text-white">Get in touch</span>
              <h2 className="mb-4 text-white">
                Do You Need Help For Your Next Projects?
              </h2>
              <p className="text-white mb-5">
                At Express Travel, we believe in the transformative power of
                travel. As avid explorers ourselves, we understand the desire
                to uncover experiences, forge understand the desire meaningful.
              </p>
            </div>

            <form className="me-lg-5">
              <div className="contact-form">
                <div className="row g-4">

                  <div className="col-12">
                    <div className="form-group">
                      <label htmlFor="name"></label>
                      <input
                        type="text"
                        id="name"
                        className="form-control"
                        name="name"
                        placeholder="First Name *"
                      />
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="form-group">
                      <label htmlFor="email"></label>
                      <input
                        type="email"
                        id="email"
                        className="form-control"
                        name="email"
                        placeholder="Email Here *"
                      />
                    </div>
                  </div>

                  <div className="col-12">
                    <select
                      name="subject"
                      id="subject"
                      className="touria-select2"
                    >
                      <option value="">Select Subject</option>
                      <option value="tour-booking">Tour Booking</option>
                      <option value="travel-plan">Travel Plan</option>
                      <option value="travel-insurance">Travel Insurance</option>
                      <option value="travel-tips">Travel Tips</option>
                    </select>
                  </div>

                  <div className="col-12">
                    <div className="form-group">
                      <label htmlFor="message"></label>
                      <textarea
                        name="message"
                        id="message"
                        className="form-control"
                        placeholder="Your Comment *"
                      ></textarea>
                    </div>
                  </div>

                </div>
              </div>

              <div className="submit-btn">
                <button type="submit" className="btn btn-light">
                  Submit Message <FaArrowRight />
                </button>
              </div>
            </form>
          </div>

          {/* RIGHT SIDE */}
          <div className="col-6">
            <div className="row g-4 align-items-center">
              <div className="col-12 col-sm-6">
                <div className="d-flex gap-5 flex-column">
                  <div className="happy-counts animate__animated animate__fadeInUp delay-02">
                    <h3 className='counter text-light'>976<span>+</span></h3>
                    <h5 className="mb-0 text-light">Happy Traveller</h5>
                  </div>

                  <div className="happy-counts animate__animated animate__fadeInUp delay-04">
                    <h3 className='counter text-light'>805<span>+</span></h3>
                    <h5 className="mb-0 text-light">Positive Review</h5>
                  </div>
                </div>
              </div>

              <div className="col-12 col-sm-6">
                <div className="happy-counts animate__animated animate__fadeInUp delay-06">
                  <h3 className='counter text-light'>745<span>+</span></h3>
                  <h5 className="mb-0 text-light">Award Wining</h5>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Contact