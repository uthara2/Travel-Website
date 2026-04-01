import Hero from '../components/Hero/Hero'
import About from '../components/About/About'
import Trip from '../components/Trip/Trip'

import Testimonial from '../components/Testimonial/Testimonial'
import Contact from '../components/Contact/Contact'
import Cta from '../components/CTA/Cta'
import Follow from '../components/Follow/Follow'
import Footer from '../components/Footer/Footer'
import NavigationBar from '../components/NavigationBar/NavigationBar'

const Home = () => {
  return (
    <div>
      <NavigationBar />
        <Hero />
        <About />
        <Trip />
        <Testimonial />
        <Contact />
        <Cta />
        <Follow />
        <Footer /> 
    </div>
  )
}

export default Home