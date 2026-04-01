
import Breadcrumb from '../components/common/Breadcrumb/Breadcrumb'
import Footer from '../components/Footer/Footer'
import NavigationBar from '../components/NavigationBar/NavigationBar'
import TourPackages from '../components/Tour_Packages/TourPackages'

const Packages = () => {
  return (
    <div>
      <NavigationBar />
      <Breadcrumb title="Tour Packages" currentPage="Tour Packages" />
      <TourPackages />
      <Footer />
    </div>
  )
}

export default Packages