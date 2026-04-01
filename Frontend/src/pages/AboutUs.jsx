
import Footer from '../components/Footer/Footer'
import About from '../components/About/About'
import WhyUs from '../components/WhyUs/WhyUs'
import Contact from '../components/Contact/Contact'
import Testimonial from '../components/Testimonial/Testimonial'
import Breadcrumb from '../components/common/Breadcrumb/Breadcrumb'
import NavigationBar from '../components/NavigationBar/NavigationBar'

const AboutUs = () => {
  return (
    <div>
      <NavigationBar />
      <Breadcrumb 
        title="About Us"
        currentPage="About Us"
      />
      <About />
      <WhyUs />
      <Contact />
      <Testimonial />
      <Footer/>
    </div>
  )
}

export default AboutUs