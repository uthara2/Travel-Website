import "./Testimonial.css";

import img1 from "../../assets/test1.jpg";
import img2 from "../../assets/test2.jpg";
import img3 from "../../assets/test3.jpg";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import { FaArrowLeft, FaArrowRight, FaQuoteLeft } from "react-icons/fa";

const Testimonial = () => {
    const testimonials = [
        {
            image: img1,
            name: "Marvin McKinney",
            role: "Product Manager",
            text: "Working with several word the templates the last years only can say this is best every level use it for my reviews that I hav already are company and reviews that I hav already are company and the reviews that I have already are all excellent.",
        },
        {
            image: img2,
            name: "Marvin McKinney",
            role: "Product Manager",
            text: "Working with several word the templates the last years only can say this is best every level use it for my reviews that I hav already are company and reviews that I hav already are company and the reviews that I have already are all excellent.",
        },
        {
            image: img3,
            name: "Marvin McKinney",
            role: "Product Manager",
            text: "Working with several word the templates the last years only can say this is best every level use it for my reviews that I hav already are company and reviews that I hav already are company and the reviews that I have already are all excellent.",
        },
        {
            image: img1,
            name: "Marvin McKinney",
            role: "Product Manager",
            text: "Working with several word the templates the last years only can say this is best every level use it for my reviews that I hav already are company and reviews that I hav already are company and the reviews that I have already are all excellent.",
        },
        {
            image: img2,
            name: "Marvin McKinney",
            role: "Product Manager",
            text: "Working with several word the templates the last years only can say this is best every level use it for my reviews that I hav already are company and reviews that I hav already are company and the reviews that I have already are all excellent.",
        },
        {
            image: img3,
            name: "Marvin McKinney",
            role: "Product Manager",
            text: "Working with several word the templates the last years only can say this is best every level use it for my reviews that I hav already are company and reviews that I hav already are company and the reviews that I have already are all excellent.",
        },
    ];

  return (
    <section className="testimonial-section">
      <div className="divider"></div>

      <div className="container">
        {/* Heading Row */}
        <div className="row g-5 align-items-end">
          <div className="col-12 col-sm-6">
            <div className="section-heading">
              <span className="sub-title">Testimonial</span>
              <h2 className="mb-0">What Our Clients Say</h2>
            </div>
          </div>

          <div className="col-12 col-sm-6 d-flex justify-content-sm-end">
            <div className="testimonial-navigation-container">
              <div className="testimonial-button-prev">
                <FaArrowLeft />
              </div>
              <div className="testimonial-button-next">
                <FaArrowRight />
              </div>
            </div>
          </div>
        </div>

        <div className="divider-sm"></div>

        {/* Swiper */}
        <Swiper
            spaceBetween={30}
            slidesPerView='auto'
            centeredSlides={true}
            loop={true}
            navigation={{ nextEl: ".testimonial-button-next", prevEl: ".testimonial-button-prev",}}
            modules={[Navigation]}
            className="testimonial-swiper">
                {testimonials.map((item, index) => (
                    <SwiperSlide key={index}>
                    <div
                        className="testimonial-card"
                        style={{ backgroundImage: `url(${item.image})` }}
                    >
                        <div
                        className="testimonial-thumbnail"
                        style={{ backgroundImage: `url(${item.image})` }}
                        ></div>

                        <div className="testimonial-content">
                        <FaQuoteLeft size={50} color="#3CB371" />

                        <p className="testimonial-text">{item.text}</p>

                        <div className="border-top"></div>

                        <h4>{item.name}</h4>
                        <span>{item.role}</span>
                        </div>
                    </div>
                    </SwiperSlide>
                ))}
        </Swiper>
      </div>

      <div className="divider"></div>
    </section>
  );
};

export default Testimonial;
