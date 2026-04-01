import './Follow.css'

import img1 from '../../assets/follow4.jpg'
import img2 from '../../assets/follow1.jpg'
import img3 from '../../assets/follow2.jpg'
import img4 from '../../assets/follow3.jpg'


import { FaInstagram } from "react-icons/fa";


const Follow = () => {
  return (
    <div className="follow-instagram-section">
    {/* Divider */}
    <div className="divider"></div>

    <div className="container">
        <div className="section-title">
        <span>Follow Instagram</span>
        </div>
    </div>

    {/* Divider Small */}
    <div className="divider-sm"></div>

    <div className="container">
        <div className="row g-4">

        {/* Card 1 */}
        <div className="col-6 col-sm-4 col-md-3">
            <div className="follow-instagram-card">
            <img src={img1} alt="Instagram post" />
            <a href="#" className="instagram-btn">
                <FaInstagram />
            </a>
            </div>
        </div>

        {/* Card 2 */}
        <div className="col-6 col-sm-4 col-md-3">
            <div className="follow-instagram-card">
            <img src={img2} alt="Instagram post" />
            <a href="#" className="instagram-btn">
                <FaInstagram />
            </a>
            </div>
        </div>

        {/* Card 3 */}
        <div className="col-6 col-sm-4 col-md-3">
            <div className="follow-instagram-card">
            <img src={img3} alt="Instagram post" />
            <a href="#" className="instagram-btn">
                <FaInstagram />
            </a>
            </div>
        </div>

        {/* Card 4 */}
        <div className="col-6 col-sm-4 col-md-3">
            <div className="follow-instagram-card">
            <img src={img4} alt="Instagram post" />
            <a href="#" className="instagram-btn">
                <FaInstagram />
            </a>
            </div>
        </div>

        </div>
    </div>

    <div className="divider"></div>
    </div>

  )
}

export default Follow