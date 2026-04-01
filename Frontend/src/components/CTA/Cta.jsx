import './Cta.css'
import shape5 from '../../assets/shape5.png'
import img1 from '../../assets/cta1.png'

import { FaApple, FaGooglePlay } from "react-icons/fa";


const Cta = () => {
  return (
    <section className="cta-wrapper bg-img">
    {/* Airplane */}
    <img className="airplane-img" src={shape5} />

    {/* Divider */}
    <div className="divider"></div>

    <div className="container">
        <div className="row g-5 align-items-end">
        <div className="col-6">
            <div className="section-heading">
            <span className="sub-title text-white animate__animated animate__fadeInUp delay-02">
                Download Our App
            </span>

            <h2 className="mb-4 text-white animate__animated animate__fadeInUp delay-04">
                Download Mobile App to Explore Trabely
            </h2>

            <p className="mb-5 text-white animate__animated animate__fadeInUp delay-06">
                It is a long established fact that a reader will be distracted
                readable content of a page when looking at layout the point.
            </p>
            </div>

            {/* Download App */}
            <div className="d-flex flex-wrap gap-4">
            <a href="#" className="download-btn active animate__animated animate__fadeInUp delay-08">
                <FaApple style={{fontSize:"35px"}} />
                <div>
                <span>Get it on</span>
                <h5 className="mb-0">App Store</h5>
                </div>
            </a>

            <a href="#" className="download-btn animate__animated animate__fadeInUp delay-1">
                <FaGooglePlay style={{fontSize:"35px"}} />
                <div>
                <span>Get it on</span>
                <h5 className="mb-0">Google play</h5>
                </div>
            </a>
            </div>

            <div className="divider"></div>
        </div>

        <div className="col-6">
            <div className="cta-img animate__animated animate__fadeInUp delay-12">
            <img src={img1} alt="" />
            </div>
        </div>
        </div>
    </div>
    </section>

  )
}

export default Cta