import Breadcrumb from '../components/common/Breadcrumb/Breadcrumb'
import Footer from '../components/Footer/Footer'
import NavigationBar from '../components/NavigationBar/NavigationBar'
import Taxi from '../components/Taxi/Taxi'

const TaxiBooking = () => {
  return (
    <div>
      <NavigationBar />
      <Breadcrumb title="Taxi Booking" currentPage="Taxi Booking" />
      <Taxi />
      <Footer />
    </div>
  )
}

export default TaxiBooking