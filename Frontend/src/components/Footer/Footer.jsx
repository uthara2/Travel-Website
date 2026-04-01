import './Footer.css'

import img1 from '../../assets/footer1.png'
import img2 from '../../assets/footer2.png'
import background from '../../assets/footer_back.jpg'
import logo from '../../assets/footer-logo.png'

import gallery1 from '../../assets/gallery1.jpg'
import gallery2 from '../../assets/gallery2.jpg'
import gallery3 from '../../assets/gallery3.jpg'
import gallery4 from '../../assets/gallery4.jpg'
import gallery5 from '../../assets/gallery5.jpg'
import gallery6 from '../../assets/gallery6.jpg'

import { FaLocationArrow, FaPhoneAlt, FaEnvelope, FaFacebook, FaXing, FaLinkedin, FaInstagram } from 'react-icons/fa'

const Footer = () => {
  return (
   <footer className='footer-wrapper' style={{backgroundImage:`url(${background})`}}>
      <img className='plane-img' src={img1} alt="" />
      <img className='tree-img' src={img2} alt="" />

      {/* Divider */}
      <div className="divider"></div>

      <div className="container">
         <div className="footer-top-content">
            <div className="fit-item">
               <div className="icon">
                  <FaLocationArrow style={{width:"24px", height:"24px", color:"white"}} />
               </div>
               <div>
                  <h4 className='text-white'>Location</h4>
                  <p className='mb-0 text-white'>66 Brooklyn golden<br /> street line NY, USA</p>
               </div>
            </div>

            <div class="vr-line d-none d-md-block"></div>

            <div className="fit-item">
               <div className="icon">
                  <FaPhoneAlt style={{width:"24px", height:"24px", color:"white"}} />
               </div>
               <div>
                  <h4 className='text-white'>Phone</h4>
                  <p className='mb-0 text-white'>+869-878-08-68</p>
                  <p className='mb-0 text-white'>+869-878-08-68</p>
               </div>
            </div>

            <div class="vr-line d-none d-md-block"></div>

            <div className="fit-item">
               <div className="icon">
                  <FaEnvelope style={{width:"24px", height:"24px", color:"white"}} />
               </div>
               <div>
                  <h4 className='text-white'>Mail</h4>
                  <p className='mb-0 text-white'>touria@support.com</p>
                  <p className='mb-0 text-white'>touria@support.com</p>
               </div>
            </div>
         </div>
      </div>

      <div class="divider"></div>

      <div class="container">
         <div class="border-top"></div>
      </div>

      <div class="divider"></div>
      
      {/* Main Footer */}
      <div className="container">
         <div className="row g-5">
            {/* Footer Card */}
            <div className="col-12 col-sm-6 col-lg-4">
               <div className="footer-card pe-lg-5">
                  <a href="#" className="footer-logo">
                     <img src={logo} alt="" />
                  </a>
                  <p className='mb-0 text-white'>Targeting consultation yet way indulgence off under folly death wrote cause her yet way yest wayspite.</p>

                  {/* Social Nav */}
                  <div className="social-nav">
                     <a href="#">
                        <FaFacebook />
                     </a>
                     <a href="#">
                        <FaXing />
                     </a>
                     <a href="#">
                        <FaLinkedin />
                     </a>
                     <a href="#">
                        <FaInstagram />
                     </a>
                  </div>

               </div>
            </div>
            {/* Footer Card */}
            <div className="col-12 col-sm-6 col-lg">
               <div className="footer-card">
                  <h5 className="mb-5 card-title text-white">Quick Links</h5>
                  {/* Footer Nav */}
                  <ul className="footer-nav">
                     <li><a href="#">Home</a></li>
                     <li><a href="#">About Us</a></li>
                     <li><a href="#">Services</a></li>
                     <li><a href="#">Blogs</a></li>
                     <li><a href="#">Tours</a></li>
                  </ul>
               </div>
            </div>
            {/* Footer Card */}
            <div className="col-12 col-sm-6 col-lg">
               <div className="footer-card">
                  <h5 className="mb-5 card-title text-white">Services</h5>
                  {/* Footer Nav  */}
                  <ul className="footer-nav">
                     <li><a href="#">Wanderlust Adventures</a></li>
                     <li><a href="#">Globe Trotters Travel</a></li>
                     <li><a href="#">Odyssey Travel Services</a></li>
                     <li><a href="#">Jet Set Journeys</a></li>
                     <li><a href="#">Dream Destinations Travel</a></li>
                  </ul>
               </div>
            </div>
            {/* Footer Card */}
            <div className="col-12 col-sm-6 col-lg">
               <div className="footer-card">
                  <h5 className="mb-5 card-title text-white">Gallery Post</h5>
                  {/* Footer Nav */}
                  <ul className="gallery-post list-unstyled">
                     <li>
                        <a href="#">
                           <img src={gallery1} alt="" />
                        </a>
                     </li>
                     <li>
                        <a href="#">
                           <img src={gallery2} alt="" />
                        </a>
                     </li>
                     <li>
                        <a href="#">
                           <img src={gallery3} alt="" />
                        </a>
                     </li>
                     <li>
                        <a href="#">
                           <img src={gallery4} alt="" />
                        </a>
                     </li>
                     <li>
                        <a href="#">
                           <img src={gallery5} alt="" />
                        </a>
                     </li>
                     <li>
                        <a href="#">
                           <img src={gallery6} alt="" />
                        </a>
                     </li>
                  </ul>
               </div>
            </div>
         </div>
      </div>

      {/* Divider */}
      <div className="divider"></div>

      <div className="container">
         <div className="border-top"></div>
      </div>

      {/* Copyright */}
      <div className="copyright-wrapper">
         <div className="container">
            <div className="row align-items-center">
               {/* Copyright */}
               <div className="col-12 col-md-6">
                  <p className="mb-3 mb-md-0 copyright">Copyright © <span id="year">2026</span> <a href="#">Nano Theme</a> All rights reserved.</p>
               </div>
               {/* Footer Bottom Nav */}
               <div className="col-12 col-md-6">
                  <div className="footer-bottom-nav">
                     <a href="#">Privacy Policy</a>
                     <a href="#">Terms of Service</a>
                     <a href="#">Legal Agreement</a>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </footer>
  )
}

export default Footer