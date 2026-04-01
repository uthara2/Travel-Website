
import Footer from '../components/Footer/Footer'
import Breadcrumb from '../components/common/Breadcrumb/Breadcrumb'
import ContactSection from '../components/ContactSection/ContactSection'
import Divider from '../components/Divider/Divider'
import ContactPageSection from '../components/ContactPageSection/ContactPageSection'
import NavigationBar from '../components/NavigationBar/NavigationBar'

const Contact = () => {
  return (
    <div>
      <NavigationBar />
      <Breadcrumb 
        title="Contact"
        currentPage="Contact"
      />
      <Divider />
      <ContactSection />
      <Divider />
      <ContactPageSection />
      <Footer />
    </div>
  )
}

export default Contact