import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'animate.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './pages/Home'
import AboutUs from './pages/AboutUs';
import Destinations from './pages/Destinations';
import Contact from './pages/Contact';
import AdminPanel from './pages/Admin/AdminPanel';
import CategoryPage from './components/CategoryPage/CategoryPage';
import PlaceDetails from "./components/PlaceDetails/PlaceDetails";
import TaxiBooking from "./pages/TaxiBooking";
import Packages from "./pages/Packages";
import PackageDetails from "./components/PackageDetails/PackageDetails";
import District from "./components/District/District";
import DistrictDetails from "./components/District_Deatils/DistrictDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotificationsPage from "./components/Notification/NotificationsPage";



function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/destinations' element={<Destinations />} /> 
          <Route path="/tourPackages" element={<Packages />} />
          <Route path="/taxiBooking" element={<TaxiBooking />} />
          <Route path='/about' element={<AboutUs />} />
          <Route path='/contact' element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/notifications" element={<NotificationsPage />} />

          <Route path='/admin' element={<AdminPanel />} />

          <Route path="/category/:categoryId" element={<CategoryPage />} />
          <Route path="/destination/:id" element={<PlaceDetails/>} />
          <Route path="/tour-package/:id" element={<PackageDetails />} />

          <Route path="/" element={<District />} />
          <Route path="/district/:id" element={<DistrictDetails />} />
          <Route path="/destination/:id" element={<PlaceDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App 