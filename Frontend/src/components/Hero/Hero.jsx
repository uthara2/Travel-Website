import "./Hero.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import img1 from "../../assets/1-background.jpg";
import img2 from "../../assets/2-background.jpg";
import cloudImg from "../../assets/cloud.png";

import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

const slides = [img1, img2];

const Hero = () => {
  return (
    <section className="hero-section">

      <div 
        className="cloud-img" 
        style={{ backgroundImage: `url(${cloudImg})` }} 
      />
      
      <Swiper 
        modules={[Autoplay, Navigation]} 
        autoplay={{ delay: 4000, disableOnInteraction: false }} 
        loop={true} 
        className="background-swiper"
        navigation={{ nextEl: ".background-button-next", prevEl: ".background-button-prev",}}
      >
        {slides.map((image, index) => (
          <SwiperSlide key={index}>
            <div 
              className="slide-bg" 
              style={{ backgroundImage: `url(${image})` }} 
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="hero-content-layer">
        <div className="container">
          <div className="hero-content">

            <h3 className="heading-tagline">
              Experience Unmatched Delight With Us.
            </h3>

            <h2 className="text-white mb-4 heading-text">
              Where Exceptional Memories <br />Begin
            </h2>

            <p className="text-white heading-line">
              Welcome to our Vitour website! We are a professional and reliable
              tours company offering a wide range of services.
            </p>
            
          </div>
        </div>
      </div>

    </section>
  );
};

export default Hero;