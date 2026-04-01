import './About.css'

import shape from '../../assets/shape.png'
import img1 from '../../assets/about1.jpg'

import { FaSuitcaseRolling, FaHardHat, FaArrowRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <section className="about-company-section">
        {/* Divider */}
        <div className="divider"></div>

        <div className="container-fluid px-5">
            <div className='row align-items-center'>

                {/* Left Images */}
                <div className='col-6'>
                    <div className="about-thumbnail">

                        <div className="shape">
                            <img src={shape} alt="shape" />
                        </div>

                        {/* First Image */}
                        <div className="first-img" >
                            <img src={img1} alt="about" />
                        </div>
                    </div>
                </div>

                {/* Right Content */}
                <div className="col-6">
                    <div className="about-content ps-md-5">

                        <div className="section-heading">
                            <span className="sub-title">About Us</span>
                            <h2>Premier Adventure Travel Company</h2>
                        </div>

                        <div className="about-features">

                            <div className="about-card-sm">
                                <div className="icon">
                                    <FaSuitcaseRolling />
                                </div>
                                <div>
                                    <h4>Exclusive Trip</h4>
                                    <p>At Express Travel, we believe in the transformative power of travel avid explorers ourselves.</p>
                                </div>
                            </div>

                            <div className="about-card-sm">
                                <div className="icon">
                                    <FaHardHat />
                                </div>
                                <div>
                                    <h4>Professional Guide</h4>
                                    <p>At Express Travel, we believe in the transformative power of travel avid explorers ourselves.</p>
                                </div>
                            </div>

                        </div>

                        <Link to='/about'  className="btn-primary-custom">
                            More About Us <FaArrowRight />
                        </Link>

                    </div>
                </div>

            </div>
        </div>

        <div className="divider"></div>

    </section>
  )
}

export default About