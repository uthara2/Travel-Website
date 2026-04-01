import "./WhyUs.css";
import { Link } from "react-router-dom";

import shape4 from "../../assets/shape4.png";
import img1 from "../../assets/why2.jpg";
import img2 from "../../assets/about1.jpg";
import img3 from "../../assets/why1.jpg";

import { FaSuitcaseRolling, FaHardHat, FaArrowRight } from "react-icons/fa";

const WhyUs = () => {
  return (
    <section
      className="why-choose-section"
      style={{
        backgroundImage: `url(${shape4})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="divider"></div>

      <div className="container">
        <div className="row g-5 align-items-center">

          {/* Left Images */}
          <div className="col-6">
            <div className="why-choose-thumbnail">

              <div className="first-img animate__animated animate__fadeInUp delay-02">
                <img src={img1} alt="Travel adventure" />
              </div>

              <div className="second-img animate__animated animate__fadeInUp delay-04">
                <img src={img2} alt="Tour experience" />
              </div>

              <div className="third-img animate__animated animate__fadeInUp delay-06">
                <img src={img3} alt="Climbing adventure" />
              </div>

            </div>
          </div>

          {/* Right Content */}
          <div className="col-6">
            <div className="why-choose-content ps-xxl-5">

              <div className="section-heading">
                <span className="sub-title">Why Choose Us</span>
                <h2 className="mb-4">
                  Amazing Featured Tour Package the World
                </h2>
                <p className="mb-5">
                  At Express Travel, we believe in the transformative power of travel.
                </p>
              </div>

              <div className="d-flex flex-column gap-4 mb-5">

                <div className="about-card-sm d-flex align-items-center gap-3">
                  <div className="icon bg-white">
                    <FaSuitcaseRolling size={32} />
                  </div>
                  <div>
                    <h4 className="mb-1">Safety First Always</h4>
                    <p className="mb-0">
                      We believe in the power of travel as avid explorers.
                    </p>
                  </div>
                </div>

                <div className="about-card-sm d-flex align-items-center gap-3">
                  <div className="icon bg-white">
                    <FaHardHat size={32} />
                  </div>
                  <div>
                    <h4 className="mb-1">Adventure and Climbing</h4>
                    <p className="mb-0">
                      We believe in the power of travel as avid explorers.
                    </p>
                  </div>
                </div>

              </div>

              <Link to="/about" className="btn btn-primary">
                Explore More <FaArrowRight size={18} />
              </Link>

            </div>
          </div>

        </div>
      </div>

      <div className="divider"></div>
    </section>
  );
};

export default WhyUs;
