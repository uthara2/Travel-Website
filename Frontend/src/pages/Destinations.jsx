
import Footer from '../components/Footer/Footer'
import Trip from '../components/Trip/Trip'
import Breadcrumb from '../components/common/Breadcrumb/Breadcrumb'
import Destination1 from '../components/Destination1/Destination1'
import { Navigation } from 'swiper/modules'
import NavigationBar from '../components/NavigationBar/NavigationBar'
import District from '../components/District/District'

const Destinations = () => {
  return (
    <div>
      <NavigationBar />
      <Breadcrumb 
        title="Destinations"
        currentPage="Destinations"
      />
      <Destination1 />
      <Trip />
      <District />
      <Footer />
    </div>
    
  )
}

export default Destinations